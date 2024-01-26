import MDBox from 'components/MDBox';
import React, { useEffect,  } from 'react'  
import { useLocation } from 'react-router-dom';  
export default function OauthCallback(props) { 
    const location = useLocation()
    const params = new URLSearchParams(location.search); 
    useEffect(() => {
        if(params){
            let data = {
                "token":params.get("token"),
                "refresh_token":params.get("refresh_token"),
                "handler":params.get("provider")?params.get("provider"):"",
                "name":params.get("name")?params.get("name"):"",
                "providerId":params.get("providerId")?params.get("providerId"):"",
                "email":params.get("email")?params.get("email"):"",
                "isCallback":true,
                "provider":params.get("provider")
            }
            if(window.opener){
                window.opener.postMessage(data,  window.location.origin); 
                window.close();
            }  
        } 
     }, []); 
  return (
    <div>
        <MDBox m={2} sx={{width: "97%"}}>   
        </MDBox>
        
    </div>
  )
}
