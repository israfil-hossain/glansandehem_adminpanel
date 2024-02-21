import { MdDelete, MdModeEditOutline } from "react-icons/md";

const handleEdit=(item)=>{
    console.log("item Edit", item);
}
const handleDelete = (item)=>{
    console.log("Item Delted", item);
}
const conditionActions = [
    {
      icon: <MdModeEditOutline color="white" size={16} />, // Edit icon
      tooltip: "Edit",
      handler: handleEdit,
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-700",
    },
    
    {
      icon: <MdDelete color="white" size={16} />, // Delete icon
      tooltip: "Delete",
      handler: handleDelete,
      bgColor: "bg-red-500",
      hoverColor: "hover:bg-red-700"
    },
  ];

export default conditionActions; 