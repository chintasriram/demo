import React from "react";
import  { useState} from "react";


const PreviewImage = ({file}) => {
    const[preview, setPreview]= React.useState("");
    const reader = new FileReader();
    if(file){
  reader.readAsDataURL(file);
    reader.onload =() => {
        setPreview(reader.result)
    }}
    return(
        <div>
            {preview ? <img src={preview} alt="preview" height={50} width={50}/> :"loading..."}
        </div>
    )
}
export default PreviewImage;