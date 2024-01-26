import React,{useEffect, useState} from 'react';

import BiaDashboardLayout from 'layouts/biaDashboardLayout'
import MDBox from 'components/MDBox'
import CreateMediaKit from 'components/MediaKits/CreateMediaKit';
import MediaKitCard from 'components/MediaKits/MediaKitCard';
import httpService from 'service/HttpService';
import MDBSkeleton from 'components/MDBSkeleton';

export default function MediaKit() {
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
    if(user !== null && user !== null && user?.id !== undefined){
      //API call
      httpService.getuserMediaKits(user.id).then((res)=>{
        setIsLoading(false);
        if(res!==null && res!==undefined && res?.data?.data!==null && res?.data?.data!==undefined){
          // Check mediakits
          if(res.data.data?.length>0){
            setMediaKits(res.data.data)
          }
        }
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
    <BiaDashboardLayout>
      {
          mediaKits?.length>0 ?
          <MDBox sx={{p:8}}>
            <MediaKitCard
              userName={user?.name}
            />
          </MDBox> 
          :
          <MDBox sx={{px:0, py:8, ml: "auto", mr:"auto"}}>
            <CreateMediaKit/>
          </MDBox>
      }
    </BiaDashboardLayout>
  )
}
