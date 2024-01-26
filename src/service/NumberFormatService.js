
const NumberFormatService = {
  format: (num) => { 
    if(!num || num==0 || num==="") return "0";
    return Math.abs(num) >= 1.0e+9 
      ? (Math.abs(num) / 1.0e+9).toFixed(1).replace(/\.0$/, '') + "B"
      // Six Zeroes for Millions 
      : Math.abs(num) >= 1.0e+6 
        ? (Math.abs(num) / 1.0e+6).toFixed(1).replace(/\.0$/, '') + "M"
        // Three Zeroes for Thousands
        : Math.abs(num) >= 1.0e+3 
          ? (Math.abs(num) / 1.0e+3).toFixed(1).replace(/\.0$/, '') + "K" 
          : Math.abs(num);
  },
  convertPercentage: (num) => { 
    if(!num || num==0 || num==="") return "0"; 
    if(num.includes("%")) return num;
    return (Math.abs(num) >= 1.0e+9 
      ? (Math.abs(num) / 1.0e+9).toFixed(2).replace(/\.00$/, '') + "B"
      // Six Zeroes for Millions 
      : Math.abs(num) >= 1.0e+6 
        ? (Math.abs(num) / 1.0e+6).toFixed(2).replace(/\.00$/, '') + "M"
        // Three Zeroes for Thousands
        : Math.abs(num) >= 1.0e+3 
          ? (Math.abs(num) / 1.0e+3).toFixed(2).replace(/\.00$/, '') + "K" 
          : Math.abs(num).toFixed(2).replace(/\.00$/, ''))+"%";  
  },
  convertPriceToUSDFormat: (price) => {  
    let formattedPrice = "";
    price = parseFloat(price)
    if(price !== null && price>0){
      //Convert price to USD formatted price
      formattedPrice = price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      formattedPrice = formattedPrice?.replace(/\.00$/, '');
    }
    return formattedPrice;
  }
};
export default NumberFormatService;
