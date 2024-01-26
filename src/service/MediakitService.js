import httpService from "service/HttpService"; 
 
const $MediakitService = { 
  updateMediakit : (id, payload, successCallback, errorCallback) => { 
    httpService.updateMediakit(id, payload).then((res) => {
        if(res?.data){
            successCallback(res.data);
        }
    }).catch((error) => {
        errorCallback();
    })
  }
};
export default $MediakitService;
