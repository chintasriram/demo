import httpService from "service/HttpService"
import userService from "service/UserService"
class GoogleAuth { 
 
  messasgeHandler;  
  constructor(messasgeHandler) { 
    this.messasgeHandler = messasgeHandler;
    this.user = userService.getUserFromSession();
  }
  googleClick = () => { 
    let url = httpService.getSocialOauthUrl().replace("#provider#", "google") + "?userId=" + this.user?.id + "&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";
    this.messageRecieved = false;
    this.popupWindow(url, 'Google Oauth', window, 690, 440);
  }
  popupWindow(url, windowName, win, w, h) {
    const y = win.top.outerHeight / 2 + win.top.screenY - (h / 2);
    const x = win.top.outerWidth / 2 + win.top.screenX - (w / 2);
    win.addEventListener("message", this.messasgeHandler);
    return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
  } 
};
export default GoogleAuth;
