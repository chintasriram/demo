import React, { useEffect, useState } from 'react'
import { Grid, Modal, Slider } from '@mui/material'
import AvatarEditor from 'react-avatar-editor';
import MDBTypography from './MDBTypography';
import MDBCard from './MDBCard';
import MDBButton from './MDBButton';

export default function ImageCrop(props) {
  var editor = "";
  const [selectedImgFile, setSelectedImgFile] = useState(null)
  const noImg = "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png";
  const [picture, setPicture] = useState({
    cropperOpen: false,
    img: null,
    zoom: 1,
    croppedImg: noImg,
    selectedImage: "",
  });

  useEffect(() => {
    if (props.selectedFile && props.selectedFile !== "") {
      setPicture({
        ...picture,
        img: props.selectedFile,
        zoom: 1,
        cropperOpen: props.isShow,
      });
    }
  }, [props.isShow])

  const setEditorRef = (ed) => {
    editor = ed;
  };

  // Handle slider
  const handleSlider = (event, value) => {
    setPicture({
      ...picture,
      zoom: value,
      selectedImage: "",
    });
  };

  // Handle submit
  const handleSubmit = () => {
    if (setEditorRef) {
      const canvasScaled = editor.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();
      fetch(croppedImg)
        .then((res) => res.blob())
        .then((blob) => {
          //TODO: need to get file name from selected file
          blob["name"] = "sample.png"
          setSelectedImgFile(blob)
        });
    }
  }

  useEffect(() => {
    if (selectedImgFile !== null) {
      props.submitCallback(selectedImgFile)
      setPicture({
        ...picture,
        cropperOpen: false
      });
    }
  }, [selectedImgFile])

  // Handle cancel
  const handleCancel = () => {
    setPicture({
      ...picture,
      cropperOpen: false
    });
    props?.cancelCallback()
  }

  return (
    <Grid>
      <Modal
        open={picture?.cropperOpen}
        //  onClose={handleClose}
        style={{ overflow: "scroll" }}
      >
        <Grid container justifyContent="center" alignContent="center" style={{height: "100%"}}>
          <MDBCard sx={{ m: 3, width: props?.id === "profileimgcrop" ? "fit-content" : "inherit" }}>
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
              style={{ width: props?.id === "profileimgcrop" ? "375px" : "100%", height: props?.id === "profileimgcrop" ? "500px" : "auto" }}
              width={props?.id === "profileimgcrop" ? 375 : 1512}
              height={props?.id === "profileimgcrop" ? 500 : 480}
              border={0}
              color={[255, 255, 255, 0.6]}
              rotate={0}
              scale={picture.zoom}
            />
            <Slider
              aria-label="raceSlider"
              value={picture.zoom}
              // min={0}
              // max={10}
              min={1}
              max={2}
              step={0.01}
              onChange={handleSlider}
            />  
              <MDBTypography
              fontWeight="regular"
              fontSize="sm"
              lineHeight="xl"
              color="light_green"
              mb={1}
             >{props.note}
            </MDBTypography>
              
              

            <Grid
              container
              direction="row"
               justifyContent="flex-end"
               alignItems="center"
              sx={{ mb: 3 }}
            >
              
              
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
                  onClick={handleSubmit}
                >
                  Submit
                </MDBButton>
              </Grid>
            </Grid>
          </MDBCard>
        </Grid>
      </Modal>
    </Grid>
  )
}
