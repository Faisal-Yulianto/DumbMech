import { createTheme } from "@mui/material";

const dumbmerchTheme = createTheme ({
   palette: {
    primary : {
        main : '#FFFFFF',
    },
    info : {
        main : '#6A6A6A'
    },
    secondary : {
        main : '#F74D4D'
    },
    background : {
        default : 'black'
    },
    error : {
        main : '#4caf50'
    }
   }, 
   typography: {
    fontFamily: '"avenir", "Helvetica", "Arial", sans-serif',
    h1 : {
        fontSize : '56px'
    },
    h2 : {
        fontSize : '18px'
    }
  },
})

export default dumbmerchTheme;