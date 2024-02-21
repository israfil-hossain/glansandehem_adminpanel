// Get access token from localstorage
export const getAccessToken = () => {
  const state = JSON.parse(localStorage.getItem("__auth_tokens") ?? "{}");
  return state["accessToken"];
};

// Set access token to localstorage
export const setAccessToken = (accessToken) => {
  if (accessToken) {
    const state = JSON.parse(localStorage.getItem("__auth_tokens") ?? "{}");
    const newState = { ...state, accessToken };

    // mutate local storage state
    localStorage.setItem("__auth_tokens", JSON.stringify(newState));
  }
};

// Get refresh token from localstorage
export const getRefreshToken = () => {
  const state = JSON.parse(localStorage.getItem("__auth_tokens") ?? "{}");
  return state["refreshToken"];
};

// Set access token to localstorage
export const setRefreshToken = (refreshToken) => {
  if (refreshToken) {
    const state = JSON.parse(localStorage.getItem("__auth_tokens") ?? "{}");
    const newState = { ...state, refreshToken };

    // mutate local storage state
    localStorage.setItem("__auth_tokens", JSON.stringify(newState));
  }
};

// Remove access token and refresh token from localstorage
export const removeTokens = () => {
  localStorage.setItem("__auth_tokens", JSON.stringify({}));
};
