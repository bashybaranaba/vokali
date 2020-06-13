export default{
    spacing: factor => `${0.25 * factor}rem`,
    
    palette: {
      primary: {
        light: '#f06292',
        main: '#f50057',
        dark: '#d81b60',
        contrastText: '#fff',
      },
      secondary: {
        light: '#9575cd',
        main: '#651fff',
        dark: '#2962ff',
        contrastText: '#fff',
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
  
      typography: {
        useNextVariants: true
      }
    },
  }