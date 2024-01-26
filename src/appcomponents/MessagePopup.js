import { Divider, Grid, Tooltip } from '@mui/material'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import React from 'react'
import { Link } from 'react-router-dom'
import ViewAll from "assets/images/icons/svg/ViewAll.svg"

export default function MessagePopup(props) {
  //Get initial letter
  const getInitialLetter = (name) => {
    var names = name?.split(' ');
    if (names?.length > 0) {
      let initials = names[0].substring(0, 1).toUpperCase();
      return initials;
    }
    return "";
  }

  // Get time 
  function getTime(time) {
    let date = new Date(time);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.substr(-2);
  }

  //Close message popover
  const closeMessagePopover=(e)=>{
    props?.closeCallback();
  }

  return (
    <div>
      <MDBCard
        bgcolor="biaAssist"
        sx={{ m: 0, p: 0, my: 2, width: "280px" }}
      >
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
              Messages
            </MDBTypography>
          </Grid>
          <Grid item> 
            <Tooltip title="View All">
              <MDBButton
                variant="contained"
                component={Link}
                to="/c/proposals"
                iconOnly={true}
                bgColor="light_green"
                color="biaAssist"
                onClick={(e)=>closeMessagePopover(e)}
              >
                <MDBTypography
                  component="img"
                  src={ViewAll}
                />
              </MDBButton>
            </Tooltip> 
          </Grid>
        </Grid>
        <Divider sx={{ m: 0, mb: 2.875 }} />

        {props?.proposals?.map((item, idx) => (
          <Grid px={2} pb={1.5} key={idx} sx={{ maxHeight: "400px", overflowY: "auto" }}>
            <Grid container>
              <Grid item pr={1}>
                <MDBTypography
                  color="white"
                  fontWeight="medium"
                  fontSize="md"
                  lineHeightSize="2xl"
                  sx={{ borderRadius: "48px", border: "1px solid #D2D2D3", width: "36px", height: "36px", pl: 1.4, pt: 0.8 }}
                >
                  {getInitialLetter(item.senderName)}
                </MDBTypography>
              </Grid>
              <Grid item width="82%">
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <MDBTypography
                      color="white"
                      fontWeight="bold"
                      fontSize="md"
                      lineHeightSize="xl"
                      maxWidth="170px"
                      sx={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                      }}
                    >
                      {item.senderName}
                    </MDBTypography>
                  </Grid>
                  <Grid item>
                    <MDBTypography
                      color="grayScale"
                      fontWeight="regular"
                      fontSize="xs"
                      lineHeightSize="md"
                    >
                      {getTime(item.createdAt)}
                    </MDBTypography>
                  </Grid>
                </Grid>
                <Grid container>
                  <MDBTypography
                    color="grayScale"
                    fontWeight="regular"
                    fontSize="sm"
                    lineHeightSize="xxl"
                    sx={{
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1,
                    }}
                  >
                    {item.content}
                  </MDBTypography>
                </Grid>
              </Grid>
            </Grid>
            {(idx < props?.proposals.length - 1) &&
              <Divider sx={{ my: 1.5 }} />
            }
          </Grid>
        ))}

        {((props?.proposals?.length > 0) !== true) &&
          <Grid
            container
            alignContent="center"
            justifyContent="center"
          >
            <Grid item>
              <MDBTypography
                color="white"
                fontWeight="regular"
                fontSize="lg"
                lineHeightSize="2xl"
                pb={3}
              >
                No Messages
              </MDBTypography>
            </Grid>
          </Grid>
        }
      </MDBCard>
    </div>
  )
}
