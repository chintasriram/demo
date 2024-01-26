import React from 'react'
import { useState } from "react";
import { Grid } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import BookMeetingCard from './cards/BookMeetingCard';
import EventService from "service/EventService"
import MDBButton from 'components/MDBButton';
import GoogleAuth from 'service/GoogleAuth';
import calendarService from 'service/CalendarService';
import { toast } from 'react-toastify';
import $UserService from 'service/UserService';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { createStyles, makeStyles } from "@material-ui/core"; 
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import DateService from 'service/DateService';
import $HttpService from 'service/HttpService'; 
import ViewEvent from './ViewEvent'; 
import EventDisplay from './cards/EventDisplay' 
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'

const EventForm = ({ scheduler }) => {
  return (
    <BookMeetingCard sx={{ border: "2px solid red" }} scheduler={scheduler} />
  );
};


const useStyles = makeStyles((biaTheme) =>
  createStyles({
    sc: {
      "& .rs__cell":{
        color:"#FFF",
        borderColor:"#44474A"
      }, 
      color: "#D2D2D3", 
      border: "none", 
      "& fieldset": { border: "none" },
     // "& button": { border: "1px solid blue", color: "#FFF",  fontWeight: "400px !important",
     // fontSize: "16px !important",},
      "& button svg ":{color:"#FFF !important","&:hover":{color:"#FFF"} ,fontSize:"24px !important"},
      //"& div  ":{"& p[style='color:#ccc']":{color:"#FFF !important"} },
      
      '& .MuiButton-text': {
        color: "#FFF", 
        fontWeight: "400px !important",
        fontSize: "16px !important",
      },
      '& .MuiButton-textPrimary': {
        color: "#BBDCD2 !important",
        fontWeight: "400px !important",
        fontSize: "16px !important",
      },
      '& div[data-testid="date-navigator"] > button':{
        color: "#FFF !important", 
        fontWeight: "400px !important",
        fontSize: "16px !important",
      }, 
      "& span[class='rs__cell rs__header rs__today_cell'] > div > p":{
        color:"#BBDCD2 !important",   
      }, 
      "& span[class='rs__cell rs__header rs__today_cell']":{  
        zIndex: "100",
        "& div:nth-of-type(1)":{
          display: "flex",
          flexDirection: "column-reverse", 
          height: "inherit",
          justifyContent: "center"
        },
        "& p":{
          fontWeight: "400 !important",
          fontSize: "12px   !important",
          lineHeight:"16px"
        }
      },
      "& .rs__cell.rs__header":{  
        borderColor:"none !important",
        "& div:nth-of-type(1)":{
          display: "flex",
          flexDirection: "column-reverse",   
          height: "inherit",
          justifyContent: "center"
        },
        "& p":{
          fontWeight: "400  !important",
          fontSize: "12px   !important",
          lineHeight:"16px", 
        }, 
      },
      "& .rs__cell > .MuiAvatar-root ":{
        top:"73% !important",
        right:"0 !important",
        marginRight:"5px !important",
        "& p":{
          fontWeight: "500  !important",
          fontSize: "12px   !important",
          color:"#FFF !important"
        }
      },
      //"& .rs__cell  > MuiAvatar-root > p":{color:"black !important"} , 
      '& .rs__outer_table > div > div[days="7"]':{
        borderColor:"#44474A",
        '& .rs__cell:nth-of-type(1)':{ 
          //borderBottom:"1px #44474A solid",
          background:"#1C1F21"
        }
      },
      '& .rs__outer_table > div > div[days="5"]':{
        borderColor:"#44474A",
        '& .rs__cell:nth-of-type(1)':{ 
          //borderBottom:"1px #44474A solid",
          background:"#1C1F21"
        },
      }, 
      '& .rs__outer_table > div > div[days="1"]':{
        borderColor:"#44474A",
        '& .rs__cell:nth-of-type(1)':{
          //borderBottom:"1px #44474A solid",
          background:"#1C1F21"
        }
      },
      '& .rs__cell>button:hover':{
        background:"#2C3334 !important",   
      },
      '& .rs__cell:hover':{
        background:"#2C3334 !important",  
        // "& p":{color:"#BBDCD2 !important"}, 
      } ,
      '& .rs__cell.rs__time':{ 
        borderBottom:"none",
        borderTop:"none",
        background:"#1C1F21",
        alignItems:"start",
      },
      '& .rs__cell.rs__time > span':{
        marginTop:"-7px",
        
      }, 
      "& span[class='rs__cell rs__header rs__time']:first-of-type > span":{ 
        background:"white"
      },
      '& span[class="rs__cell rs__header rs__time"]:hover':{
        background:"red"
      },
      '&.rs__cell.rs__header.rs__time:hover':{
        background:"none",   
      },
      '& .MuiButtonBase-root  p':{
        color:"#111315!important"
      } 
    },
    
  })
);
export default function BiaCalender(props) {
  const classes = useStyles(); 
  toast.configure();
  const [query, setQuery] = useState({}); 
  const [events, setEvents] = useState([]);   
  const [isMiniView, setMiniView] = useState(true);    

  
  const onEventDelete = async (id) => { 
    return new Promise((res) => {
        EventService.deleteEvent(id, deleteEventCallback);
        res(id); 
    });
  }
  const deleteEventCallback = () => {
    //getMiniCalendar(); 
  }
  const syncToGoogleClick = () => {
    const suser = $UserService.getUserFromSession();
    $UserService.getUserById(suser.id, userCheck);
  }
  const userCheck = (res) => {
    /*if (res?.userCalendars?.google?.connected) {
      calendarService.googleFullSync(syncCallback);
    } else {*/
      console.log("google auth");
      messageRecieved = false;
      let googleAuth = new GoogleAuth(messasgeHandler);
      googleAuth.googleClick();
    //}
  }
  const syncCallback = (res) => {
    if (res !== undefined && res?.data !== undefined && res?.data?.success === true) {
      //On success
      // store logged in user into session/localstorage
      toast.success("Calendar sync started in background. You will receive a notification once finished.", 
      { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, autoClose: 3000,icon:<img src={toastIcon}/> });

      //setCalendars(res?.data?.data);
    } else {
      //On error
      toast.error("Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, autoClose: 3000 });
    }
  }
  let messageRecieved = false;

  const messasgeHandler = (e) => {
    if (e.origin == window.location.origin) {
      if (e.data["isCallback"] && messageRecieved == false) {
        messageRecieved = true;
        oauthCallback(e.data);
        window.removeEventListener('message', messasgeHandler);
      }
    }
  }
  const oauthCallback = (data) => {
    if (data.token == null || data.token === undefined || data.token === "") {
      toast.error("Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, autoClose: 3000});
    } else {
      calendarService.googleCalendarConnect(data.provider, "", data.handler, "", data.token, data.refresh_token, syncCallback);
    }
  } 
  //Show full calendar
  const showFullCalendar = () =>{ 
    setMiniView(isMiniView?false:true);
    fetchRemote1();
  } 
  // Get events payload
  const getEventsPayload=(queryStr)=>{
    let eventsPayload= {start:"",end:""}
    if(queryStr && queryStr !== "" && queryStr !== null){
      //Convert query string to object
      const parsedQueryObj = new URLSearchParams(queryStr);
      if(parsedQueryObj && parsedQueryObj?.has('start') && parsedQueryObj?.has('end')){
        eventsPayload["start"] = DateService.convertDateToDateStr(parsedQueryObj.get('start'))
        eventsPayload["end"] = DateService.convertDateToDateStr(parsedQueryObj.get('end'))
      }
    }  
    return eventsPayload;
  }
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
  const fetchRemote = async (query) => {
    setQuery(query); 
    /**Simulate fetchin remote data */
    return new Promise((res) => {
      let payload = getEventsPayload(query);
      let userInfo = $UserService.getUserFromSession(); 
      payload["userId"] = userInfo.id;
      let calendarEvents=[];
      $HttpService.getPlanner(payload).then((resp) => {
        if (resp !== undefined && resp?.data !== undefined && resp?.data?.success === true) {
          calendarEvents = prepareEvents(resp?.data?.data);
        } 
        res(calendarEvents)
       // setEvents(calendarEvents)
      }).catch(error => {
        res(calendarEvents)
        //setEvents(calendarEvents)
      })
    });
  };
  const fetchRemote1 = () => { 
    /**Simulate fetchin remote data */ 
      let payload = getEventsPayload(query);
      let userInfo = $UserService.getUserFromSession(); 
      payload["userId"] = userInfo.id;
      let calendarEvents=[];
      $HttpService.getPlanner(payload).then((resp) => {
        if (resp !== undefined && resp?.data !== undefined && resp?.data?.success === true) {
          calendarEvents = prepareEvents(resp?.data?.data);
        } 
         setEvents(calendarEvents)
      }).catch(error => {
         //setEvents(calendarEvents)
      }) 
  };
  return (
    <Grid  >
      <Grid
        container
        justifyContent="flex-end"
        pt={5}
        pr={5}
      >
        <Grid item  > 
          <Grid container>
            <GoogleLoginButton  onClick={syncToGoogleClick} align="center">Sync Google Calendar</GoogleLoginButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid sx={{ p: 5}}className={classes.sc} >  
        <Scheduler    
          //remoteEvents={(query)=>getCalendarEvents(query)}
          getRemoteEvents={fetchRemote} 
          view='week'
          events={events}
          month={{
            weekDays:isMiniView?[ 2, 3, 4, 5, 6]:[0, 1, 2, 3, 4, 5, 6],
            weekStartOn: 6, 
            startHour:isMiniView?8:0,
            endHour: isMiniView?18:23,
            navigation: true
            // color :"red",
          }} 
          week={{
            weekDays:isMiniView?[ 2, 3, 4, 5, 6]:[0, 1, 2, 3, 4, 5, 6],
            weekStartOn: 6,
            startHour:isMiniView?8:0,
            endHour: isMiniView?18:23,
            step: 60,
            navigation: true 
          }}
          day={{ 
            weekStartOn: 6,
            startHour:isMiniView?8:0,
            endHour: isMiniView?18:23,
            step: 60,
            navigation: true
          }}
          style={{ height: "700px" }}
          customEditor={(scheduler) => <EventForm scheduler={scheduler} />}
          viewerExtraComponent={(fields, event) => {
            return (
              <ViewEvent event={event}/>
            );
          }}
          onDelete={onEventDelete}
        /> 

        <Grid container justifyContent="flex-end" py={2}>
          <Grid item>
            <MDBButton
              variant= "contained"
              color= "light_green"
              bgColor= "supaLight"
              fontWeight = "medium"
              fontSize = "md"
              borderSize = "md"
              onClick={()=>showFullCalendar()}
              startIcon={!isMiniView ? <UnfoldLessIcon style={{ fill: '#BBDCD2' }} /> : <UnfoldMoreIcon style={{ fill: '#BBDCD2' }} />}
            >
              {(!isMiniView ? "Mini view" : "Full view")} 
            </MDBButton>
          </Grid>
        </Grid>
      </Grid> 
    </Grid>
  )
}
