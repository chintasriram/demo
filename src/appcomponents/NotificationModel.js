import MDBTypography from "components/MDBTypography";
import React from "react";
import { Divider, Grid, Tooltip } from "@mui/material";
import MDBCard from "components/MDBCard";
import MDBButton from "components/MDBButton";
import { Link } from "react-router-dom";
import ViewAll from "assets/images/icons/svg/ViewAll.svg";

export default function NotificationModel(props) {
  //Get initial letter
  const getInitialLetter = (name) => {
    var names = name?.split(" ");
    if (names?.length > 0) {
      let initials = names[0].substring(0, 1).toUpperCase();
      return initials;
    }
    return "";
  };
  // Get time
  function getTime(time) {
    let date = new Date(time);
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    return hours + ":" + minutes.substr(-2);
  }
  function getTime(time) {
    let date = new Date(time);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    return hours + ":" + minutes.substr(-2);
  }

  //Close notification model
  const closeNotificationModel = (e) => {
    props?.closeCallback();
  };

  return (
    <div>
      <Grid sx={{ mx: 2, my: 2 }}>
        <Grid>
          <MDBCard bgcolor="biaAssist" sx={{ p: 0, m: 0, width: "280px" }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              p={2}
            >
              <Grid item>
                <MDBTypography
                  color="white"
                  fontWeight="medium"
                  fontSize="xl"
                  lineHeightSize="2xxl"
                >
                  Notifications
                </MDBTypography>
              </Grid>
              <Grid item>
                <Tooltip title="View All">
                  <MDBButton
                    variant="contained"
                    component={Link}
                    to="/c/notifications"
                    iconOnly={true}
                    bgColor="light_green"
                    color="biaAssist"
                    onClick={(e)=>closeNotificationModel(e)}
                  >
                    <MDBTypography component="img" src={ViewAll} />
                  </MDBButton>
                </Tooltip>
              </Grid>
            </Grid>

            <Divider sx={{ m: 0, mb: 2.75 }} />

            <Grid sx={{ p: 0, m: 0, mb:2.75, maxHeight: "50vh", overflowY: "auto" }}>
              {props?.notifications?.map((data, idx) => (
                <Grid
                  key={idx}
                  // sx={{maxHeight: "400px", overflowY: "auto"}}
                >
                  <Grid container px={2}>
                    <Grid item>
                      <MDBTypography
                        color="white"
                        fontWeight="medium"
                        fontSize="md"
                        lineHeightSize="2xl"
                        sx={{
                          borderRadius: "48px",
                          border: "1px solid #D2D2D3",
                          width: "36px",
                          height: "36px",
                          pl: 1.5,
                          pt: 0.8,
                        }}
                      >
                        {getInitialLetter(data.title)
                          ? getInitialLetter(data.title)
                          : getInitialLetter("Planning")}
                      </MDBTypography>
                    </Grid>
                    <Grid item width="80%" pl={2}>
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <MDBTypography
                            fontWeight="medium"
                            fontSize="md"
                            lineHeight="xl"
                            maxWidth="130px"
                            sx={{
                              display: "-webkit-box",
                              overflow: "hidden",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 1,
                            }}
                          >
                            {data.title ? data.title : "Planning"}
                          </MDBTypography>
                        </Grid>
                        <Grid item>
                          <MDBTypography
                            fontWeight="regular"
                            fontSize="sm"
                            lineHeight="xxl"
                            color="grayScale"
                          >
                            {getTime(data.createdAt)}
                          </MDBTypography>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <MDBTypography
                          fontWeight="regular"
                          fontSize="sm"
                          lineHeight="xxl"
                          color="grayScale"
                          sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 1,
                          }}
                        >
                          {data.content}
                        </MDBTypography>
                      </Grid>
                    </Grid>
                  </Grid>

                  {idx < props?.notifications.length - 1 && (
                    <Divider
                      sx={{ mx: 2, my: 1.5, backgroundColor: "#1C1F21" }}
                    />
                  )}
                </Grid>
              ))}
              {props?.notifications?.length > 0 !== true && (
                <Grid container alignContent="center" justifyContent="center">
                  <Grid item>
                    <MDBTypography
                      color="white"
                      fontWeight="regular"
                      fontSize="lg"
                      lineHeightSize="2xl"
                      pb={3}
                    >
                      No Notifications
                    </MDBTypography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </MDBCard>
        </Grid>
      </Grid>
    </div>
  );
}
