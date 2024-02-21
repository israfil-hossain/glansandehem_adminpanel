import { calender } from "../../assets/images/icons";

const topUserHeader = [
  {
    label: "NAME",
    key: "name",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex space-x-2">
        {console.log(item)}
        <img
          src={item.image}
          alt="User"
          style={{ width: 30, height: 30, borderRadius: "50%" }}
        />
        <p>{value}</p>
      </div>
    ),
  },
  {
    label: "JOINED",
    key: "join",
    className: "custom-class",
    render: (value) => (
      <div className="flex space-x-2">
        <img
          src={calender}
          alt="calender"
          style={{ width: 20, height: 20, borderRadius: "50%" }}
        />
        <p>{value}</p>
      </div>
    ),
  },
];

const permissionHeadings = [
  {
    label: "NAME",
    key: "name",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex space-x-2">
        
        <img
          src={item.image}
          alt="User"
          style={{ width: 30, height: 30, borderRadius: "50%" }}
        />
        <p>{value}</p>
      </div>
    ),
  },
];

const conditionHeadings = [
  {
    label: "Cleaning NAME",
    key: "cleaningName",
    className: "custom-class",
    
  },
  {
    label: "Cleaning Price",
    key: "cleaningPrice",
    className: "custom-class",
    
  },
  {
    label: "STATUS",
    key: "isActive",
    className: "custom-class",
    render: (value) => (
      
      <div className="text-sm font-normal">
       
        <p className={`${value === true ? 'bg-[#CDF8D8]' : 'bg-[#fcbab1]'} w-28 rounded-lg p-1 text-center`}>
          {value ? "Active" : "Inactive"}
        </p>

      </div>
    ),
  },
];

const couponHeadings = [
  {
    label: "Coupon Name",
    key: "couponName",
    className: "custom-class",
    
  },
  {
    label: "Coupon",
    key: "coupon",
    className: "custom-class",
    
  },
  {
    label: "STATUS",
    key: "isActive",
    className: "custom-class",
    render: (value) => (
      
      <div className="text-sm font-normal">
       
        <p className={`${value === true ? 'bg-[#CDF8D8]' : 'bg-[#fcbab1]'} w-28 rounded-lg p-1 text-center`}>
          {value ? "Active" : "Inactive"}
        </p>

      </div>
    ),
  },
];

export { 
  topUserHeader, 
  permissionHeadings, 
  conditionHeadings,
  couponHeadings
};
