// hook/usePut.js
import { useMutation } from "@tanstack/react-query";
import { notifyError } from "../components/common/Toast/Toaster";


const useDeleteHook = (apiEndpoint, onSuccessCallback, onErrorCallback) => {

  const { mutate, isLoading } = useMutation(
    (id) => adminAPI.delete(`${apiEndpoint}/${id}`),

    {
      onSuccess: (response) => {
        onSuccessCallback(response.data.message);
      },
      onError: (errors) => {
        console.log("errors", errors);
        notifyError(errors.response?.data?.message);
        onErrorCallback(errors.response.data.message);
      },
    },
  );
  return {
    mutate,
    isLoading,
  };
};

export default useDeleteHook;