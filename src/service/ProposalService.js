import httpService from "service/HttpService"; 
import userService from "service/UserService"; 
const $ProposalService = { 
  sendProposal: (payload,callback) => {  
      httpService.sendProposal(payload).then((res) => {  
        callback(res?.data?.data);
    }) 
  },  
  getUnreadProposalCount:(callback) => {
    let user = userService.getUserFromSession(); 
    httpService.getUnreadProposalCount(user.id).then((res) => {  
      if (res !== undefined && res?.data !== undefined && res?.data?.success === true) {
          callback(res?.data?.data);
      } else {
        callback(0);
      }
    }).catch(error => {
      callback(0);
    })
  },
  getUnreadProposals:(callback) => {
    let user = userService.getUserFromSession(); 
    httpService.getUnreadProposals(user.id).then((res) => {  
      callback(res?.data?.data); 
    }).catch(error => {
      callback([]);
    })
  },
  updateReadStatus:(callback)=>{
    let user = userService.getUserFromSession(); 
    httpService.updateReadStatus(user.id).then((res) => {  
      callback(0); 
    }).catch(error => {
      callback(0);
    })
  },
  getAllIncomingProposals:(callback) => {
    let user = userService.getUserFromSession(); 
    httpService.getAllIncomingProposals(user.id).then((res) => {  
      callback(res?.data?.data); 
    }).catch(error => {
      callback([]);
    })
  },
};
export default $ProposalService;
