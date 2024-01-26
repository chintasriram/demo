import React, { useEffect, useState } from 'react'
import MDBCard from './MDBCard'
import MDBTypography from './MDBTypography'
import Tick from 'assets/images/icons/svg/large/CheckIcon4030.svg'
import { Grid } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TiktokIcon from './TiktokIcon'


export default function SocialPlatformSelect(props) {
    const [instaSelect, setInstaSelect] = useState(props?.data?.insta? true: false);
    const [tiktokSelect, setTiktokSelect] = useState("")
    const [youtubeSelect, setYoutubeSelect] = useState("")
    const [data, setData] = useState(props?.data !==undefined ? props.data :{
        instagram:false,
        tiktok:false,
        youtube:false,
    })

    useEffect(() => {
        // Check selected platforms
        props?.selectedPlatforms?.map((platform, idx)=>{
            selectHandler(null, platform)
        })
    }, [props.selectedPlatforms])
    
    //Select Handler
    const selectHandler = (e, name) =>{ 
        e?.preventDefault()
        switch (name) {
            case "instagram":
                setInstaSelect(!instaSelect);
                data.instagram=!instaSelect;
                break;
        
            case "tiktok":
                setTiktokSelect(!tiktokSelect)
                data.tiktok=!tiktokSelect;
                break;
                    
            case "youtube":
                setYoutubeSelect(!youtubeSelect)
                data.youtube=!youtubeSelect;
                break;

            default:
                break;
        }
        setData(data)
        props?.callBackHandler(data);
    }

  return (
    <div>
        <Grid container>
            <Grid pb={2}>
                {/* Instagram */}
                <MDBCard
                    bgcolor="transparent"
                    borderSize="xl"
                    // sx={{ m:0, pb:0 , border : instaSelect? "1px solid #ffff": "" }}
                    sx={{m:0, pb:0 ,border:"1px solid #3B3D40",
                    "&:hover": { border: '1px solid white' }}}
                    onClick ={(e)=>selectHandler(e, "instagram")}
                >
                    <Grid
                        sx={{mb: -1.188, px: 2.25, pt: 2}}
                        pb={instaSelect ? 0 : 4.5  }
                    >
                        <InstagramIcon 
                            sx={{width: "34px", height: "34px", color: instaSelect ? "#fff": "#8A8F93"}}
                        />
                    </Grid>

                    { (instaSelect) &&
                        <Grid container my={1}>
                            <MDBTypography
                                component="img"
                                src={Tick}
                                height="12px"
                                mt={0.25} mr={0.5}
                            />
                            <MDBTypography
                                color="white"
                                fontWeight="regular" 
                                fontSize ="xs" 
                                lineHeight = "md"
                            >
                                Selected
                            </MDBTypography>
                        </Grid>
                    }
                </MDBCard>
            </Grid>

            <Grid mx={3}>
                {/* Tiktok */}
                <MDBCard
                    bgcolor="transparent"
                    borderSize="xl"
                    // sx={{ m:0, pb:0 , border : tiktokSelect? "1px solid #ffff": "" }}
                    sx={{m:0, pb:0 ,border:"1px solid #3B3D40",
                    "&:hover": { border: '1px solid white' }}}
                    onClick ={(e)=>selectHandler(e, "tiktok")}
                >
                    <Grid
                        sx={{mb: -1.188, px: 2.3, pt: 2.25}}
                        pb={tiktokSelect ? 0 : 4.5 }
                    >
                        <TiktokIcon
                            color={ tiktokSelect? "#ffffff": "#8A8F93"}
                        />
                    </Grid>
                    { (tiktokSelect) &&
                        <Grid container my={1}>
                            <MDBTypography
                                component="img"
                                src={Tick}
                                height="12px"
                                mt={0.25} mr={0.5}
                            />
                            <MDBTypography
                                color="white"
                                fontWeight="regular" 
                                fontSize ="xs" 
                                lineHeight = "md"
                            >
                                Selected
                            </MDBTypography>
                        </Grid>
                    }
                </MDBCard>
            </Grid>

            <Grid>
                {/* Youtube */}
                <MDBCard
                    bgcolor="transparent"
                    borderSize="xl"
                    // sx={{ m:0, pb:0 , border : youtubeSelect? "1px solid #ffffff": "" }}
                    sx={{m:0, pb:0 ,border:"1px solid #3B3D40",
                    "&:hover": { border: '1px solid white' }}}
                   
                    onClick ={(e)=>selectHandler(e, "youtube")}
                >
                    <Grid
                        sx={{mb: -1.188, px: 2.25, pt: 2 }}
                        pb={youtubeSelect ? 0 : 4.5 }
                    >
                         <YouTubeIcon 
                           sx={{width: "34px", height: "34px", color: youtubeSelect? "#ffffff": "#8A8F93"}}
                        />
                    </Grid>
                    { (youtubeSelect) &&
                        <Grid container my={1}>
                            <MDBTypography
                                component="img"
                                src={Tick}
                                height="12px"
                                mt={0.25} mr={0.5}
                            />
                            <MDBTypography
                                color="white"
                                fontWeight="regular" 
                                fontSize ="xs" 
                                lineHeight = "md"
                            >
                                Selected
                            </MDBTypography>
                        </Grid>
                    }
                </MDBCard>
            </Grid>
        </Grid>
    </div>
  )
}
