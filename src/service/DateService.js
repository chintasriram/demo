const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

const padTo2Digits = (num) => {
  return num.toString().padStart(2, '0');
}

// Get day and date
const getDayAndDate=(date,isToday)=>{
  return {
    "day":days[date.getDay()],
    "date":date.getDate(),
    "month": date?.toLocaleString('default', { month: 'long' }),
    "year": date.getFullYear(),
    "fullDate": convertDateToFormattedDate(date),
    "isSelected":(isToday)?true:false,
    "events":[]
  }
}

// Get Future day and date
const getFutureDayAndDate=(num)=>{
  let isToday = (num==0)?true:false;
  let date = new Date();
  date.setDate(date.getDate()+num);
  return getDayAndDate(date,isToday)
}

// Convert timestamp to date- YYYY-MM-DD
const convertDateToFormattedDate=(date)=>{
  var today = new Date(date);
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return yyyy+"-"+mm+"-"+dd;
}

// Get time with meridiem - hh:mm am/pm
function getTimeInAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var time = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var timeStr = hours + ':' + minutes + ' ' + time;
  return timeStr;
}

// Get month and date from timestamp- MM DD, hh:mm am/pm
const getFormattedDatetimeFromTs=(timestamp)=>{
  let dateSrc = new Date(timestamp);
  let month =  dateSrc?.toLocaleString('default', { month: 'short' })
  let dateNum = dateSrc.getDate()
  let time= getTimeInAMPM(dateSrc)
  return month+" "+dateNum+", "+time;
}
// Convert timestamp to date- YYYY-MM-DD
const getFormattedDateTime=(date)=>{
  var today = new Date(date);
  var dd = String(today.getDate()).padStart(2, '0');
  var MM = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var hh = (today.getHours()!==0)?today.getHours():"00";
  var mm = (today.getMinutes()!==0)?today.getMinutes():"00";
  return yyyy+"-"+MM+"-"+dd+" "+hh+":"+mm;
}
const DateService = { 
  formatDate: (date) => {  
    if(date!==undefined){ 
      return (
        [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join('-') +
        'T' +
        [
          padTo2Digits(date.getHours()),
          padTo2Digits(date.getMinutes()) 
        ].join(':')
      ); 
    }
  }, 
  formatUTCDate: (date) => {  
    if(date!==undefined){ 
      return (
        [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join('-') +
        'T' +
        [
          padTo2Digits(date.getUTCHours()),
          padTo2Digits(date.getUTCMinutes()) 
        ].join(':')
      ); 
    }
  },
  // Get Mini calendar dates
  getMiniCalendarDates:(numOfDays)=>{
    let calendarDates = [];
    for(let num=0; num<numOfDays; num++){
      calendarDates.push(getFutureDayAndDate(num))
    }
    return calendarDates;
  },
  // Get mini calendar event satrt time
  getMcEventStartTime:(startTimestamp)=>{
    let dateSrc = new Date(startTimestamp);
    return getTimeInAMPM(dateSrc);
  },
  // Get mini calendar event end time
  getMcEventEndTime:(startTimestamp,endTimestamp)=>{
    let startDtStr = convertDateToFormattedDate(new Date(startTimestamp)).toString();
    let endDtStr = convertDateToFormattedDate(new Date(endTimestamp)).toString();
    // Check start date and end date is same
    if(startDtStr && endDtStr && startDtStr===endDtStr){
      // Get time
      let endTime = new Date(endTimestamp);
      return getTimeInAMPM(endTime);
    }else{
      // Get date time
      return getFormattedDatetimeFromTs(endTimestamp)
    }
  },
  // Convert timestamp to date- YYYY-MM-DD
  convertTsToFormattedDate:(timestamp)=>{
    return new Date(timestamp).toJSON().slice(0, 10);
  },
  convertDateToDateStr:(dateIn)=>{
    return getFormattedDateTime(dateIn).toString();
  },

  //Get custom time and date (Friday, Aug 23 9:00 - 9.30 AM EST) using time stamps
  timeStampToDateFormate: (strtDate, endDate) =>{
    const timeStampStart = new Date(strtDate);
    const timeStampEnd = new Date(endDate);
  
    //To Get date
    let date = timeStampStart.getDate()
    //To Get month
    let month = months[timeStampStart.getMonth()]
    //To Get day
    let day = days[timeStampStart.getDay()]
    //To Get timezone
    let timeZone = new Date(timeStampStart).toLocaleDateString(undefined, {day:'2-digit',timeZoneName: 'long' }).substring(4).match(/\b(\w)/g).join('')

    let customeDate = day+", "+month+" "+date+" "+getTimeInAMPM(timeStampStart)+" - "+getTimeInAMPM(timeStampEnd)+" "+timeZone;
    return customeDate;
  }
};
export default DateService;
