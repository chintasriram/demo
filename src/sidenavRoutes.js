// @mui icons
import Home from "pages/home";
import HomeIcon from "assets/images/icons/svg/medium/HomeIcon.svg"
import MarketPlaceIcon from "assets/images/icons/svg/medium/MarketPlaceIcon.svg"
import CampaignsIcon from "assets/images/icons/svg/medium/CampaignsIcon.svg"
import ProposalsIcon from "assets/images/icons/svg/medium/ProposalsIcon.svg"
import PlanningIcon from "assets/images/icons/svg/medium/PlanningIcon.svg"
import MediakitIcon from "assets/images/icons/svg/medium/MediakitIcon.svg"
import PaymentsIcon from "assets/images/icons/svg/medium/PaymentsIcon.svg"
import Marketplace from "pages/marketPlace";
import Campaigns from "pages/campaigns";
import Proposals from "pages/proposals";
import Planning from "pages/planning";
import Payments from "pages/payments";
import MediaKits from "pages/MediaKits";

const biaRoutes = [
  {
    type: "collapse",
    name: "Home",
    key: "c/home",
    icon: '',
    image: HomeIcon,
    route: "/c/home",
    component: <Home />,
    layout:"/c"
  },
  {
    type: "collapse",
    name: "Marketplace",
    key: "c/marketplace",
    icon: '',
    image: MarketPlaceIcon,
    route: "/c/marketplace",
    component: <Marketplace />,
    layout:"/c"
  },
  {
    type: "collapse",
    name: "Campaigns",
    key: "c/campaigns",
    icon: '',
    image: CampaignsIcon,
    route: "/c/campaigns",
    component: <Campaigns />,
    layout:"/c"
  },
  {
    type: "collapse",
    name: "Proposals",
    key: "c/proposals",
    icon: '',
    image: ProposalsIcon,
    route: "/c/proposals",
    component: <Proposals/>,
    layout:"/c"
  },
  {
    type: "collapse",
    name: "Planning",
    key: "c/planning",
    icon: '',
    image: PlanningIcon,
    route: "/c/planning",
    component: <Planning />,
    layout:"/c"
  },
  {
    type: "collapse",
    name: "Media Kit",
    key: "c/media-kit",
    icon: '',
    image: MediakitIcon,
    route: "/c/media-kit",
    component: <MediaKits/>,
    layout:"/c"
  },
  {
    type: "collapse",
    name: "Payments",
    key: "c/payments",
    icon: '',
    image: PaymentsIcon,
    route: "/c/payments",
    component: <Payments />,
    layout:"/c"
  }
];

export default biaRoutes;
