import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import BaseLayout from "layouts/authentication/components/BaseLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import CreaterHomepage from "pages/homepage/createrHomepage"

function HomeLayout() {
  return (
    <MDBox>
      <CreaterHomepage/>
    </MDBox>
  );
}

export default HomeLayout;