import httpService from "service/HttpService"; 
import userService from "service/UserService"; 
 
const $CalendarService = { 

  googleCalendarConnect : (provider, id, name, email, token, refresh_token,callback) => { 
    let user = userService.getUserFromSession()
    let payload = {
      "userId": user.id
    }
    let settings = {
      "platform": provider,
      "token": token,
      "handler": email,
      "refreshToken": refresh_token,
      "isPullEnabled": true,
      "isPushEnabled": true,
      "eventTypes": ["all"]
    }
    if (provider === "youtube" || provider ==="google"|| provider === null) {
      settings.platform = "google";
      payload["google"] = settings;
    } else {
      payload["outlook"] = settings;
    }
    httpService.calendarConnect(payload).then((res) => { 
      callback(res); 
    }).catch(error => {
     // toast.error(error, { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, autoClose: 3000 });

    })

  },
  googleFullSync : (callback) => { 
    let user = userService.getUserFromSession()
    let payload = {
      "userId": user.id
    } 
    httpService.calendarFullSync(payload).then((res) => { 
      callback(res); 
    }).catch(error => {
     // toast.error(error, { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, autoClose: 3000 });

    })

  }
};
export default $CalendarService;
