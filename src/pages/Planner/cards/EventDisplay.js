import { Grid } from "@material-ui/core"  
import MDBox from 'components/MDBox';
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email'; 
import MDBTypography from 'components/MDBTypography';

export default function EventDisplay(props) {

    return (
        <>
        <Grid bgcolor="black" sx={{ m: 0, p: 1, backgroundColor: "rgba(17, 19, 21, 0.96)", color: "#ffffff" }}>
                {/* <p>Useful to render custom fields...</p> */}
                {
                  ((props?.event?.description) && (props?.event?.description !== "")) &&
                  <MDBTypography
                    fontSize="md"
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: "bold"
                    }}
                  >
                    {props?.event?.description}
                  </MDBTypography>
                }
                {
                  ((props?.event?.location) && (props?.event?.location !== "")) &&
                  <MDBox
                    sx={{
                      pt: 0.25,
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <PlaceIcon style={{ fill: "#fff", width: "18px", height: "18px" }}></PlaceIcon>
                    <MDBTypography
                      fontSize="xs"
                      sx={{
                        textTransform: "capitalize",
                        fontWeight: "400",
                        pl: 0.5
                      }}
                    >
                      {props?.event?.location}
                    </MDBTypography>

                  </MDBox>
                }
                {
                  ((props?.event?.phoneAttendees?.length > 0) || (props?.event?.attendees?.length > 0)) &&
                  <MDBox
                    sx={{
                      pt: 0.25
                    }}
                  >
                    <MDBox
                      sx={{
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <LocalPhoneIcon style={{ fill: "#fff", width: "18px", height: "18px" }}></LocalPhoneIcon>
                      <MDBTypography
                        fontWeight="regular"
                        fontSize="xs"
                        sx={{
                          pl: 0.5
                        }}
                      >
                        {props?.event?.phoneAttendees?.join(", ")}
                      </MDBTypography>
                    </MDBox>
                    <MDBox
                      sx={{
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <EmailIcon style={{ fill: "#fff", width: "18px", height: "18px" }}></EmailIcon>
                      <MDBTypography
                        fontWeight="regular"
                        fontSize="xxs"
                        sx={{
                          pl: 0.5
                        }}
                      >
                        {
                          props?.event?.attendees?.map((attendee, idx) => {
                            return (
                              (attendee?.email) ?
                                (idx === 0 ? attendee.email : (", " + attendee.email)) :
                                ""
                            )
                          })
                        }
                      </MDBTypography>
                    </MDBox>
                  </MDBox>
                }

              </Grid>
        </>
    )
}