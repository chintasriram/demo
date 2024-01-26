import { Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MDBCard from "../../../components/MDBCard";
import MDBTypography from "../../../components/MDBTypography";
import Comment from "assets/images/icons/svg/medium/Comment1616.svg";
import ProposalService from "service/ProposalService";
import ActiveLayer from 'assets/images/ImagesSvg/proposalItem.png'


function InboundProposals(props) {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    ProposalService.getAllIncomingProposals(getProposalsCallback);
  }, []);

  const getProposalsCallback = (res) => {
    if (res) {
      setProposals(res);
    }
  };

  //Get initial letter
  const getInitialLetter = (name) => {
    var names = name?.split(" ");
    if (names?.length > 0) {
      let initials = names[0].substring(0, 1).toUpperCase();
      return initials;
    }
    return "";
  };

  return (
    <MDBCard
      sx={{
        p: 0,
        mx: 0,
        my: props?.isHome === true ? 0 : 3.5,
        width: "inherit",
        maxHeight: props?.isHome === true ? "" : "500px",
        overflowY: props?.isHome === true ? "" : "auto",
      }}
      borderRadius="xl"
      isBorder={props?.isHome === true ? false : true}
      bgcolor="cardBg"
    >
      {proposals?.map((item, idx) => (
        <Grid>
          <Grid p={3} key={idx}>
            <Grid container>
              <Grid item pr={2} pb={1} xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} xxl={1.5} xel={1.5} xxel={1.5} el={1.5}>
                <MDBTypography
                  color="white"
                  fontWeight="medium"
                  fontSize="md"
                  lineHeightSize="2xl"
                  sx={{
                    borderRadius: "48px",
                    border: "1px solid #D2D2D3",
                    width: "48px",
                    height: "48px",
                    pl: 2.2,
                    pt: 1.5,
                  }}
                >
                  {getInitialLetter(item.senderName)}
                </MDBTypography>
              </Grid>
              <Grid item sx={{ width: "inherit" }} xs={12} sm={12} md={10.5} lg={10.5} xl={10.5} xxl={10.5} xel={10.5} xxel={10.5} el={10.5}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <MDBTypography
                      color="white"
                      fontWeight="medium"
                      fontSize="xl"
                      lineHeightSize="2xxl"
                    >
                      {item?.senderName}
                    </MDBTypography>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid item>
                        <Grid container>
                          <MDBTypography
                            component="img"
                            src={Comment}
                            mr={1}
                            mt={0.5}
                          />
                          <MDBTypography
                            color="white"
                            fontWeight="medium"
                            fontSize="sm"
                            lineHeightSize="xxl"
                          >
                            Message
                          </MDBTypography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <MDBTypography
                          color="grayScale"
                          fontWeight="regular"
                          fontSize="sm"
                          lineHeightSize="xxl"
                          pl={2}
                        >
                          Pending
                        </MDBTypography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <a href={"mailto:" + item?.senderEmail}>
                    <MDBTypography
                      color="white"
                      fontWeight="regular"
                      fontSize="sm"
                      lineHeightSize="xxl"
                    >
                      {item?.senderEmail}
                    </MDBTypography>
                  </a>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <MDBCard
                      sx={{ p: 0, m: 0, p: 1, mt: 1, width: "inherit" }}
                      borderRadius="md"
                      bgcolor="transparent"
                    >
                      <Grid>
                        <MDBTypography
                          color="grayScale"
                          fontWeight="regular"
                          fontSize="sm"
                          lineHeightSize="xxl"
                        >
                          {item?.content}
                        </MDBTypography>
                      </Grid>
                      {/* <Grid>
                        <MDBTypography
                          color="white"
                          fontWeight="bold"
                          fontSize="sm"
                          lineHeightSize="xxl"
                          pt={1}
                          sx={{ cursor: "pointer", opacity: 0.3 }}
                        >
                          Reply
                        </MDBTypography>
                      </Grid> */}
                    </MDBCard>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {idx < proposals?.length - 1 && <Divider sx={{ mt: 0, mb: 3 }} />}
        </Grid>
      ))}

      {proposals?.length > 0 !== true && (
        // <Grid 
        //   container justifyContent="center" alignContent="center" 
        //   sx={{height: "380px", borderRadius: "0 0 12px 12px", 
        //   border: props?.isHome === true ? "none" : "1px solid #3B3D40", background: `url(${ActiveLayer})`, backgroundSize:"cover", backdropFilter: "blur(4px)"}}
        // >
        //   <Grid item>
        //     <MDBTypography
        //       color= "grayScale"
        //       fontWeight= "medium"
        //       fontSize= "md"
        //       lineHeightSize= "xxl" 
        //       px={3}
        //       textAlign="center"
        //     >
        //       No inbound proposals received yet, share your media kit so people can contact you!
        //     </MDBTypography>
        //   </Grid>
        // </Grid>
        <Grid container
          sx={{
            height: "380px",
            borderRadius: "12px", background: `url(${ActiveLayer})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"
          }}
        >
          <Grid container justifyContent="center" alignContent="center"
            sx={{
              background: `rgba(17, 19, 21, 0.8)`, width: "inherit", backdropFilter: "blur(4px)", borderRadius: props?.isHome === true ? "0 0 12px 12px" : "12px", border: props?.isHome === true ? "none" : ""
            }}
          >
            <MDBTypography
              color="grayScale"
              fontWeight="medium"
              fontSize="md"
              lineHeightSize="xxl"
              px={3}
              textAlign="center"
            >
              No inbound proposals received yet, share your Media Kit so people can contact you.
            </MDBTypography>
          </Grid>
        </Grid>
      )}
    </MDBCard>
  );
}

export default InboundProposals;
