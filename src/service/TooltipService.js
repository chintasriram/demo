const tooltips = {
  instagram: {
    followers: {
      value: "Total Followers",
      subvalue: "New followers in the last 30 days",
    },
    engagement: {
      value: "Engagement over the last 20 posts",
      subvalue: "",
    },
    views: {
      value: "Over last 30 days",
      subvalue: "Views versus previous 30 day period",
    },
    chats: {
      value: "Numbers reflect the entire history of the account.",
    },
  },
  youtube: {
    followers: {
      value: "Subscribers",
      subvalue: "New subscribers in the last 30 days",
    },
    engagement: {
      value: "Engagement in the last 30 days",
      subvalue:"",
    },
    views: {
      value: "Total Views",
      subvalue: "Views in the last 30 days",
    },
    
    chats: {
      value: "Over last 30 days",
    },
    
  },
  tiktok: {
    followers: {
      value: "Total Followers",
      subvalue: "",
    },
    engagement: {
      value: "Engagement over the last 20 videos",
      subvalue:"",
    },
    views: {
      value: "Total Likes",
      subvalue: "",
    },
   
    chats: {
      value: "",
    },

  },

};


const TooltipService = {


  
  getTooltip: (platform,valueType) => {
    if(tooltips[platform]){ 
      return tooltips[platform][valueType];
      }else{
        return tooltips.default;
      }
  },

  
};
export default TooltipService;
