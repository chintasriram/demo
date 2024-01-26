// @mui material components
import { createTheme } from "@mui/material/styles";
// import Fade from "@mui/material/Fade";

// Material Dashboard  React base styles
import colors from "assets/bia-theme/base/colors";
import breakpoints from "assets/bia-theme/base/breakpoints";
import typography from "assets/bia-theme/base/typography";
import boxShadows from "assets/bia-theme/base/boxShadows";
import borders from "assets/bia-theme/base/borders";
import globals from "assets/bia-theme/base/globals";

// Material Dashboard  React helper functions
import boxShadow from "assets/bia-theme/functions/boxShadow";
import hexToRgb from "assets/bia-theme/functions/hexToRgb";
import linearGradient from "assets/bia-theme/functions/linearGradient";
import pxToRem from "assets/bia-theme/functions/pxToRem";
import rgba from "assets/bia-theme/functions/rgba";

// Material Dashboard  React components base styles for @mui material components
import sidenav from "assets/bia-theme/components/sidenav";
import list from "assets/bia-theme/components/list";
import listItem from "assets/bia-theme/components/list/listItem";
import listItemText from "assets/bia-theme/components/list/listItemText";
import card from "assets/bia-theme/components/card";
import cardMedia from "assets/bia-theme/components/card/cardMedia";
import cardContent from "assets/bia-theme/components/card/cardContent";
import button from "assets/bia-theme/components/button";
import iconButton from "assets/bia-theme/components/iconButton";
import input from "assets/bia-theme/components/form/input";
import inputLabel from "assets/bia-theme/components/form/inputLabel";
import inputOutlined from "assets/bia-theme/components/form/inputOutlined";
import textField from "assets/bia-theme/components/form/textField";
import menu from "assets/bia-theme/components/menu";
import menuItem from "assets/bia-theme/components/menu/menuItem";
import switchButton from "assets/bia-theme/components/form/switchButton";
import divider from "assets/bia-theme/components/divider";
import tableContainer from "assets/bia-theme/components/table/tableContainer";
import tableHead from "assets/bia-theme/components/table/tableHead";
import tableCell from "assets/bia-theme/components/table/tableCell";
import linearProgress from "assets/bia-theme/components/linearProgress";
import breadcrumbs from "assets/bia-theme/components/breadcrumbs";
import slider from "assets/bia-theme/components/slider";
import avatar from "assets/bia-theme/components/avatar";
import tooltip from "assets/bia-theme/components/tooltip";
import appBar from "assets/bia-theme/components/appBar";
import tabs from "assets/bia-theme/components/tabs";
import tab from "assets/bia-theme/components/tabs/tab";
import stepper from "assets/bia-theme/components/stepper";
import step from "assets/bia-theme/components/stepper/step";
import stepConnector from "assets/bia-theme/components/stepper/stepConnector";
import stepLabel from "assets/bia-theme/components/stepper/stepLabel";
import stepIcon from "assets/bia-theme/components/stepper/stepIcon";
import select from "assets/bia-theme/components/form/select";
import formControlLabel from "assets/bia-theme/components/form/formControlLabel";
import formLabel from "assets/bia-theme/components/form/formLabel";
import checkbox from "assets/bia-theme/components/form/checkbox";
import radio from "assets/bia-theme/components/form/radio";
import autocomplete from "assets/bia-theme/components/form/autocomplete";
import container from "assets/bia-theme/components/container";
import popover from "assets/bia-theme/components/popover";
import buttonBase from "assets/bia-theme/components/buttonBase";
import icon from "assets/bia-theme/components/icon";
import svgIcon from "assets/bia-theme/components/svgIcon";
import link from "assets/bia-theme/components/link";
import dialog from "assets/bia-theme/components/dialog";
import dialogTitle from "assets/bia-theme/components/dialog/dialogTitle";
import dialogContent from "assets/bia-theme/components/dialog/dialogContent";
import dialogContentText from "assets/bia-theme/components/dialog/dialogContentText";
import dialogActions from "assets/bia-theme/components/dialog/dialogActions";

export default createTheme({
  direction: "rtl",
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
