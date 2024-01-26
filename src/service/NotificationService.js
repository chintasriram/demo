import httpService from "service/HttpService"; 
import userService from "service/UserService"; 
const $NotificationService = { 
  sendNotification: (payload,callback) => {  
     /* httpService.sendNotification(payload).then((res) => {  
         callback(res?.data?.data);
    }) */
  },  
  getUnreadNotificationsCount:(callback) => {
    let user = userService.getUserFromSession(); 
    httpService.getUnreadNotificationsCount(user.id).then((res) => {  
      if (res !== undefined && res?.data !== undefined && res?.data?.success === true) {
          callback(res?.data?.data);
      } else {
        callback(0);
      }
    }).catch(error => {
      callback(0);
    })
  },
  getUnreadNotifications:(callback) => {
    let user = userService.getUserFromSession(); 
    httpService.getUnreadNotifications(user.id).then((res) => {  
      callback(res?.data?.data); 
    }).catch(error => {
      callback([]);
    })
  },
  updateReadStatus:(callback)=>{
    let user = userService.getUserFromSession(); 
    httpService.updateNSReadStatus(user.id).then((res) => {  
      callback(0); 
    }).catch(error => {
      callback(0);
    })
  },
  getAllIncomingNotifications:(callback) => {
    let user = userService.getUserFromSession(); 
    httpService.getAllIncomingNotifications(user.id).then((res) => {  
      callback(res?.data?.data); 
    }).catch(error => {
      callback([]);
    })
  },
};
export default $NotificationService;
