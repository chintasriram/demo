// @mui icons
import { Icon } from "@mui/material";
import Home from "pages/home";
import homeIcon from "assets/images/icons/svg/medium/HomeIcon.svg"
import marketplaceIcon from "assets/images/icons/svg/medium/MarketPlaceIcon.svg"
import SignIn from "pages/Login/SignIn";
import Signup from "pages/Signup/Signup";
import Waitlist from "pages/Waitlist/Waitlist";
import WaitlistSuccess from "pages/Waitlist/WaitlistSuccess";
import BoSignup from "pages/boSignup";
import CreatorWelcome from "pages/Signup/CreatorWelcome";
import BrandWelcome from "pages/Signup/BrandWelcome";
import ProfilePage from "pages/profile/profilePage"
import Components from "pages/componets";
import Demo from "pages/demo";
import ComponentsList from "pages/ComponentsList";
import SuccessRegister from "pages/Signup/successRegister";
import Settings from "pages/Settings";
import MediaKits from "pages/MediaKits";
import Rates from "pages/MediaKits/cards/Rates";
import PastcampaignCard from "pages/MediaKits/cards/PastcampaignCard";
import CreateMediaKit from "pages/MediaKits/CreateMediaKit";
import MediaKitEdit from "pages/MediaKits/MediaKitEdit";
import OauthCallback from "pages/Settings/OauthCallback";
import SuccessEmail from "pages/MediaKits/cards/SuccessEmail";
import Campaigns from "pages/campaigns";
import ExternalMediakit from "pages/MediaKits/ExternalMediakit";
import Privacy from "pages/policies/Privacy";
import Terms from "pages/policies/termsandconditions";
import Planner from "pages/Planner";
import SyncGoogleCalender from "pages/Settings/cards/SyncGoogleCalander"
import SyncGoogleCalenderType from "pages/Settings/cards/SyncGoogleCalenderType";
import EditOutlooksync from "pages/Settings/cards/EditOulooksync";
import LandingPage from "pages/LandingPage/LandingPage"
import PreviewMediakit from "pages/MediaKits/PreviewMediakit";
import Proposals from "pages/proposals";
import ResetPassword from "pages/Login/ResetPassword";
import Notifications from "appcomponents/Notifications";
import NewPassword from 'pages/Login/NewPassword'
import Referral from "pages/Referral";
import Version from "pages/Version";
import DataRequest from "pages/policies/DataRequest";
import Payments from "pages/payments";
import MarketPlace from "pages/marketPlace";
import CreatorsPage from "pages/Creators/CreatorsPage";
import BrandsPage from "pages/Brands/BrandsPage";
import TeamPage from "pages/Team/TeamPage";
import ReviewOpenCampaign from "pages/Campaigns/ReviewOpenCampaign";
import InfluencerFullDetails from "pages/Marketplace/InfluencerFullDetails";
import CampaignDetailPage from "./pages/Campaigns/CampaignDetailPage";

const biaRoutes = [
  {
    type: "collapse",
    name: "Welcome",
    key: "",
    icon: '',
    image: homeIcon,
    route: "/register/success",
    component: <SuccessRegister />,
    isAuthicate: false,
    isBoth: true,
    layout:""
  },
  
  {
    type: "collapse",
    name: "Welcome",
    key: "",
    icon: '',
    image: homeIcon,
    route: "/referral",
    component: <Referral />,
    isAuthicate: false,
    isBoth: true
  },
  {
    type: "collapse",
    name: "Welcome",
    key: "",
    icon: '',
    image: homeIcon,
    route: "/version",
    component: <Version />,
    isAuthicate: false,
    isBoth: true
  },

  {
    type: "collapse",
    name: "Welcome",
    key: "",
    icon: '',
    image: homeIcon,
    route: "/creatorHomepage",
    component: < creatorHomepage />,
    isAuthicate: true,
    layout:""
  },
  {
    type: "collapse",
    name: "Welcome",
    key: "",
    icon: '',
    image: homeIcon,
    route: "/EditOutlooksync",
    component: < EditOutlooksync />,
    isAuthicate: true,
    layout:""
  },
  {
    type: "collapse",
    name: "Welcome",
    key: "",
    icon: '',
    image: homeIcon,
    route: "/syncGoogleCalenderType",
    component: < SyncGoogleCalenderType />,
    isAuthicate: true,
    layout:""
  },
  {
    type: "collapse",
    name: "Welcome",
    key: "",
    icon: '',
    image: homeIcon,
    route: "/",
    component: <LandingPage />,
    isAuthicate: false,
    layout:""
  },
  {
    type: "collapse",
    name: "Creators",
    key: "",
    icon: '',
    image: homeIcon,
    route: "/creators",
    component: <CreatorsPage />,
    isAuthicate: false,
    layout:""
  },
  {
    type: "collapse",
    name: "Brands",
    key: "",
    icon: '',
    image: homeIcon,
    route: "/brands",
    component: <BrandsPage />,
    isAuthicate: false,
    layout:""
  },
  {
    type: "collapse",
    name: "Team",
    key: "",
    icon: '',
    image: homeIcon,
    route: "/team",
    component: <TeamPage />,
    isAuthicate: false,
    layout:""
  },
  {
    type: "collapse",
    name: "Home",
    key: "c/home",
    icon: '',
    image: homeIcon,
    route: "/c/home",
    component: <Home />,
    isAuthicate: true,
    layout:"/c"
  },
  {
    type: "collapse",
    name: "Marketplace",
    key: "c/marketplace",
    icon: '',
    image: marketplaceIcon,
    route: "/c/marketplace",
    component: <MarketPlace/>,
    isAuthicate: true,
    layout:"/c"
  },
  {
    type: "collapse",
    name: "Influencer Details",
    key: "c/marketplace/details",
    icon: '',
    image: marketplaceIcon,
    route: "/c/marketplace/details",
    component: <InfluencerFullDetails />,
    isAuthicate: true,
    layout:"/c"
  },
  {
    type: "collapse",
    name: "Campaigns",
    key: "c/campaigns",
    icon: '',
    image: homeIcon,
    route: "/c/campaigns",
    component: <Campaigns />,
    isAuthicate: true,
    layout:"/c"
  },
  {
    type: "collapse",
    name: "Review Campaigns",
    key: "c/campaigns/review",
    icon: '',
    image: homeIcon,
    route: "/c/campaigns/review",
    component: <ReviewOpenCampaign />,
    isAuthicate: true,
    layout:""
  },
  {
    type: "collapse",
    name: "Campaign Detail",
    key: "c/campaigns/detail",
    icon: '',
    image: homeIcon,
    route: "/c/campaigns/details",
    component: <CampaignDetailPage />,
    isAuthicate: true,
    layout:""
  },
  {
    type: "collapse",
    name: "Proposals",
    key: "c/proposals",
    icon: '',
    image: homeIcon,
    route: "/c/proposals",
    component: <Proposals />,
    isAuthicate: true,
    layout:"/c"
  },
  {
    type: "collapse",
    name: "Planning",
    key: "c/planning",
    icon: '',
    image: homeIcon,
    route: "/c/planning",
    component: <Planner />,
    isAuthicate: true,
    layout:"/c"
  },
  {
    type: "collapse",
    name: "Payments",
    key: "c/payments",
    icon: '',
    image: homeIcon,
    route: "/c/payments",
    component: <Payments />,
    isAuthicate: true,
    layout:"/c"
  },
  {
    type: "collapse",
    name: "creatorwelcome",
    key: "creatorwelcome",
    icon: '',
    image: homeIcon,
    route: "/register/onboard",
    component: <CreatorWelcome />,
    isAuthicate: false,
    isBoth: true,
    layout:""
  },
  {
    type: "collapse",
    name: "brandwelcome",
    key: "brandwelcome",
    icon: '',
    image: homeIcon,
    route: "/Bwelcome",
    component: <BrandWelcome />,
    isAuthicate: true,
    layout:""
  },
  {
    type: "collapse",
    name: "profile",
    key: "profile",
    icon: '',
    image: homeIcon,
    route: "/profile",
    component: <ProfilePage />,
    isAuthicate: true,
    layout:""
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/login",
    component: <SignIn />,
    isAuthicate: false,
    layout:""
  },
  {
    type: "collapse",
    name: "getstarted",
    key: "getstarted",
    icon: <Icon fontSize="small">Signup</Icon>,
    route: "/register",
    component: <Signup />,
    isAuthicate: false,
    layout:""
  },
  {
    type: "collapse",
    name: "getstarted",
    key: "getstarted",
    icon: <Icon fontSize="small">Signup</Icon>,
    route: "/waitlist",
    component: <Waitlist />,
    isAuthicate: false,
    layout:""
  },
  {
    type: "collapse",
    name: "waitlist",
    key: "waitlistSuccess",
    icon: <Icon fontSize="small">Signup</Icon>,
    route: "/waitlist/success",
    component: <WaitlistSuccess />,
    isAuthicate: false,
    layout:""
  },
  {
    type: "collapse",
    name: "getstarted",
    key: "getstarted",
    icon: <Icon fontSize="small">GetStarted</Icon>,
    route: "/bo/register",
    component: <BoSignup />,
    isAuthicate: false,
    layout:""
  },
  {
    type: "collapse",
    name: "components",
    key: "components",
    icon: <Icon fontSize="small">components</Icon>,
    route: "/components",
    component: <Components />,
    isAuthicate: true,
    layout:""
  },

  {
    type: "collapse",
    name: "demo",
    key: "demo",
    icon: <Icon fontSize="small">demo</Icon>,
    route: "/demo",
    component: <Demo />,
    isAuthicate: false,
    layout:""
  },
  {
    type: "collapse",
    name: "components",
    key: "components",
    icon: <Icon fontSize="small">components</Icon>,
    route: "/bia/components",
    component: <ComponentsList />,
    isAuthicate: true,
    layout:""
  },
  {
    type: "collapse",
    name: "settings",
    key: "c/settings",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/c/settings",
    component: <Settings />,
    isAuthicate: true,
    layout:"/c"
  },
  {
    type: "collapse",
    name: "reset password",
    key: "reset password",
    icon: <Icon fontSize="small">Reset Password</Icon>,
    route: "/reset-password",
    component: <ResetPassword />,
    isAuthicate: false,
    layout:""
  },
  {
    type: "collapse",
    name: "Media Kit",
    key: "c/media-kit",
    icon: '',
    image: homeIcon,
    route: "/c/media-kit",
    component: <MediaKits />,
    isAuthicate: true,
    layout:"/c"
  },
  {
    type: "collapse",
    name: "Media Kit",
    key: "c/media-kit",
    icon: '',
    image: homeIcon,
    route: "/c/media-kit/save",
    component: <CreateMediaKit />,
    isAuthicate: true,
    layout:"/c"
  },
  {
    type: "Add Campaigns",
    name: "Add Campaigns",
    key: "c/add-campaigns",
    icon: <Icon fontSize="small">Add Campaigns</Icon>,
    route: "/c/media-kit/campaigns",
    component: <PastcampaignCard />,
    isAuthicate: true,
    layout:"/c"
  },
  {
    type: "Rates",
    name: "Rates",
    key: "c/rates",
    icon: <Icon fontSize="small">Rates</Icon>,
    route: "/c/media-kit/rates",
    component: <Rates />,
    isAuthicate: true,
    layout:"/c"
  },
  {
    type: "PreviewMediakit",
    name: "PreviewMediakit",
    key: "c/preview-mediakit",
    icon: <Icon fontSize="small">PreviewMediakit</Icon>,
    route: "/c/media-kit/preview",
    component: <PreviewMediakit />,
    isAuthicate: true,
    layout:""
  },
  {
    type: "PreviewMediakit",
    name: "PreviewMediakit",
    key: "PreviewMediakit",
    icon: <Icon fontSize="small">PreviewMediakit</Icon>,
    route: "/bia/:biourl",
    component: <PreviewMediakit />,
    isAuthicate: true,
    layout:""
  },
  {
    type: "PreviewMediakit",
    name: "PreviewMediakit",
    key: "PreviewMediakit",
    icon: <Icon fontSize="small">PreviewMediakit</Icon>,
    route: "/@:biourl",
    component: <ExternalMediakit />,
    isAuthicate: false,
    isBoth: true,
    layout:""
  },
  {
    type: "EditMediakit",
    name: "EditMediakit",
    key: "c/edit-mediakit",
    icon: <Icon fontSize="small">EditMediakit</Icon>,
    route: "/c/media-kit/edit",
    component: <MediaKitEdit />,
    isAuthicate: true,
    layout:""
  },
  {
    type: "calender",
    name: "calender",
    key: "calender",
    icon: <Icon fontSize="small">googleCalender</Icon>,
    route: "/SyncGoogleCalender",
    component: <SyncGoogleCalender />,
    isAuthicate: true,
    layout:""
  },
  {
    type: "OauthCallback",
    name: "OauthCallback",
    key: "OauthCallback",
    icon: <Icon fontSize="small">OauthCallback</Icon>,
    route: "/oauthCallback",
    component: <OauthCallback />,
    isAuthicate: false,
    isBoth: true,
    layout:""
  },
  {
    type: "collapse",
    name: "successEmail",
    key: "",
    icon: '',
    image: homeIcon,
    route: "/SuccessEmail",
    component: <SuccessEmail />,
    isAuthicate: true,
    layout:""
  },
  ,
  {
    type: "collapse",
    name: "externalMediakit",
    key: "c/external-mediakit",
    icon: '',
    image: homeIcon,
    route: "/c/external-mediakit",
    component: <ExternalMediakit />,
    isAuthicate: true,
    layout:""
  },
  {
    type: "PrivacyPolicy",
    name: "PrivacyPolicy",
    key: "PrivacyPolicy",
    icon: <Icon fontSize="small">PrivacyPolicy</Icon>,
    route: "/privacy",
    component: <Privacy />,
    isAuthicate: false,
    isBoth: true,
    layout:""
  },
  {
    type: "TermsOfUse",
    name: "TermsOfUse",
    key: "TermsOfUse",
    icon: <Icon fontSize="small">TermsOfUse</Icon>,
    route: "/terms",
    component: <Terms />,
    isAuthicate: false,
    isBoth: true,
    layout:""
  },
  {
    type: "notificationsPage",
    name: "notificationsPage",
    key: "c/notificationsPage",
    icon: <Icon fontSize="small">notificationsPage</Icon>,
    route: "/c/notifications",
    component:<Notifications/> ,
    isAuthicate: true,
    layout:"/c"
  },
  {
    type: "Change password",
    name: "Change password",
    key: "ChangePassword",
    icon: "",
    route: "/change-password",
    component:<NewPassword/> ,
    isAuthicate: false,
    layout:""
  },
  {
    type: "Data request",
    name: "Data request",
    key: "Data request",
    icon: '',
    image: homeIcon,
    route: "/data-request",
    component: <DataRequest/>,
    isAuthicate: false
  },
];

export default biaRoutes;
