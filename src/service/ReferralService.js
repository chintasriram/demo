import httpService from "service/HttpService"; 
 
const $ReferralService = { 
  createReferralCode: (payload,successCallback,errorCallback) => {  
    httpService.Refarral(payload).then((res) => {
      successCallback(res?.data);
    }).catch((error) => {
      errorCallback(error)
    });
  }
};
export default $ReferralService;
