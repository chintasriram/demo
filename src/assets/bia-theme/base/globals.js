// Material Dashboard  React Base Styles
import colors from "assets/bia-theme/base/colors";

const { info, dark, smoke_light } = colors;

const globals = {
  html: {
    scrollBehavior: "smooth",
  },
  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
  },
  "a, a:link, a:visited": {
    textDecoration: "none !important",
  },
  "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited": {
    color: `${dark.main} !important`,
    transition: "color 150ms ease-in !important",
  },
  "a.link:hover, .link:hover, a.link:focus, .link:focus": {
    color: `${info.main} !important`,
  },



  //Scrollbar Custom styles
  '&::-webkit-scrollbar': {
    // To Hidden the scroll bar
    width: '8px',
    height: '0px'
  },
  '&::-webkit-scrollbar-track': {
    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: smoke_light.main,
    // outline: '1px solid #ffff',
    borderRadius: "4px"
  },

  "& .MuiFormHelperText-root": {

    color: "#E53935 !important",
    marginTop: " 10px !important",
    marginLeft: "2px !important",
    fontSize: "16px !important"
  },

  /* Change the white to any color */
  "input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active": {
    "-webkit-box-shadow": "0 0 0 30px inset !important",
    "-webkit-text-fill-color": "white !important;"
  },

  // To remove the Arrow up and down icons in input type number
  "input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: 0
  },

  // Toast style changes
  "& .Toastify__toast": {
    background: "#2C3334 !important",
    color: "#ffffff !important ",
    fontSize: "16px !important",
    fontFamily: "aktiv-grotesk,sans-serif !important",
    fontWeight: "500",
    lineHeight:"24px !important",
    background: "#2C3334 !important",
    border: "1px solid #3B3D40 !important",
    padding: "12px 25px 12px 25px !important",
  },
  "& .Toastify__toast-icon":{
    width: "35px !important"
  },

  "& .Toastify__toast--success": {
    border: "1px solid #3B3D40 !important",
    borderRadius: "12px !important",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 0px 40px #000000",
  },
  "& .Toastify__toast--error": {
    border: "1px solid #3B3D40 !important",
    borderRadius: "12px !important",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 0px 40px #000000",
  },
  
  "& .Toastify__close-button": {
    color: "#ffffff !important",
    paddingTop: "8px",
  },
  "& .Toastify__close-button > svg": {
    height: "22px !important",
    width: "22px !important",
  },

  // Bia-Calender changes

  // Bia Calender event pop up background change{must}
  "& .css-1n77ywu-MuiPaper-root-MuiDialog-paper": {
    backgroundColor: "#1C1F21 !important",
  },

  // Bia-Calender event bar bg and color changes{must}
  "& .css-10d1a0h-MuiButtonBase-root": {
    backgroundColor: "#BBDCD2 !important",
    color: "#111315 !important",
    fontWeight: "500px !important",
    fontSize: "20px !important",
  },
  "& .css-1b47e06": {
    backgroundColor: "#BBDCD2 !important",
    color: "#111315 !important",
    fontWeight: "500px !important",
    fontSize: "20px !important"
  },  

  // Bia-Calender year  popup  changes responsive
  // backgoround change
  "& .css-y6k0c2": {
    backgroundColor: "#000000 !important",
    color: "#FFFFFF !important",
  },
  // selectdate
  "& .css-r7bmgo": {
    color: "#FFFFFF !important",
    fontWeight: "400px !important",
    fontSize: "16px !important",
  },
  // same column year
  "& .css-r7bmgo": {
    color: "#FFFFFF !important",
  },
  //onhover for month
  "& .css-fio6d0.Mui-selected:hover": {
    backgroundColor: "#BBDCD2 !important",
  },
  //months  font color
  "& .css-10tolgk ": {
    color: "#ffffff !important",
  },
  //dropdown arrow color
  "& .css-clvohm": {
    color: "#ffffff !important",
  },

  // Bia-Calender month  popup  changes
  "& .css-a9rw36": {
    backgroundColor: "rgba(17, 19, 21, 0.96) !important",
    color: "#ffffff !important"
  },
  // on hover
  "& .css-fio6d0.Mui-selected": {
    backgroundColor: "#BBDCD2 !important",
    color: "#000000 !important"
  },

  // Bia-Calender year  popup  changes- onHover
  "& .css-1l7wks8.Mui-selected": {
    backgroundColor: "#BBDCD2 !important",
    color: "#000000 !important"
  },

  // Bia-Calender event  popup st date & end date changes
  "& .css-gmgnjc ": {
    backgroundColor: "rgba(17, 19, 21, 0.96) !important",
    color: "#ffffff !important",
    fontWeight: "400px !important",
    fontSize: "12px !important",
    lineHeight: "26px !important",
    padding: "5px",
    margin: "0"
  },

  // Bia-Calender WEEK time column change
  "& .css-15dvbud": {
    color: "#FFFFFF !important",
  },

  // Bia calender  date and week column padding change in week view
  "& .css-4yjh3a .rs__cell.rs__header>:first-of-type": {
    padding: "0px !important",
    paddingLeft: "5px !important",
  },

  // Bia Calender chnages present date Font color in Week , Day view 
  "& .css-p6pi2f": {
    color: "#BBDCD2 !important",
  },

  //New changes Calendar year popup
  "& .MuiCalendarOrClockPicker-root ": {
    color: "white !important", 
    backgroundColor: "#111315 !important",
    "& .Mui-selected ": {
      color: "black !important",
      backgroundColor: "#BBDCD2 !important",

    },
  },
  " & .MuiPopover-paper > div > div:has(.rs__popper_actions) ": {
    backgroundColor: "#111315 !important", 
    borderRadius: "1rem 1rem 0 0"

  }, 
  " & .MuiPopover-paper   div:nth-of-type(2):has(span) ":{
    padding:"3px 3px !important",
    background:"#111315",
    borderRadius:"0 0 1rem 1rem"
  }, 
  " & .MuiPopover-paper   div:nth-of-type(2) > span":{
    //padding:"6px !important",
    // color: "#FFF !important", 
    // background:"#111315 !important",
    // fontSize:"16px",
    // fontWeight:"400"
    display: "none !important"
  },
  " & .MuiPopover-paper   div:nth-of-type(2) > div":{ 
    borderRadius: "0 0 1rem 1rem",
  },
  " & .MuiPopover-paper   div:nth-of-type(2) > span > svg ": {
    fill: "rgb(255, 255, 255)",
    width: "16px",
    height: "16px",
  },
  ".MuiPopover-paper>div>div>p": {
    display: "none"
  },
  " & .rs__table_loading": {
    background: "none !important"
  },
  "& .rs__popper_actions > div > button > svg ": {
    fill: "white !important"
  },
  " & .MuiPopover-paper >  div:has(div .rs__popper_actions) ": {
    border: "1px solid #3B3D40 !important",
    borderRadius:"6px",
    // padding:"4px 4px 4px 9px",
    background:"#111315!important",
    width:"inherit"
  }, 
  " &  .rs__popper_actions   svg":{
    fill: "#D2D2D3 !important", 
  }, 
  " &  .rs__popper_actions + p":{
    fill: "#D2D2D3 !important", 
  }, 
  "& .rs__popper_actions":{
    flexDirection:"row-reverse",
    justifyContent:"inherit !important"
  },
  "& .rs__popper_actions .cancel":{
    color:"#FFF !important"
  },
  //this is for mozilla for now 
  " & .css-s22wio > div":{   
    background:"#111315!important",
    width:"100%"
  }, 
  " & .css-s22wio":{
    border: "1px solid #3B3D40 !important",
    borderRadius:"6px", 
    padding:"4px 4px 4px 9px",
    background:"#111315!important",
    width:"100% !important"
  },  
}
export default globals;
