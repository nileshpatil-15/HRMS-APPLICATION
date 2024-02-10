import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
const customTheme = createTheme({
  components: {
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: "100px", // Border color after focus
    //       fontFamily: "roboto",

    //       // "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
    //       //   {
    //       //     borderColor: "purple",
    //       //      // Change border color when focused
    //       //   },
    //       // "& .MuiInputLabel-root.Mui-focused": {
    //       //   color: "green", // Change label color when focused
    //       // },
    //     },
    //   },
    // },

    // MuiTab: {
    //   styleOverrides: {
    //     root: {
    //       "& .MuiTabs-indicator": {
    //         borderBottom: '2px solid green',
    //         maxWidth: '100px', // Adjust the width as needed
    //       },
    //       "& .MuiTab-root": {
    //         padding: '8px', // Adjust the padding around each tab
    //         fontSize: '12px',
    //         color: "#666666",
    //         // Adjust the padding around each tab
    //         typography: {
    //           fontFamily: 'Montserrat', // Change the font family
    //         },
    //       },
    //     },
    //   },
    // },
    
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: "999px",
    //       // popupIndicatorOpen: {
    //       //   // border: '1px solid red', // Border color after focus
    //       //   "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
    //       //     {
    //       //       borderColor: "red",
    //       //    // Change border color when focused
    //       //     },
    //       // },
    //     },
    //   },
    // },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "999px",
          fontWeight: 800,
          fontSize: "16px",

          // fontFamily: "Roboto",
          lineHeight: "24px",
          padding: "13px 24px",
          backgroundColor: "#6F6CFF",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#fef2f2",
            color: "#ffffff",
          },
          textTransform: "none",
        },
        containedPrimary: {
          // color: "#6F6CFF",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "red",
            boxShadow: "none",
          },
        },
        sizeSmall: {
          padding: "8px 16px",
          fontSize: "14px",
          lineHeight: "20px",
        },
      },
    },
  },
  // typography: {
  //   fontFamily: [
  //   'sans-serif'
  //     // '-apple-system',
  //     // 'BlinkMacSystemFont',
  //     // '"Segoe UI"',
  //     // 'Roboto',
  //     // '"Helvetica Neue"',
  //     // 'Arial',
  //     // 'sans-serif',
  //     // '"Apple Color Emoji"',
  //     // '"Segoe UI Emoji"',
  //     // '"Segoe UI Symbol"',
  //   ].join(','),
  // },
});
export default customTheme;
