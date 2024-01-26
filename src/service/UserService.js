import httpService from "service/HttpService"; 
const $UserService = { 
  updateUserSession: (userId,updateSessionCallback) => { 
      httpService.getUserDetails(userId).then((res) => {  
        console.log("UserService_res=",res)
        window.localStorage.setItem('user',JSON.stringify(res.data.data)); 
        httpService.setAuthToken(JSON.stringify(res?.data?.data?.uuId));
        updateSessionCallback();
    }) 
  }, 
  updateUserSessionWithUser: (user) => {  
      window.localStorage.setItem('user',JSON.stringify(user)); 
      httpService.setAuthToken(user.uuId);  
  }, 
  //Reset password
  resetPassword: (payload,successCallback,errorCallback) => {  
    httpService.resetPassword(payload).then((res) => { 
      successCallback(res.data)
    }).catch((error) => {
      errorCallback(error)
    });
  }, 
   // Update password
   updatePassword: (payload,successCallback,errorCallback) => {  
    httpService.updatePassword(payload).then((res) => { 
      successCallback(res.data)
    }).catch((error) => {
      errorCallback(error)
    });
  }, 
  // Verify user
  verifyUser: (payload,callback) => {  
    httpService.verifyUser(payload).then((res) => { 
      callback(res.data)
    })
  }, 
  // Register
  register: (payload,successCallback,errorCallback) => {  
    httpService.postBrandCategories(payload).then((res) => { 
      successCallback(res.data)
    }).catch((error)=>{
      errorCallback(error)
    });
  }, 
  // Login
  login: (payload,successCallback,errorCallback) => {  
    httpService.login(payload).then((res) => { 
      successCallback(res.data)
    }).catch((error)=>{
      errorCallback(error)
    });
  }, 
  // Save user
  saveUser: (payload,successCallback,errorCallback) => {  
    httpService.createCreator(payload).then((res) => { 
      successCallback(res.data)
    }).catch((error)=>{
      errorCallback(error)
    });
  }, 
  // Change password
  ChangePassword:(payload,successCallback,errorCallback)=>{
    httpService.ChangePassword(payload).then((res) => { 
      successCallback(res.data)
    }).catch((error)=>{
      errorCallback()
    });
  },
  //Get user from session
  getUserFromSession : () => {
    if (window.localStorage.getItem("user")) {
      let parsedUserInfo = JSON.parse(window.localStorage.getItem("user"));
      return parsedUserInfo;
    }
    return null;
  },
   // Check user is verified and active
   isUserAuthenticate: () => {
    if (window.localStorage.getItem("user")) {
      let parsedUserInfo = JSON.parse(window.localStorage.getItem("user"));
      if(parsedUserInfo.active === true){
        return true
      }
    }
    return false;
  },
  getUserById : (userId,callback) => {
    httpService.getUserDetails(userId).then((res) => {  
      callback(res.data.data);  
  }) 
  }
};
export default $UserService;
