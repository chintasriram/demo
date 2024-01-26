import axios from "axios";

const axiosInstance = axios.create();
//const baseUrl = "https://bia-dev.herokuapp.com/api/"
//const baseUrl = "http://localhost:8080/api/"
const baseUrl = "https://joinbia.com/api/"
const createCreatorUrl = baseUrl + "register/users";
const createCampaignUrl = baseUrl + "campaigns/createCampaign";
const createWaitlistUrl = baseUrl + "register/waitlist";
const loginUrl = baseUrl + "users/login";
const getSmStatisticsUrl = baseUrl + "sm/#userId/insta/statistics";
const connectUrl = baseUrl + "pa/connect";
const calendarConnectUrl = baseUrl + "pa/calendar/connect";
const calendarDisConnectUrl = baseUrl + "pa/calendar/disconnect";
const calendarFullSyncUrl = baseUrl + "pa/calendar/fullsync";
const getUserPlatformsUrl = baseUrl + "pa/platforms"
const getPlatformAnalyticsUrl = baseUrl + "pa/";
const smRegisterUrl = baseUrl + "sm/register"; 
const brandCategoriesUrl = baseUrl+"categories/";
const postBrandCategoriesUrl = baseUrl+"users/profile"; 
const inviteCollaboratorUrl = baseUrl+"users/members/invite";//
const removeCollaboratorUrl = baseUrl+"users/members/remove";
const getUserCollaboratorsUrl = baseUrl+"users/members/#clientId";
const getUserDetailsUrl =baseUrl+"users/#userId"; 
const connectionDisconnectURL =baseUrl+"disconnect/#userId#/#platform#"; 
// const removeSponsoredUrl = baseUrl+"mediakits/#mediakitId#/sponsored/#id#"
const getMediaKitsUrl = baseUrl+"mediakits/all";
const getMediaKitByIdUrl = baseUrl+"mediakits/#id";
const getMediaKitByUrlUrl = baseUrl+"mediakits/url/#url";
const createMediaKitUrl = baseUrl+"mediakits";  
const updateMediakitUrl = baseUrl+"mediakits/#id";
const validateMediaKitPasswordUrl= baseUrl +"mediakits/validate";
const requestMediaKitPasswordUrl= baseUrl +"mediakits/request";
const uploadCoverImageUrl = baseUrl+"mediakits/coverImage/upload";
const getMediakitCampaignsUrl = baseUrl+"campaigns/all"; 
const deleteMediakitCampaignUrl = baseUrl+"campaigns/#id";  
const createMediakitCampaignUrl = baseUrl+"campaigns";  
const getMediakitCampaignByIdUrl = baseUrl+"campaigns/#campaignId";
const getMediaKitFullDetailsById = baseUrl+"campaigns/user/#userId";
const updateCampaignByIdUrl = baseUrl+"campaigns/#campaignId"
const getRatesPackagesUrl = baseUrl+"packages/all"
const createRatePackagesUrl = baseUrl+"packages"
const deleteMediakitRatesPackageUrl = baseUrl+"packages/#id"; 
const updateMediakitPackageByIdUrl = baseUrl+"packages/#packageId"
const getMediakitRatesGiftingUrl = baseUrl+"giftingAddress/all"
const createMediakitRateGiftingUrl = baseUrl+"giftingAddress";  
const deleteMediakitRatesGiftingUrl = baseUrl+"giftingAddress/#id"; 
const updateMediakitRatesGiftingUrl = baseUrl+"giftingAddress/#giftingAddressId"; 
const createRateUrl= baseUrl+"rates"
const editRateUrl= baseUrl+"rates/#id"
const getCampaignTypesUrl = baseUrl+"ms/campaignTypes"
const getAllCampaignsUrl = baseUrl + "campaigns/getAllCampaigns";
const getProjectTypesUrl = baseUrl+"ms/projectTypes"
const uploadImageUrl = baseUrl+"media/image/upload"
const removeImageUrl = baseUrl+"media/image/remove"
const createYoutubeLinksUrl = baseUrl+"plv"
const getYoutubeLinksUrl = baseUrl+"plv/all"
const socialOauthUrl = baseUrl+"#provider#/oauth"
const getSponsoredListUrl = baseUrl+"mediakits/#mediakitId#/sponsored"
const getPlatformVideoListUrl = baseUrl+"platform/videos/latest"
const addSponsoredUrl = baseUrl+"mediakits/#mediakitId#/sponsored"
const removeSponsoredUrl = baseUrl+"mediakits/#mediakitId#/sponsored/#id#"
const addDeadLineUrl = baseUrl+"campaigns/user/#id#/campaignDeadLine/#addDate#"
const getPlannerUrl = baseUrl+"planner/events";
const createPlannerUrl = baseUrl+"planner/";
const deletePlannerUrl = baseUrl+"planner/delete";
const sendProposalUrl = baseUrl+"proposal/"; 
const getUnreadProposalCountUrl  = baseUrl+"proposal/#userId#/unread/count";
const getUnreadProposalsUrl  = baseUrl+"proposal/#userId#/unread";
const updateReadStatusUrl  = baseUrl+"proposal/#userId#/unread/update";
const getAllIncomingProposalsUrl = baseUrl+"proposal/#userId#/incoming";
const getUnreadNotificationsCountUrl  = baseUrl+"notification/#userId#/unread/count";
const getUnreadNotificationsUrl  = baseUrl+"notification/#userId#/unread";
const updateNSReadStatusUrl  = baseUrl+"notification/#userId#/unread/update";
const getAllIncomingNotificationsUrl = baseUrl+"notification/#userId#/incoming";
const resetPasswordUrl = baseUrl+"reset/password";
const updatePasswordUrl=baseUrl+"update/password";
const validateReferralCodeUrl = baseUrl + "users/referralCode/validate";
const verifyUserUrl = baseUrl+"users/verify";
const RefarralUrl = baseUrl + "ms/referralCodes";
const changePassword =baseUrl+"users/password/change"

const $HttpService = {
  setAuthToken: (token) => {
    if (token) {
      //applying token
      axiosInstance.defaults.headers.common['Authorization'] = token; //'Bearer ' + token;
    } else {
      //deleting the token from header
      delete axiosInstance.defaults.headers.common['Authorization'];
      delete axiosInstance.defaults.headers.common['custom'];

    }
  },
  getMediaBaseUrl: (url) => {
    return baseUrl + "media/view/" + url + "?ts=" + Date.now();
  },
  createCreator: (payload) => axiosInstance.post(createCreatorUrl, payload),
  createCampaign: (payload) => axiosInstance.post(createCampaignUrl, payload),
  createWaitlist: (payload) => axiosInstance.post(createWaitlistUrl, payload),

  // Login
  login: (payload) => axiosInstance.post(loginUrl, payload),

  //Referral code post api
  Refarral :(payload) => axiosInstance.post(RefarralUrl, payload),

  //Change Password
  ChangePassword :(payload)=> axiosInstance.post(changePassword, payload),

  //Join Validation
  validateReferralCode: (payload) => axiosInstance.post(validateReferralCodeUrl, payload),

  platformConnect: (payload) => axiosInstance.post(connectUrl, payload),
  calendarConnect: (payload) => axiosInstance.post(calendarConnectUrl, payload),
  calendarFullSync: (payload) => axiosInstance.post(calendarFullSyncUrl, payload),
  getUserPlatforms: (payload) => axiosInstance.post(getUserPlatformsUrl, payload),
  calendarDisConnect: (payload) => axiosInstance.post(calendarDisConnectUrl, payload),

  //SM API's
  getSmStatistics: (userId) => axiosInstance.get(getSmStatisticsUrl.replace('#userId', userId)),
  getPlatformAnalytics: (payload) => axiosInstance.post(getPlatformAnalyticsUrl, payload),

  smLoginOrRegister: (payload) => axiosInstance.post(smRegisterUrl, payload),
  brandCategories: () => axiosInstance.get(brandCategoriesUrl),
  postBrandCategories: (payload) => axiosInstance.post(postBrandCategoriesUrl, payload),
  inviteCollaborator: (payload) => axiosInstance.post(inviteCollaboratorUrl, payload),
  removeCollaborator: (payload) => axiosInstance.post(removeCollaboratorUrl, payload),
  getUserCollaborators: (clientId) => axiosInstance.get(getUserCollaboratorsUrl.replace('#clientId', clientId)),
  getUserDetails: (userId) => axiosInstance.get(getUserDetailsUrl.replace('#userId', userId)),
  connectionDisconnect: (userId, platform) => axiosInstance.get(connectionDisconnectURL.replace('#userId#', userId).replace("#platform#", platform)),
  // removeSponsored: (mediaKitId, id) => axiosInstance.delete(removeSponsoredUrl.replace("#mediakitId#", mediaKitId).replace("#id#", id)),
  

  // mediakits
  getMediaKits: (payload) => axiosInstance.post(getMediaKitsUrl, payload),
  getMediaKitById: (id) => axiosInstance.get(getMediaKitByIdUrl.replace("#id", id)),
  getMediaKitByUrl: (url) => axiosInstance.get(getMediaKitByUrlUrl.replace("#url", url)),
  createMediaKit: (payload) => axiosInstance.post(createMediaKitUrl, payload),
  updateMediakit: (id, payload) => axiosInstance.put(updateMediakitUrl.replace("#id", id), payload),
  validateMediaKitPassword: (payload) => axiosInstance.post(validateMediaKitPasswordUrl, payload),
  requestMediaKitPassword: (payload) => axiosInstance.post(requestMediaKitPasswordUrl, payload),
  getCampaigns: (payload) => axiosInstance.post(getMediakitCampaignsUrl, payload),
  getCampaignsByPagination: (payload, pageNo, pageSize) => axiosInstance.post(getMediakitCampaignsUrl, payload,
    { "params": { "pageNo": pageNo, "pageSize": pageSize } }),
  deleteCampaignById: (id) => axiosInstance.delete(deleteMediakitCampaignUrl.replace('#id', id)),
  createCampaign: (payload) => axiosInstance.post(createMediakitCampaignUrl, payload),
  getCampaignById: (campaignId) => axiosInstance.get(getMediakitCampaignByIdUrl.replace('#campaignId', campaignId)),
  getCampaignFullDetailsById: (userId) => axiosInstance.get(getMediaKitFullDetailsById.replace('#userId', userId)),
  updateCampaignById: (campaignId, payload) => axiosInstance.put(updateCampaignByIdUrl.replace('#campaignId', campaignId), payload),
  uploadCoverImage: (payload) => axiosInstance.post(uploadCoverImageUrl, payload),

  //Mediakit Rates: Packages
  getRatesPackages: (payload) => axiosInstance.post(getRatesPackagesUrl, payload),
  createPackages: (payload) => axiosInstance.post(createRatePackagesUrl, payload),
  deletePackageById: (id) => axiosInstance.delete(deleteMediakitRatesPackageUrl.replace('#id', id)),
  updatePackageById: (packageId, payload) => axiosInstance.put(updateMediakitPackageByIdUrl.replace('#packageId', packageId), payload),

  //Mediakits Rates: gifting address
  getRatesGiftingAddress: (payload) => axiosInstance.post(getMediakitRatesGiftingUrl, payload),
  createRatesGiftingAddress: (payload) => axiosInstance.post(createMediakitRateGiftingUrl, payload),
  deleteRatesGiftingAddressById: (id) => axiosInstance.delete(deleteMediakitRatesGiftingUrl.replace('#id', id)),
  updateRatesGiftingAddressById: (giftingAddressId, payload) => axiosInstance.put(updateMediakitRatesGiftingUrl.replace('#giftingAddressId', giftingAddressId), payload),

  //Rates
  createRate: (payload) => axiosInstance.post(createRateUrl, payload),
  editRate: (id, payload) => axiosInstance.put(editRateUrl.replace("#id", id), payload),

  // Master data API's
  getCampaignTypes: () => axiosInstance.get(getCampaignTypesUrl),
  getAllCampaigns: () => axiosInstance.get(getAllCampaignsUrl),
  getProjectTypes: () => axiosInstance.get(getProjectTypesUrl),

  createYoutubeLinks: (payload) => axiosInstance.post(createYoutubeLinksUrl, payload),
  getYoutubeLinks: (payload) => axiosInstance.post(getYoutubeLinksUrl, payload),

  uploadImage: (payload) => axiosInstance.post(uploadImageUrl, payload),
  removeImage: (imageUrl) => axiosInstance.delete(removeImageUrl + "/" + imageUrl),
  getSocialOauthUrl: () => { return socialOauthUrl; },

  get: (url) => axiosInstance.get(url),

  getSponsoredList: (id) => axiosInstance.get(getSponsoredListUrl.replace("#mediakitId#", id)),
  getPlatformVideoList: (payload) => axiosInstance.post(getPlatformVideoListUrl, payload),
  addSponsored: (id, payload) => axiosInstance.post(addSponsoredUrl.replace("#mediakitId#", id), payload),
  removeSponsored: (mediaKitId, id) => axiosInstance.delete(removeSponsoredUrl.replace("#mediakitId#", mediaKitId).replace("#id#", id)),
  addDeadLine: (id, addDate) => axiosInstance.post(addDeadLineUrl.replace("#id#", id).replace("#addDate#", addDate)),
  //calendar 
  getPlanner:(payload)=>axiosInstance.post(getPlannerUrl,payload),
  createPlannerEvent:(payload)=>axiosInstance.post(createPlannerUrl,payload),
  deletePlannerEvent:(payload)=>axiosInstance.post(deletePlannerUrl,payload),
  sendProposal:(payload)=>axiosInstance.post(sendProposalUrl,payload),
  getUnreadProposalCount:(userId)=>axiosInstance.post(getUnreadProposalCountUrl.replace("#userId#",userId)),
  getUnreadProposals:(userId)=>axiosInstance.post(getUnreadProposalsUrl.replace("#userId#",userId)),
  updateReadStatus:(userId)=>axiosInstance.post(updateReadStatusUrl.replace("#userId#",userId)),
  getAllIncomingProposals:(userId)=>axiosInstance.post(getAllIncomingProposalsUrl.replace("#userId#",userId)),
  getUnreadNotificationsCount:(userId)=>axiosInstance.post(getUnreadNotificationsCountUrl.replace("#userId#",userId)),
  getUnreadNotifications:(userId)=>axiosInstance.post(getUnreadNotificationsUrl.replace("#userId#",userId)),
  updateNSReadStatus:(userId)=>axiosInstance.post(updateNSReadStatusUrl.replace("#userId#",userId)),
  getAllIncomingNotifications:(userId)=>axiosInstance.post(getAllIncomingNotificationsUrl.replace("#userId#",userId)),
  resetPassword:(payload)=>axiosInstance.post(resetPasswordUrl, payload),
  updatePassword:(payload)=>axiosInstance.post(updatePasswordUrl, payload),
  verifyUser: (payload)=>axiosInstance.post(verifyUserUrl, payload)
}
export default $HttpService;