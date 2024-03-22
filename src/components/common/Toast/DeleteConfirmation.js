import Swal from 'sweetalert2';

export const deleteConfirmation = () => {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9568FF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
  };

  export const cancelConfirmation = () => {
    return Swal.fire({
      title: 'Are you sure Cancel Subscription ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9568FF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    });
  };