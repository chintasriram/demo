import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import CallMade from "@mui/icons-material/CallMade";
import Stack from "@mui/material/Stack";
import BaseLayout from "layouts/baseLayout";
import { Grid } from "@mui/material";
// react-router components
import { Link } from "react-router-dom";

function HomePage({}) {
  return (
    <BaseLayout>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <MDBox textAlign="left" maxWidth="30%">
          <MDTypography
            color="white"
            fontWeight="bold"
            textTransform="uppercase"
            verticalAlign="middle"
            variant="h4"
            opacity={1}
          >
            INDEPENDENTLY MANAGE YOUR CREATOR PARTNERSHIPS ANYTIME, ANYWHERE
          </MDTypography>
          <MDTypography
            color="white"
            fontWeight="bold"
            verticalAlign="middle"
            variant="body2"
            fontSize="14px"
            pt={2}
            opacity={1}
          >
            Bia is the one-stop-shop for creators and brands to independently
            execute their own partnerships
          </MDTypography>
          <MDTypography
            color="white"
            fontWeight="bold"
            verticalAlign="middle"
            variant="body2"
            fontSize="14px"
            pt={2}
            opacity={1}
          >
            Discover new opportunities, leverage easily digestable analytics,
            execute automated contracts, and more - one platform to do it all
          </MDTypography>
        </MDBox>
        <Stack spacing={2} py={4} direction="row" justifyContent="start">
          <MDBox component={Link} to="/register">
            <MDButton
              variant="outlined"
              color="info"
              sx={{ mt: -0.3, borderRadius: "100px 100px " }}
              endIcon={<CallMade />}
            >
              I AM A CREATOR
            </MDButton>
          </MDBox>
          <MDBox component={Link} to="/register">
            <MDButton
              variant="outlined"
              color="info"
              sx={{ mt: -0.3, borderRadius: "100px 100px " }}
              endIcon={<CallMade />}
            >
              I AM A BUSINESS
            </MDButton>
          </MDBox>
        </Stack>
        <MDBox>
          <MDButton
            variant="outlined"
            color="info"
            sx={{ mt: -0.3, borderRadius: "100px 100px " }}
            endIcon={<CallMade />}
          >
            I AM AN AGENT
          </MDButton>
        </MDBox>
      </Grid>
    </BaseLayout>
  );
}
export default HomePage;
