// import { deleteConfirmation } from "../components/common/Toast/DeleteConfirmation";
// import { useDelete } from "../hooks";
// import { useNavigate } from "react-router-dom";

// let endpoint = "";
// let navigate = useNavigate();

// // Delete Mutation ....
// const deleteMutation = useDelete({
//   endpoint: endpoint,
//   onSuccess: () => {
//     console.log("Delete successful!");
//     toast.success("Delete successful! !");
//     refetch();
//   },
//   onError: (error) => {
//     console.error("Error deleting entry:", error);
//     // Add any other error handling logic
//   },
// });

// export const handleView = (id, endpoint) => {
//   navigate(endpoint, { replace: true, state: { id: id } });
// };

// export const handleDelete = (item, endpoint) => {
//   if (item?._id) {
//     endpoint = endpoint;
//     deleteConfirmation().then((result) => {
//       if (result.isConfirmed) {
//         deleteMutation.mutate(item?._id);
//       }
//     });
//   }
// };

// export const handleEdit = (id, endpoint) => {
//     navigate(endpoint, { replace: true, state: { id: id } });
// };
