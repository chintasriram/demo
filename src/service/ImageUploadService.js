import httpService from "service/HttpService";
const getFileExtension = (filename) => {
  // get file extension
  const extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length);
  return extension;
}
const $ImageUploadService = { 
  upload: (file,userId,name,callback) => {
    if (file) {
      const formData = new FormData();
        formData.append('file', file); 
        formData.append('userId', userId); 
        formData.append('name',name+"."+getFileExtension(file.name));
        httpService.uploadImage(formData)
            .then(res => {
                  callback(res.data.data); 
            }) 
    }
  },
  uploadCoverImage: (file,mediaKitId,callback) => {
    if (file) {
      const formData = new FormData();
        formData.append('file', file);   
        formData.append('mediaKitId',mediaKitId);
        formData.append('name',"cr."+getFileExtension(file.name));
        httpService.uploadCoverImage(formData)
            .then(res => {
                  callback(res.data.data); 
            }) 
    }
  },
  remove:(key) => {
    
  },
  
};
export default $ImageUploadService;
