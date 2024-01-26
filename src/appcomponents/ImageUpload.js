import { Box, Slider } from "@material-ui/core";
import MDBButton from "components/MDBButton";
import MDBTypography from "components/MDBTypography";
import AvatarEditor from "react-avatar-editor";
import Modal from "@mui/material/Modal";
import MDBCard from "components/MDBCard";
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import httpService from "service/HttpService";
import "./ImageUpload.css";

const App = (props) => {
  const [imageUrl, setImageUrl] = useState(props.imageUrl !== undefined ? props.imageUrl : "")
  var editor = "";
  const noImg =
    "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png";
  const [picture, setPicture] = useState({
    cropperOpen: false,
    img: null,
    zoom: 2,
    croppedImg: noImg,
    selectedImage: "",
  });

  const handleSlider = (event, value) => {
    setPicture({
      ...picture,
      zoom: value,
      selectedImage: "",
    });
  };

  const handleCancel = () => {
    setPicture({
      ...picture,
      cropperOpen: false,
      selectedImage: "",
    });
  };

  const setEditorRef = (ed) => {
    editor = ed;
  };
  const handleSave = (e) => {
    if (setEditorRef) {
      const canvasScaled = editor.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();
      fetch(croppedImg)
        .then((res) => res.blob())
        .then((blob) => {
          setPicture({
            // ...picture,
            img: null,
            cropperOpen: false,
            croppedImg: croppedImg,
            file: blob,
            selectedImage: "",
          });
        });
    }
  };
  const handleFileChange = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setImageUrl(url)
    setPicture({
      ...picture,
      img: url,
      cropperOpen: true,
      selectedImage: "",
    });
  };
  const handleRemove = () => {
    setPicture({
      // ...picture,
      selectedImage: "",
      croppedImg: noImg,
    });
    if (picture.selectedImage && picture.selectedImage !== "") {
      httpService.removeImage(picture.selectedImage).then((res) => {
        if (props.imageChangeHandler !== undefined) {
          props.imageChangeHandler(res.data.data);
        }
      });
    }
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (picture.file && picture.file !== "") {
      const formData = new FormData();
      formData.append("file", picture.file);
      formData.append("userId", props.userId);
      formData.append("name", "sample.png");
      httpService.uploadImage(formData).then((res) => {
        if (props.imageChangeHandler !== undefined) {
          props.imageChangeHandler(res.data.data);
          // setImageUrl(res.data.data);
        }
        // setImageSrc(URL.createObjectURL(picture.croppedImg));
      });
    }
  }, [picture.file]);

  useEffect(() => {
    setPicture({
      // ...picture,
      img: null,
      cropperOpen: false,
      croppedImg: httpService.getMediaBaseUrl(props.imageUrl),
      file: "",
      selectedImage: props.imageUrl,
    });
  }, [props.imageUrl]);
  const removeProfileImage = (e) => {
    e?.preventDefault();
    setPicture.croppedImg("");
    // setImageSrc("");
    // setSelectedImage(null)
    httpService.removeImage(picture.croppedImg);
    // .then(res => {
    //       if(props.imageChangeHandler !== undefined){
    //         props.imageChangeHandler(res.data.data);
    //       }
    // })
  };

  return (
    <div>
      <Box display="flex">
        <Grid container alignContent="center">
          <Grid mr={2}>
            {/* <Box > */}
            <MDBTypography
              component="img"
              src={picture.croppedImg}
              alt={picture.croppedImg?.name}
              sx={{ height: 75, width: 75, borderRadius: "100%" }}
            />
          </Grid>

          <Grid mr={1.5} alignSelf="center" mb={1}>
            <label for="edit">

              <MDBButton
                size="medium"
                variant="contained"
                color="black"
                bgColor="light_green"
                component="span"
                fontWeight="bold"
                fontSize="md"
                borderSize="md"
                sx={{ alignSelf: "center" }}
              >
                <MDBTypography
                  component="img"
                  src={props.Icon}
                  pr={1}
                />
                {/* {
              (picture.selectedImage && picture.selectedImage!=="")?"Edit profile Image":"Add Profile Image"
            } */}
                {props.ButtonText}
                <input
                  type="file"
                  accept="image/*"
                  onClick={(e)=>e.target.value=""}
                  onChange={handleFileChange}
                  id="edit"
                />
              </MDBButton>
            </label>

          </Grid>
          {/* {(picture.selectedImage && picture.selectedImage!=="") &&  */}
          {
            (imageUrl !== "") &&
            <MDBButton
              variant="outlined"
              color="white"
              bgColor="transparent"
              fontWeight="bold"
              fontSize="md"
              borderSize="md"
              onClick={handleRemove}
              sx={{ alignSelf: "center" }}
            >
              Remove
            </MDBButton>
          }
          {picture.cropperOpen && (
            <Grid display="">
              <Modal
                open={setOpen}
                //  onClose={handleClose}
                style={{ overflow: "scroll" }}
              >
                <Grid container justifyContent="center" alignContent="center" style={{ height: "100%" }}>
                  <Grid item xs={1} sm={1} md={1.5} lg={2.5} xl={2.5} xxl={3.5} xel={3.86} xxel={4.6} el={4.6} />
                  <Grid item xs={10} sm={10} md={8.5} lg={6.5} xl={6.5} xxl={4.7} xel={3.5} xxel={2.55} el={2.55}>
                    <MDBCard sx={{ m: 0 }}>
                      <MDBTypography
                        fontWeight="medium"
                        fontSize="xl"
                        lineHeight="2xxl"
                      >
                        Edit Image
                      </MDBTypography>

                      <AvatarEditor
                        ref={setEditorRef}
                        image={picture.img}
                        allowZoomOut={true}
                        width={400}
                        height={400}
                        border={0}
                        color={[255, 255, 255, 0.6]} // RGBA
                        rotate={0}
                        scale={picture.zoom}
                      />
                      <Slider
                        aria-label="raceSlider"
                        value={picture.zoom}
                        min={0}
                        max={10}
                        step={0.1}
                        onChange={handleSlider}
                      />

                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{ mb: 3, width: "400px" }}
                      >
                        <Grid item>
                          <MDBTypography
                            fontWeight="regular"
                            fontSize="sm"
                            lineHeight="xl"
                            color="light_green"
                          >
                            Note : Allowed image formats are JPG, PNG and Upload an image, 400px by 400px for the best results.
                          </MDBTypography>
                        </Grid>
                        <Grid item>

                          <MDBButton
                            variant="text"
                            size="small"
                            bgColor="black"
                            color="white"
                            fontSize="md"
                            fontWeight="medium"
                            borderSize="md"
                            sx={{ px: 3, py: 1.5, mr: 1 }}
                            onClick={handleCancel}
                          >
                            Cancel
                          </MDBButton>
                          <MDBButton
                            variant="contained"
                            size="small"
                            bgColor="light_green"
                            color="biaAssist"
                            fontSize="md"
                            fontWeight="bold"
                            borderSize="md"
                            sx={{ px: 3, py: 1.5 }}
                            type="submit"
                            onClick={handleSave}
                          >
                            Submit
                          </MDBButton>
                        </Grid>
                      </Grid>
                    </MDBCard>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1.5} lg={2.5} xl={2.5} xxl={3.5} xel={3.86} xxel={4.6} el={4.6} />
                </Grid>
              </Modal>
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
};
export default App;
