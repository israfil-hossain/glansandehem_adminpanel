// hook/usePut.js
import { useMutation } from '@tanstack/react-query';


import { notifyError } from '../components/common/Toast/Toaster';


const usePut = (apiEndpoint, onSuccessCallback) => {
  const { mutate, isLoading } = useMutation(
    (payload) => API.put(apiEndpoint, payload),
    {
      onSuccess: (response) => {
        onSuccessCallback(response.data.message);
      },
      onError: (errors) => {
        notifyError(errors.response.data.message);
        // onErrorCallback(errors.response.data.message);
      },
    },
  );

  return {
    mutate,
    isLoading,
  }
}

export default usePut
