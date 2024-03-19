export const API ={
    // Authentication 
    SignUp : '/api/Authentication/Signup', //post 
    Login : '/api/Authentication/SignIn', //post 
    AdminSignIn: "/api/Authentication/AdminSignIn",//post
    RefreshToken : '/api/Authentication/TokenRefresh',  //post 
    RevokeToken : '/api/Authentication/TokenRevoke',  //post 
    ChangePassword : '/api/api/Authentication/ChangePassword',  //post 
    GetLoginUser : '/api/Authentication/GetLoggedInUser', //get 
    GetProfile : '/api/Authentication/UpdateProfilePicture', // patch 

    // User...... 
    PostUser : '/api/User/Create', //post 
    GetUser : '/api/User/GetAll', //get  
    GetSingleUser : '/api/User/GetById/{DocId}' , //get 
    DeleteUser : '/api/User/DeleteById/{DocId}', // delete 

    // Cleaning Subscription Add 
    ADDCleaningSubscription: '/api/CleaningSubscription/AddSubscription', //post 
    GetCleaningSubscription: '/api/CleaningSubscription/GetUserSubscription', //get
    GetAllSubscriptionType : '/api/CleaningSubscription/GetAllSubscriptionTypes', //get 
    GetAllSubscription: '/api/CleaningSubscription/GetAll', //get 

    // Cleaning Prices 
    PostCleaningPrice: "/api/CleaningPrice/Create", // post 
    GetAllCleaningPrice: "/api/CleaningPrice/GetAll", // get 
    DropdownCleaningPrice: "/api/CleaningPrice/GetAllSubscriptionFrequenciesForDropdown", //get

    // Cleaning Bookings 
    GetCleaningBooks: "/api/CleaningBooking/GetAll", // get 
    

    //Cleaning Time Slots 
    PostCleaningTimeSlot : "/api/CleaningTimeSlot/Create", // post 
    GetAllTimeSlots : "/api/CleaningTimeSlot/GetAll", // get 
    GetTimeSlotsWeekdays: "/api/CleaningTimeSlot/GetAllByWeekdays", //get 

    //Coupon 
    VerifyCoupon : "/api/CleaningCoupon/VerifyByCode", // post 
    GetAllCoupon:"/api/CleaningCoupon/GetAll",
    AddCoupon:"/api/CleaningCoupon/Create",
    GetSingleCoupon:"/api/CleaningCoupon/GetById/", 
    UpdateCoupon:"/api/CleaningCoupon/UpdateById/",
    DeleteCoupon:"/api/CleaningCoupon/DeleteById",


    //Supplies Charge 
    SuppliesCharge : "/api/Configuration/GetSuppliesCharge", // get 
    UpdateSuppliesCharge : "/api/Configuration/SetSuppliesCharge", // get 
}