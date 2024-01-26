import { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import MDBInput from "./MDBInput";
import { InputLabel } from "@mui/material";
import MDBButton from "./MDBButton";
import MDBTypography from "./MDBTypography";
import MDBox from "./MDBox";
import Group396 from "assets/images/icons/Group396.png";

const ImageUpload = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const imageMimeType = /image\/(png|jpg|jpeg|svg)/i;

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      setErrorMessage("Image  type is not valid ");
      setSelectedImage(null);
      return;
    } else {
      setErrorMessage("");
      setSelectedImage(file);
    }
  };
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
    if (props.imageChangeHandler !== undefined) {
      props.imageChangeHandler(selectedImage);
    }
  }, [selectedImage]);

  //Remove profile Image event handler
  const removeProfileImage = (e) => {
    e.preventDefault();
    setImageUrl("");
    setSelectedImage(null);
  };

  return (
    <MDBox sx={{ display: "flex" }}>
      <MDBInput
        accept=".png, .jpg, .jpeg"
        type="file"
        id="select-image"
        style={{ display: "none" }}
        onClick={(e)=>e.target.value=""}
        onChange={changeHandler}
      />
      <Box>
        <MDBTypography
          component="img"
          sx={{ height: 75, width: 75, borderRadius: "100%" }}
          src={imageUrl === "" ? Group396 : imageUrl}
          alt={selectedImage?.name}
          mr={3}
        />
      </Box>
      <InputLabel htmlFor="select-image" sx={{ alignSelf: "center" }}>
        <MDBButton
          variant="contained"
          color="black"
          bgColor="light_green"
          component="span"
          fontWeight="medium"
          fontSize="md"
          borderSize="md"
          sx={{ alignSelf: "center", px: 2 }}
        >
          <MDBTypography component="img" src={props.Icon} pr={1} />
          {props.ButtonText}
        </MDBButton>

        {imageUrl !== "" && (
          <MDBButton
            size="medium"
            variant="outlined"
            color=""
            bgColor="white"
            fontWeight="medium"
            fontSize="md"
            borderSize="md"
            sx={{ alignSelf: "center", py: "7px", px: 1, ml: 1 }}
            onClick={(e) => removeProfileImage(e)}
          >
            Remove
          </MDBButton>
        )}
        <MDBox py={1}>
          {errorMessage ? (
            <p style={{ color: "#d50000", fontSize: 12, fontWeight: "14" }}>
              {errorMessage}
            </p>
          ) : (
            <></>
          )}
        </MDBox>
      </InputLabel>
    </MDBox>
  );
};

export default ImageUpload;
