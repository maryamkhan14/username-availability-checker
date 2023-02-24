import { createTheme } from "@mui/material";
import { blue, orange, deepPurple, pink } from "@mui/material/colors";
const themeGlobal = createTheme({
  stretch: { height: "100%" },
  palette: {
    background: {
      default: "#F0F0F0",
    },
    primary: {
      main: "#fff",
      alt: "#F0F0F0",
      card: "#DEDEDE",
      twitter: blue[200],
      reddit: orange[300],
      twitch: deepPurple[200],
      tiktok: pink[200],
    },
    text: {
      primary: "#F0F0F0",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
  },
  typography: {
    fontFamily: "Rubik, Arial",
    body3: {
      fontStyle: "italic",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: "100%",
          background:
            "linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url('bg.jpg')",

          backgroundSize: "contain",
        },
        html: { height: "100%" },
        "@font-face": [
          {
            fontDisplay:
              "swap" /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */,
            fontFamily: "Rubik",
            fontStyle: "normal",
            fontWeight: 400,
            src: "url('fonts/rubik-v23-latin-regular.eot?#iefix') format('embedded-opentype'), url('fonts/rubik-v23-latin-regular.woff2') format('woff2'), url('fonts/rubik-v23-latin-regular.woff') format('woff'), url('fonts/rubik-v23-latin-regular.ttf') format('truetype'), url('fonts/rubik-v23-latin-regular.svg#Rubik') format('svg')",
          },
        ],
      },
    },
  },
});
export default themeGlobal;
