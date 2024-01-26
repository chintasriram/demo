//  installed npm (npm install --save react-dropzone)
import MDBCard from 'components/MDBCard';
import MDBTypography from 'components/MDBTypography';
import {useDropzone} from 'react-dropzone';
import Image from 'assets/images/icons/svg/medium/GalleryIcon.svg';
import { Grid } from '@mui/material';
import React, {useEffect, useState} from 'react'; 
import imageUploadService from "service/ImageUploadService";
import httpService from "service/HttpService";


const thumb = {
  display: 'inline-flex',
  marginRight: 4,
  width: 50,
  height: 50,
  padding: 2,
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  // overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};
function DragandDrop(props) {
  const [files, setFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState(props.imageUrl);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    }, 
    onDrop: acceptedFiles => {  
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      acceptedFiles.map(file => {
        imageUploadService.upload(file, props.userId, "mediakit", imageUploadCallBack);
      });
    }
  });
  const imageUploadCallBack = (imageUrl) => {
    if (props.imageChangeHandler !== undefined) {
      props.imageChangeHandler(imageUrl);
    }
    setImageUrl(imageUrl);
  }
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);
  useEffect(() => {
    setImageUrl(props.imageUrl);
  }, [props.imageUrl]);

  useEffect(() => {
    if (props?.profileImage !== undefined && props?.profileImage !== "") {
      setImageUrl(props.profileImage);
    }
  }, [props?.profileImage]);

  return (
    <MDBCard sx={{ border: "1px dashed #3B3D40", width: "inherit", my: 2, mx: 5 }}>
      <Grid {...getRootProps()} >
        <input {...getInputProps()} />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            component="img"
            src={Image}
          />
          <MDBTypography
            fontWeight="medium"
            fontSize="md"
            color="white"
            lineHeight="2xl"
            sx={{ mt: 2 }}
          >
            Drag your media here
          </MDBTypography>
          <MDBTypography
            fontWeight="regular"
            fontSize="md"
            color="grayScale"
            lineHeight="2xl"
          >
            or click to browse for media
          </MDBTypography>
        </Grid>
      </Grid>
      <Grid sx={{ m: 1, fontSize: 16, color: "#FFF" }}>
        {imageUrl && (
          <div style={thumb} >
            <div style={thumbInner}>
              <img
                src={httpService.getMediaBaseUrl(imageUrl)}
                style={img}
              />
            </div>
          </div>
        )}
      </Grid>
    </MDBCard>

  );
}
export default DragandDrop