// Simple utility/factory for web storage
// all data storing operations must use this service to set data into storage
// usage is similar to HttpService
const storage = window.sessionStorage; // interface to switch from session/local storages

export default {
  setItem: (key, val) => storage.setItem(key, val),
  getItem: key => storage.getItem(key)
};
