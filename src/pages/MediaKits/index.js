import React,{useEffect, useState} from 'react';
import httpService from 'service/HttpService';
import { Grid } from '@mui/material';
import MediakitWelcome from './MediakitWelcome';
import MediaKitCard from 'appcomponents/MediaKits/MediaKitCard';

export default function MediaKits() {
  const [isLoading, setIsLoading] = useState(true);
  const [mediaKits, setMediaKits] = useState([]);
  const [user, setUser] = useState({})

  useEffect(() => {
   
    setIsLoading(true)
    // Get user mediakits
    getUserMediaKits();
  }, [])

  // Get user mediakits
  function getUserMediaKits(){
    let user = getUserFromSession();
    if(user !== null && user !== undefined){
      let payload = {
        "userId": user?.id,
        "clientId": user?.clientId
      }

      //API call
      httpService.getMediaKits(payload).then((res)=>{
        if(res!==null && res!==undefined && res?.data?.data!==null && res?.data?.data!==undefined){
          // Check mediakits
          if(res.data.data?.length>0){
            setMediaKits(res.data.data)
          }
        }
        setIsLoading(false);
      }).catch((error)=>{
        setIsLoading(false);
      })
    }else{
      setIsLoading(false);
    }
  }

  //Get user from session
  const getUserFromSession = () => {
    if(window.localStorage.getItem("user")){
      let userInfo = JSON.parse(window.localStorage.getItem("user"));
      setUser(userInfo)
      return userInfo;
    }
    return null;
  };

  return (
    <Grid>
      { isLoading===false &&
        <div>
          {mediaKits?.length>0 ?
            <Grid sx={{p:4}} container>
              {
                mediaKits?.map((mediakit, idx)=>(
                  <MediaKitCard
                    key={idx}
                    data={mediakit}
                    userName={user?.name}
                  />
                ))
              }
            </Grid> 
            :
            <Grid>
              <MediakitWelcome/>
            </Grid>
          } 
        </div>  
      }
    </Grid>
  )
}
