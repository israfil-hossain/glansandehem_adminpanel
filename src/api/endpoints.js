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

    // Space Type 
    CreateSpaceType : '/api/SpaceType/Create' , // post 
    GetSpaceType : '/api/SpaceType/GetAll', //get 
    GetSingleSpaceType : '/api/SpaceType/GetById/{DocId}', //get 
    UpdateSpaceType : '/api/SpaceType/UpdateById/{DocId}', //patch 
    DeleteSpaceType : '/api/SpaceType/DeleteById/{DocId}', //delete

    //SpaceAccess Option 
    SpaceAccessCreate : '/api/SpaceAccessOption/Create', //post 
    GetSpaceAccessOption : '/api/SpaceAccessOption/GetAll', // get 
    GetSingleAccessOption : '/api/SpaceAccessOption/GetById/{DocId}', //get 
    UpdateAccessOption : '/api/SpaceAccessOption/UpdateById/{DocId}', //update-patch 
    DeleteAccessOption : '/api/SpaceAccessOption/DeleteById/{DocId}', //delete 

    // Storage  Condition Features 
    StorageConditionCreate : '/api/api/StorageConditionFeature/Create', //post 
    GetStorageCondition : '/api/StorageConditionFeature/GetAll', // get 
    DeleteStorageCondition : '/api/StorageConditionFeature/DeleteById', // delete 

    // Space Security Features 
    SpaceSecurityFeatureCreate : '/api/SpaceSecurityFeature/Create', //post 
    GetSpaceSecurityFeature : '/api/SpaceSecurityFeature/GetAll', //get 
    DeleteSpaceSecurityFeature : '/api/SpaceSecurityFeature/DeleteById/{DocId}', //delete 

    // Space Schedule Features  
    SpaceScheduleFeatureCreate : '/api/SpaceScheduleFeature/Create', //post 
    GetSpaceScheduleFeature : '/api/SpaceScheduleFeature/GetAll', //get 
    DeleteSpaceScheduleFeature: '/api/SpaceScheduleFeature/DeleteById/{DocId}', //delete 


    // Space For Rent 
    SpaceForRentCreate : '/api/SpaceForRent/Create', //post 
    GetSpaceForRent : '/api/SpaceForRent/GetAll', //get 
    GetSingleSpaceForRent: '/api/SpaceForRent/GetById/{DocId}', //get 
    UpdateSpaceForRent : '/api/SpaceForRent/UpdateById/{DocId}', //update
    DeleteSpaceForRent: '/api/SpaceForRent/DeleteById/{DocId}', //delete

    AddSpaceImage : '/api/SpaceForRent/AddSpaceImageById/{DocId}', //post 
    DeleteSpaceImage : '/api/SpaceForRent/DeleteSpaceImageById/{SpaceId}/{ImageId}', //delete 


}