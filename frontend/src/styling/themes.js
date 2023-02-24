import { createTheme } from "@mui/material";
import { blue, orange, deepPurple, pink } from "@mui/material/colors";
const themeGlobal = createTheme({
  stretch: { height: "100%" },
  palette: {
    background: {
      default: "#DEDEDE",
    },
    primary: {
      main: "#fff",
      alt: "#F0F0F0",
      twitter: blue[100],
      reddit: orange[200],
      twitch: deepPurple[200],
      tiktok: pink[100],
    },
    text: {
      primary: "#173A5E",
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
