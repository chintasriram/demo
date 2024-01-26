import MDBCard from "components/MDBCard";
import MediakitEdit from "assets/images/MediakitEdit.png";
import React from "react";
import MDBTypography from "components/MDBTypography";
import MDBButton from "components/MDBButton";
import { useNavigate } from "react-router-dom";
import httpService from "service/HttpService";
import { Grid } from "@mui/material";
import { useWidth } from "components/Hooks/UseWidth";

export default function MediaKitCard(props) {
  const breakpoint = useWidth()[0]
  let history = useNavigate();

  // Redirect to Edit mediakit
  const redirectToEditMediakit = (e) => {
    e?.preventDefault();
    history("/c/media-kit/edit", { state: { mediakitId: props?.data?.id } });
  };

  // Redirect to Preview mediakit
  const redirectToPreviewMediakit = (e) => {
    e?.preventDefault();
    history("/c/media-kit/preview", { state: { mediakitId: props?.data?.id } });
  };

  //Slicing user name at first word
  const nameSlice = (name) => {
    let userName = name.split(' ')[0]
    return userName;
  }


  return (
    <div>
      {/* TODO : To Change Searchbar */}
      <MDBCard sx={{
        p: 0, ml: breakpoint === "sm" || breakpoint === "xs" ? 4 : 8,
        my: breakpoint === "sm" || breakpoint === "xs" ? 4 : 8,
        width: "inherit"
      }}
      >
        <MDBTypography
          width="300px"
          height="300px"
          component="img"
          src={
            props?.data?.imageUrl
              ? httpService.getMediaBaseUrl(props?.data?.imageUrl)
              : MediakitEdit
          }
          style={{objectFit:"cover"}}
          sx={{ borderRadius: "12px 12px 0 0" }}
        />

        <Grid sx={{ ml: 3, mt: 2, mb: 3, pr: 3 }}>
          <MDBTypography
            fontWeight="md"
            fontSize="2xl"
            lineHeight="4xl"
            textTransform="capitalize"
            sx={{ mb: 1.5 }}
          >
            {nameSlice(props?.userName)}&#39;s Media Kit
          </MDBTypography>
          <MDBButton
            type="button"
            onClick={(e) => redirectToEditMediakit(e)}
            variant="contained"
            size="small"
            bgColor="light_green"
            color="biaAssist"
            fontSize="md"
            fontWeight="bold"
            borderSize="lg"
            sx={{ px: 3, py: 1.6, mr: 2 }}
          >
            Edit
          </MDBButton>
          <MDBButton
            onClick={(e) => redirectToPreviewMediakit(e)}
            variant="outlined"
            size="large"
            bgColor="black"
            color=""
            fontSize="md"
            fontWeight="bold"
            borderSize="lg"
            sx={{ px: 3, py: 1.3 }}
          >
            Preview
          </MDBButton>
        </Grid>
      </MDBCard>
    </div>
  );
}
