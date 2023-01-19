import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";


const theme = {
  config: <ThemeConfig> {
    initalColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: (props: Record<string, any> | StyleFunctionProps) => ({
      body: {
        fontFamily: 'Nunito Sans',
        bg: mode("hsl(0, 0%, 98%)", "hsl(207, 26%, 17%)")(props)
      },
    }),
  },
  colors: {

    darkModeElements: "hsl(209, 23%, 22%)",
    lightModeText: "hsl(200, 15%, 8%)", //(Light Mode Text)
    lighModeInput : "hsl(0, 0%, 52%)", //(Light Mode Input)
    darkModeText: "hsl(0, 0%, 100%)", //(Dark Mode Text & Light Mode Elements)
  },
  fonts: {
    heading: `'Nunito Sans', sans-serif`,
    body: `'Nunito Sans', sans-serif`,
  },
  breakpoints: {
    cardBreak: '53.125em',
    cardStop: '102em',
  }
}


export default extendTheme(theme);
