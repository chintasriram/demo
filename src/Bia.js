import {useEffect} from "react";

// react-router components
import { Routes, Route,useLocation,Navigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard  React contexts
import { useMaterialUIController} from "context";

// Images
import biaTheme from "assets/bia-theme";
import biaRoutes from "biaRoutes";
import AuthProvider from "providers/AuthProvider";
import CLayout from "layouts/cLayout";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    direction
  } = controller;
  const { pathname } = useLocation();
  
  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0; 
  }, [pathname]);

  return (
    <ThemeProvider theme={biaTheme}>
      <CssBaseline />
      <Routes>
        {
          biaRoutes.map((route) => {
            return(
              <Route exact 
                  path={route.route} 
                  element={
                  <AuthProvider isAuthicate={route.isAuthicate} isBoth={route.isBoth}>
                    {
                      (route.layout && route.layout==="/c") ? <CLayout routePath={route.route}/> : route.component
                    }
                  </AuthProvider>
                }  
                key={route.key} 
              />
            )
          })
        }
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </ThemeProvider>
  );
}
