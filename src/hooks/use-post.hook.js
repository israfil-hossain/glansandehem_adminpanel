import { useMutation } from '@tanstack/react-query';

import { API } from '../config/axiosConfig';
import { notifyError } from '../components/common/Toast/Toaster';


const usePost = (apiEndpoint, onSuccessCallback) =>{
    const { mutate, isLoading } = useMutation(
      (payload) => API.post(apiEndpoint, payload),
      {
        onSuccess: (response) => {
          onSuccessCallback(response.data.message);
        },
        onError: (errors) => {
          notifyError(errors.response.data.message);
          console.log(errors.response.data.message);
        },
      },
    ); 
    return {
        mutate,
        isLoading,
    }
}
export default usePost; 