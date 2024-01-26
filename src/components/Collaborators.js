import { Grid, InputLabel, Popover } from "@mui/material";
import React, { useEffect, useState } from "react";
import MDBButton from "./MDBButton";
import MDBInput from "./MDBInput";
import MDBTypography from "./MDBTypography";
import PopoverCard from "./PopoverCard";
import Inbox from "assets/images/icons/svg/medium/Inbox1818.svg";
import Delete from 'assets/images/icons/svg/medium/DeleteIcon1818.svg'
import httpService from "service/HttpService";
import { useWidth } from "./Hooks/UseWidth";
import MDBox from "./MDBox";

export default function Collaborators(props) {
  const breakpoint = useWidth()[0]
  const [isInvite, setIsInvite] = useState(false);
  const [userInviteMail, setUserInviteMail] = useState("");
  const [emails, setEmails] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    if (props.user?.clientId) {
      getUserCollaborators();
    }
  }, [props?.user]);

  const getUserCollaborators = () => {
    httpService
      .getUserCollaborators(props.user?.clientId)
      .then((res) => {
        if (
          res !== undefined &&
          res?.data !== null &&
          res?.data?.success !== undefined &&
          res?.data?.success === true
        ) {
          // Save user invite emails
          setCollaborators(res?.data.data);
          // Check user type
          if (props.user?.type == "Brand") {
            setUserInviteMail("");
            setIsInvite(false);
          } else if (res?.data.data.length > 0) {
            setIsInvite(true);
          } else {
            setIsInvite(false);
          }
        }
      })
      .catch((error) => {
        setIsInvite(false);
      });
  };
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  //Sent Invitation
  const sentInvitation = (e) => {
    e?.preventDefault();
    setErrorMessage("");
    // Check valid email or not
    if (userInviteMail !== "" && (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userInviteMail))) {
      // Check email is registered email
      if (userInviteMail === props?.user?.email) {
        setIsInvite(false);
        setErrorMessage(
          "Coflict with register mail. Please provide valid email"
        );
      } else {
        setIsInvite(true);
        // Sent invite callback
        let req = {
          email: userInviteMail,
          userId: props.user?.userId ? props.user.userId : props.user.id,
          clientId: props.user?.clientId,
        };
        sentInviteCallback(req);
      }
    } else {
      setIsInvite(false);
      setErrorMessage("Please provide valid email");
    }
  };

  //Sent invite callback
  const sentInviteCallback = (req) => {
    httpService
      .inviteCollaborator(req)
      .then((res) => {
        if (
          res !== undefined &&
          res?.data !== null &&
          res?.data?.success !== undefined &&
          res?.data?.success === true
        ) {
          // Save user invite emails
          setCollaborators(res?.data.data);
          // Check user type
          if (props.user?.type == "Brand") {
            setUserInviteMail("");
            setIsInvite(false);
          } else if (res?.data.data.length > 0) {
            setIsInvite(true);
          } else {
            setIsInvite(false);
          }
        }
      })
      .catch((error) => {
        setIsInvite(false);
        setErrorMessage("Invitation failed. Please try again");
      });
  };

  //Remove Invitation
  const removeInvitation = (e, id) => {
    e.preventDefault();
    let req = {
      id: id,
      userId: props.user?.userId ? props.user.userId : props.user.id,
      clientId: props.user?.clientId,
    };
    httpService
      .removeCollaborator(req)
      .then((res) => {
        if (
          res !== undefined &&
          res?.data !== null &&
          res?.data?.success !== undefined &&
          res?.data?.success === true
        ) {
          // Save user invite emails
          setCollaborators(res?.data.data);
          // Check user type
          if (props.user?.type == "Brand") {
            setUserInviteMail("");
            setIsInvite(false);
          } else if (res?.data.data.length > 0) {
            setIsInvite(true);
          } else {
            setIsInvite(false);
          }
        }
      })
      .catch((error) => {
        setIsInvite(false);
      });
  };

  //OnChange Invitation Mail
  const onChangeInvitationMail = (e) => {
    setUserInviteMail(e.target.value);
  };

  return (
    <div>
      {/* Collaborators Invitation*/}
      <MDBTypography
        color="white"
        fontWeight="medium"
        fontSize="md"
        lineHeightSize="2xl"
      >
        Collaborators
      </MDBTypography>
      <MDBTypography
        color="grayScale"
        fontWeight="regular"
        fontSize="sm"
        lineHeightSize="xxl"
        mb={1}
      >
        Invite a collaborator to help manage your account.
      </MDBTypography>
      <Grid
        component="form"
        // sx={{
        //   "& .MuiOutlinedInput-root": { 
        //     width: {breakpoint === "xs" || breakpoint === "sm" ? "" : }
        //   },
        // }}
        Validate
        autoComplete="off"
      >
        <Grid container>
          <InputLabel>
            <MDBTypography
              color="white"
              fontWeight="regular"
              fontSize="xs"
              lineHeightSize="md"
              textTransform="uppercase"
              pb={1}
            >
              Email
            </MDBTypography>
          </InputLabel>
        </Grid>
        <Grid container mb={2}>
          <Grid item pr={1} pb={1} xs={12} md={8.5}>
            {/* Collaborators Input Field */}
            <MDBInput
              type="text"
              placeholder="james@management.com"
              value={userInviteMail}
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              onChange={(e) => onChangeInvitationMail(e)}
            />
          </Grid>

          {/* Popover for Creator to add on collaborator Only */}

          {isInvite === true && props.user?.type === "Creator" && (
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "left",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              {/* Popover card with message */}
              <PopoverCard />
            </Popover>
          )}
          <Grid item xs={12} md={3.5}  textAlign="right">
            <MDBButton
              size="small"
              variant="contained"
              color="black"
              bgColor="light_green"
              fontWeight="medium"
              fontSize="md"
              borderSize="md"
              sx={{ py: 1.4 }}
              onClick={(e) => sentInvitation(e)}
              disabled={isInvite === true ? true : false}
            >
              Send Invite
            </MDBButton>
          </Grid>
          {
            errorMessage!=="" &&
            <Grid item container>
              <MDBox style={{ color: "#d50000", fontSize: 12, fontWeight: "14" }}>
                {errorMessage}
              </MDBox>
            </Grid>
          } 
        </Grid>
        {collaborators?.map((collaborator, idx) => (
          <Grid sx={{ display: "flex", justifyContent: "space-between" }} key={idx}>
            {/* When Creator Sent Invite to Collaborator */}
            <Grid sx={{ display: "flex" }}>
              <MDBTypography
                component="img"
                height="18px"
                src={Inbox}
                px={0.8}
                mt={0.3}
                mb={1}
              />
              <MDBTypography
                color="white"
                fontWeight="regular"
                fontSize="md"
                lineHeightSize="2xl"
                pr={0.5}
              >
                {collaborator.email}
              </MDBTypography>
              <MDBTypography
                color="light_green"
                fontWeight="regular"
                fontSize="md"
                lineHeightSize="2xl"
              >
                Invite Sent!
              </MDBTypography>
            </Grid>
            <MDBTypography
              component="img"
              height="18px"
              src={Delete}
              sx={{ cursor: "pointer" }}
              onClick={(e) => removeInvitation(e, collaborator.id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
