// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Menu from "@mui/material/Menu";

// Material Dashboard  React components
import MDBox from "components/MDBox";

// Material Dashboard  React example components
import DefaultNavbarLinkNew from "appcomponents/NavbarsNew/DefaultNavbarNew/DefaultNavbarLinkNew";

function DefaultNavbarMobileNew({ open, close }) {
  const { width } = open && open.getBoundingClientRect();

  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      anchorEl={open}
      open={Boolean(open)}
      onClose={close}
      MenuListProps={{ style: { width: `calc(${width}px - 4rem)` } }}
    >
      <MDBox px={0.5}>
        <DefaultNavbarLinkNew icon="donut_large" name="dashboard" route="/dashboard" />
        <DefaultNavbarLinkNew icon="person" name="profile" route="/profile" />
        <DefaultNavbarLinkNew icon="account_circle" name="sign up" route="/authentication/sign-up" />
        <DefaultNavbarLinkNew icon="key" name="sign in" route="/authentication/sign-in" />
      </MDBox>
    </Menu>
  );
}

// Typechecking props for the DefaultNavbarMenu
DefaultNavbarMobileNew.propTypes = {
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  close: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object]).isRequired,
};

export default DefaultNavbarMobileNew;