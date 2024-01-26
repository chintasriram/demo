import React, { useEffect, useState } from "react";
import { Divider, Grid } from "@mui/material";
import MDBTypography from "components/MDBTypography";
import ViewDayCell from "./ViewDayCell";
import MDBCard from "components/MDBCard";
import BasicSelect from "components/Dropdown";
import httpService from "service/HttpService";
import { toast } from "react-toastify";
import DateService from "service/DateService";
import { useWidth } from "components/Hooks/UseWidth";
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'

export default function MiniCalendar() {
  const breakpoint = useWidth()[0]
  toast.configure();
  // viewlist for calender
  const viewTypes = ["Next 5 days", "Next 7 days", "Next 1 Month"];
  const Types = ["All Events", "Personal"];
  const [events, setEvents] = useState(null);
  const [calendarDates, setCalendarDates] = useState([]);

  useEffect(() => {
    // Get calendar dates
    getCalendarDates(6);
  }, []);

  useEffect(() => {
    if (events !== null) {
      let updatedCalendarDates = [];
      // Iterate the calendar dates
      calendarDates?.map((calendarData, idx) => {
        // Get events based on start date
        let eventsList = events?.customEvents?.filter(
          (c) =>
            DateService.convertTsToFormattedDate(c.start).toString() ===
            calendarData.fullDate.toString()
        );
        calendarData["events"] = eventsList?.length > 0 ? eventsList : [];
        updatedCalendarDates.push(calendarData);
      });
      setCalendarDates(updatedCalendarDates);
    }
  }, [events]);

  // Get calendar dates
  function getCalendarDates(daysNum) {
    let userInfo = getUserFromSession();
    let calendarDatesList = DateService.getMiniCalendarDates(daysNum);
    if (calendarDatesList?.length > 0) {
      setCalendarDates(calendarDatesList);
      // Get mini calendar events
      if (userInfo != null) {
        getMiniCalendarEvents(userInfo.id);
      }
    }
  }

  const getMiniCalendarEvents = (userId) => {
    httpService
      .getPlanner({ userId: userId })
      .then((res) => {
        if (
          res !== undefined &&
          res?.data !== undefined &&
          res?.data?.success === true
        ) {
          setEvents(res?.data?.data);
        } else {
          //On error
          toast.success("Please try again", {
            position: toast.POSITION.TOP_LEFT,
            hideProgressBar: true,
            autoClose: 3000,
            icon:<img src={toastIcon}/>
          });
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: toast.POSITION.TOP_LEFT,
          hideProgressBar: true,
          autoClose: 3000
        });
      });
  };
  //Get user from session
  const getUserFromSession = () => {
    if (window.localStorage.getItem("user")) {
      let parsedUserInfo = JSON.parse(window.localStorage.getItem("user"));
      return parsedUserInfo;
    }
    return null;
  };

  // On event type change
  const onEventTypeChange = (eventType) => {
    if (eventType) {
      switch (eventType.toLowerCase()) {
        case "next 5 days":
          getCalendarDates(6);
          break;
        case "next 7 days":
          getCalendarDates(8);
          break;
        case "next 1 month":
          getCalendarDates(31);
          break;
        default:
          break;
      }
    }
  };

  return (
    <Grid>
      <MDBCard sx={{ m: 0, mb: 2, pl:3, pr:0, py:3, width: "inherit" }}>
        {/* header of calender */}
        <Grid container justifyContent="space-between" pr={3}>
          <Grid item alignSelf="center">
            <Grid container>
              <Grid item mr={1} pb={1}>
                {calendarDates?.length > 0 && (
                  <MDBTypography
                    fontWeight="medium"
                    fontSize="xl"
                    lineHeight="2xl"
                  >
                    {calendarDates[0]?.month} {calendarDates[0]?.year}
                  </MDBTypography>
                )}
              </Grid>
              <Grid item>
                <MDBTypography
                  fontWeight="medium"
                  fontSize="xl"
                  lineHeight="2xl"
                  color="grey400"
                  // sx={{ ml: 1 }}
                >
                  Calendar
                </MDBTypography>
              </Grid>
            </Grid>
          </Grid>

          {/* basic select */}
          <Grid item>
            <Grid container>
              <Grid item mr={2} pb={1} display="none">
                <BasicSelect
                  placeholder="All Events"
                  contents={Types}
                />
              </Grid>
              <Grid item>
                <BasicSelect
                  placeholder="Select View"
                  contents={viewTypes}
                  basicSelectCallback={onEventTypeChange}
                  defaultValue = {"Next 5 days"}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* ViewDayCell compoenent mapping */}
        <Grid
          container
          sx={{
            mt: 2.5,
            maxHeight: "600px",
            overflow: "scroll",
          }}
        >
          {calendarDates?.map((value, idx) => (
            <Grid item display="flex" xs={12} sm={12} md={4} lg={4} xl={4} xxl={3} xxel={2} el={2}>
              <Grid item xs={12}>
                <ViewDayCell key={idx} data={value} />
              </Grid>
              <Grid 
                sx={{
                  display: {xs: (idx+1)%1 === 0 ? "none": "block", md: (idx+1)%3 === 0 ? "none": "block", lg: (idx+1)%3 === 0 ? "none": "block", xxl: (idx+1)%4 === 0 ? "none": "block", xel: (idx+1)%4 === 0 ? "none": "block", xxel: (idx+1)%6 === 0 ? "none": "block" }
                  }}
                >
                <Divider orientation="vertical" sx={{mx: 2, width: "2px", height: "100%", backgroundColor: "#3B3D40"}}/>
              </Grid>
              <Grid 
                sx={{
                  mr:2.5,
                  display: {xs: (idx+1)%1 === 0 ? "block": "none", md: (idx+1)%3 === 0 ? "block": "none", lg: (idx+1)%3 === 0 ? "block": "none", xxl: (idx+1)%4 === 0 ? "block": "none", xel: (idx+1)%4 === 0 ? "block": "none", xxel: (idx+1)%6 === 0 ? "none": "block" }
                }}
              />
            </Grid>
          ))}
        </Grid>
      </MDBCard>
    </Grid>
  );
}