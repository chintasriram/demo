import MDBox from "components/MDBox";
import MDBImage from "components/MDBImage";
import homeImg from "assets/images/InfluencerHomeLayer.svg";
import propsalImg from "assets/images/appimages/ProposalAccepted.svg";
import profileImg from "assets/images/appimages/Profile.svg";

export default function LandImages() {
  return (
    <div>
      <MDBox
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <MDBImage src={homeImg} />
        <MDBox
          component="img"
          src={propsalImg}
          sx={{
            position: "absolute",
            top: 0,
            transform: "translateY(-8%)",
            right: "-18%",
            zIndex: 2,
            width: "35%",
            height: "auto"
          }}

        />
        <MDBox
          component="img"
          src={profileImg}
          sx={{
            position: "absolute",
            bottom: "23%",
            right: "-2vw",
            left: "-2%",
            zIndex: 2,
            width: "15%",
            height: "auto"

          }}
        />
      </MDBox>
    </div>
  )

}