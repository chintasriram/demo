
// Material Dashboard  React base styles
import colors from "assets/bia-theme/base/colors";
import boxShadows from "assets/bia-theme/base/boxShadows";
import borders from "assets/bia-theme/base/borders";

const { background } = colors;
const { md } = boxShadows;
const { borderRadius } = borders;

const tableContainer = {
  styleOverrides: {
    root: {
      backgroundColor: background.card,
      boxShadow: md,
      borderRadius: borderRadius.xl,
    },
  },
};

export default tableContainer;
