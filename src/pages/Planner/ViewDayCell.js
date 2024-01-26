import React, { useState } from "react";
import { Divider, Grid, Modal } from "@mui/material";
import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
import MDTypography from "components/MDTypography";
import { Link } from "react-router-dom";
import TaskRow from "./TaskRow";

export default function ViewDayCell(props) {
  const currentMonth = new Date()?.toLocaleString("default", { month: "long" });
  const [open, setOpen] = useState(false);
  const [modalTop, setModalTop] = useState();
  const [modalLeft, setModalLeft] = useState();

  const handleOpen = (e) => {
    setModalLeft(e.clientX); // get the mouse position relative to the element
    if (document.body.scrollHeight - e.pageY < 100) {
      setModalTop(e.clientY - 224);
    } else {
      setModalTop(e.clientY);
    }

    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const bgColor = props?.data?.isSelected ? "rgba(53, 61, 61, 1)" : "";
  const bgDividerColor = props?.data?.isSelected ? "#BBDCD2" : "";

  return (
    <Grid>
      {/* Day Cell Conatiner */}
      <Grid component={Link} to="/c/planning">
        <Grid
          sx={{
            backgroundColor: bgColor,
            mb: 2,
            pb: 1,
            minHeight: "200px"
          }}
          width="inherit"
        >
          {/* Divider */}
          <Divider
            sx={{
              backgroundColor: bgDividerColor,
              mt: 0,
              mb: 2,
              height: "4px",
            }}
          />

          {/* Date & Day container */}
          <Grid sx={{ pr: 1 }} textAlign="right">
            <Grid item>
              <MDBTypography
                fontWeight="regular"
                fontSize="sm"
                lineHeight="lg"
                sx={{
                  opacity: currentMonth === props?.data?.month ? "100%" : "50%",
                }}
              >
                {props?.data?.day}
              </MDBTypography>
            </Grid>
            <Grid item>
              <MDBTypography
                fontWeight="medium"
                fontSize="xl"
                lineHeight="2xxl"
                sx={{
                  opacity: currentMonth === props?.data?.month ? "100%" : "50%",
                }}
              >
                {props?.data?.date}
              </MDBTypography>
            </Grid>
          </Grid>

          {/* Tasks */}
          {props?.data?.events?.map(
            (e, idx) => idx < 2 && <TaskRow event={e} />
          )}

          {/* tasks condition if more than 2 */}
          {props?.data?.events.length > 2 && (
            <Grid sx={{ mx: "6px" }}>
              <MDTypography
                fontWeight="regular"
                fontSize="xs"
                lineHeight="lg"
                // onClick ={handleOpen}

                sx={{ cursor: "pointer", display: "inline" }}
              >
                +{props?.data?.events.length - 2} More
              </MDTypography>
            </Grid>
          )}
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            ml: `${modalLeft}px`,
            mt: `${modalTop}px`,
          }}
        >
          <MDBCard>
            {props?.data?.day},{props?.data?.date}
            {props?.data?.events?.map((e, idx) => (
              <TaskRow event={e} />
            ))}
          </MDBCard>
        </Modal>
      </Grid>
    </Grid>
  );
}