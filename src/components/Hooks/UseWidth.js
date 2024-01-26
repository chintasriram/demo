import { useMediaQuery, useTheme } from '@material-ui/core'
import {
    Breakpoint,
    Theme,
  } from '@mui/material/styles'
  import biaTheme from "assets/bia-theme";
  /**
   * taken from https://material-ui.com/components/use-media-query/#migrating-from-withwidth
   *
   * Be careful using this hook. It only works because the number of
   * breakpoints in theme is static. It will break once you change the number of
   * breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
   */
  
  export const useWidth = () => {
    const theme = biaTheme;
    const keys = [...theme.breakpoints.keys].reverse()
    return (
    keys.filter(key => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const matches = useMediaQuery(theme.breakpoints.up(key))
        if (matches) return key; 
      })
    )
  }