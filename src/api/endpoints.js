export const API ={
    // Authentication 
    SignUp : '/api/Authentication/Signup', //post 
    Login : '/api/Authentication/SignIn', //post 
    AdminSignIn: "/api/Authentication/AdminSignIn",//post
    RefreshToken : '/api/Authentication/TokenRefresh',  //post 
    RevokeToken : '/api/Authentication/TokenRevoke',  //post 
    ChangePassword : '/api/Authentication/ChangePassword',  //post 
    GetLoginUser : '/api/Authentication/GetLoggedInUser', //get 
    ResetPasswordRequest:'/api/Authentication/ResetPasswordRequest', // post 
    ResetPassword:'/api/Authentication/ResetPassword', // post 

    //Coupon
    VerifyCoupon: "/api/CleaningCoupon/VerifyByCode", // post



    // Application User...... 
    PostUser : '/api/ApplicationUser/Create', //post 
    GetUser : '/api/ApplicationUser/GetAll', //get  
    GetSingleUser : '/api/ApplicationUser/GetById/' , //get 
    UpdateSingleUser : '/api/ApplicationUser/UpdateById/' , //patch 
    DeleteUser : '/api/ApplicationUser/DeleteById/', // delete 
    UpdateProfile : '/api/ApplicationUser/UpdateOwnProfile', // patch 
    UpdateProfilePicture : '/api/ApplicationUser/UpdateOwnProfilePicture', // patch 


    // Cleaning Subscription API
    ADDCleaningSubscription: '/api/CleaningSubscription/AddSubscription', //post 
    GetCleaningSubscription: '/api/CleaningSubscription/GetUserSubscription', //get
    GetAllSubscriptionType : '/api/CleaningSubscription/GetAllSubscriptionTypes', //get 
    GetAllSubscription: '/api/CleaningSubscription/GetAll', //get 
    CancelSubscription:'/api/CleaningSubscription/CancelSubscriptionById', //patch
    GetSubscriptionByID: '/api/CleaningSubscription/GetById', // get by id
    UpdateCleaningSUbscription: '/api/CleaningSubscription/UpdateSubscriptionById/', // patch 

    // Cleaning Prices 
    PostCleaningPrice: "/api/CleaningPrice/Create", // post 
    UpdateCleaningPrice: "/api/CleaningPrice/UpdateById", // post 
    GetAllCleaningPrice: "/api/CleaningPrice/GetAll", // get 
    DropdownCleaningPrice: "/api/CleaningPrice/GetAllSubscriptionFrequenciesForDropdown", //get

    // Cleaning Bookings 
    GetCleaningBooks: "/api/CleaningBooking/GetAll", // get 
    UpdateCleaningBooking: "/api/CleaningBooking/UpdateById", //patch
    GetAllCleaningBooking: "/api/CleaningBooking/GetAllPaidBooking",//get

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

    //Dashboard 
    Dashboard : "api/Dashboard/GetCardStats", // get 
    GetTopUser: "/api/CleaningBooking/GetTopBookingUsers"

}