import { useMutation } from "@tanstack/react-query";
import adminAPI from "../api/adminAPI";

const usePatch = ({
  endpoint = "",
  isMultiPart = false,
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  const mutation = useMutation(
    (data) =>
      adminAPI.patch(endpoint, data, {
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

export default usePatch;
