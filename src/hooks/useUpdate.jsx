import { useMutation } from "@tanstack/react-query";
import adminAPI from "../api/adminAPI";

const useUpdate = ({
  endpoint = "",
  isMultiPart = false,
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  const mutation = useMutation(
    (data) =>
      adminAPI.put(endpoint, data, {
        headers: {
          "Content-Type": isMultiPart
            ? "multipart/form-data"
            : "application/json",
        },
      }),
    {
      onSuccess,
      onError,
      onSettled,
    }
  );

  return mutation;
};

export default useUpdate;
