import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setAccessToken,
} from "../utils/localStorageUtils";
import adminQueryClient from "./adminQueryClient";

const PROD_ADMIN_BASE_URL = "https://api.app.glansandehem.se";

export const ADMIN_BASE_URL =
  import.meta.env.VITE_ADMIN_BASE_URL ?? PROD_ADMIN_BASE_URL;

const adminAPI = axios.create({ baseURL: ADMIN_BASE_URL });

//#region Refreshing process and unauthorized request queue
let isRefreshingToken = false;
let requestQueue = [];

const addRequestToQueue = (callback) => {
  requestQueue.push(callback);
};

const processRequestQueue = (accessToken) => {
  while (requestQueue.length) {
    const currentRequest = requestQueue.shift();
    currentRequest(accessToken);
  }
};

adminAPI.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + getAccessToken();
  return config;
});

adminAPI.interceptors.response.use(undefined, (error) => {
  const originalRequest = error?.config;
  const refreshToken = getRefreshToken();

  if (
    error?.response?.status === 401 &&
    !originalRequest?._retry &&
    !!refreshToken
  ) {
    originalRequest._retry = true;

    // Token refresh process
    if (!isRefreshingToken) {
      isRefreshingToken = true;
      axios
        .post(`${ADMIN_BASE_URL}/api/Auth/TokenRefresh`, {
          refreshToken,
        })
        .then(({ data = {} }) => {
          setAccessToken(data?.data?.accessToken);
          processRequestQueue(data?.data?.accessToken);
        })
        .catch(() => {
          removeTokens();
          processRequestQueue(false);
          adminQueryClient.resetQueries();
        })
        .finally(() => {
          isRefreshingToken = false;
        });
    }

    // Add request to queue
    return new Promise((resolve, reject) => {
      addRequestToQueue((accessToken) => {
        if (accessToken) {
          originalRequest.headers["Authorization"] = "Bearer " + accessToken;
          resolve(axios(originalRequest));
        }
        reject(originalRequest);
      });
    });
  }

  return Promise.reject(error);
});

//#endregion

export default adminAPI;
