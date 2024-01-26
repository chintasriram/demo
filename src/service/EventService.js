import httpService from "service/HttpService"; 
import userService from "service/UserService";
import DateService from "service/DateService";
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'

const prepareEvent = (e) => {
  return {
    title: e.title,
    description: e.description,
    event_id: e.id,
    start: e.start ? new Date(e.start) : undefined,
    end: e.end ? new Date(e.end) : undefined,
    email: e.email ? e.email : "",
    location: e.location ? e.location : "",
    attendees: e.attendees ? e.attendees : [],
    phoneAttendees: e.phoneAttendees ? e.phoneAttendees : [], 
    googleEventId:e.googleEventId?e.googleEventId:""
  }
}
const prepareEvents = (events) => {
  if (events) {
   return events.customEvents.map((e) => (
      prepareEvent(e)
    ));
  }
}
const $EventService = { 
  createOrUpdate: (event,callback) => { 
    let userInfo = userService.getUserFromSession(); 
    event.userId = userInfo.id;
    event.clientId = userInfo.clientId;
    event.start = DateService.formatDate(new Date(new Date(event.start).toUTCString().slice(0, -4)));
    event.end = DateService.formatDate(new Date(new Date(event.end).toUTCString().slice(0, -4))); 
      httpService.createPlannerEvent(event).then((res) => {  
        if (res !== undefined && res?.data !== undefined && res?.data?.success === true) {
          //On success
          // store logged in user into session/localstorage
          //toast.success("You are successfully connected", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, autoClose: 3000,icon:<img src={toastIcon} /> });
          callback(prepareEvent(res?.data?.data));
        } else {
          //On error
          // toast.error("Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, autoClose: 3000 });
        }
        //callback(res);
    }) 
  },
  deleteEvent:(id,callback) => {
    let userInfo = userService.getUserFromSession(); 
    let payload = {"id":id,"userId":userInfo.id}
    httpService.deletePlannerEvent(payload).then((res) => {  
      callback(res);
  }) 
  },
  getEvents: (callback) => {
    let userInfo = userService.getUserFromSession(); 
    httpService.getPlanner({"userId":userInfo.id}).then((res) => {
      if (res !== undefined && res?.data !== undefined && res?.data?.success === true) {
        //On success
        // store logged in user into session/localstorage
        //toast.success("You are successfully connected", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, autoClose: 3000,icon:<img src={toastIcon} /> });
        callback(prepareEvents(res?.data?.data));
      } else {
        //On error
        // toast.error("Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, autoClose: 3000 });
      }
    }).catch(error => {
      //toast.error(error, { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, autoClose: 3000 });

    })
  } 
};
export default $EventService;
