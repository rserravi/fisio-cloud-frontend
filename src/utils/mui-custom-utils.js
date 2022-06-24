import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import React from 'react';
 
 export const paperColor = (inbound) =>{
    let back = ""
    let front = ""
    switch (inbound) {
      case "unknown":
        back = "rosybrown";
        front = "white"
        break;
      case "lead":
        back = "khaki";
        front = "dimgray"
      break;
      case "customer":
        back = "dodgerblue";
        front = "white"
      break;
      case "passive":
        back = "darkred";
        front = "white"
      break;
    
      default:
        back = "yellow"
        front = "white"
        break;
    }
    return {
      "back" : back,
      "front": front
    }
  }

export const GenderIcon = (props) =>{
  if (props.name === "male"){
     return <React.Fragment><MaleIcon /></React.Fragment>
  }
  if (props.name === "female"){
    return <React.Fragment><FemaleIcon /></React.Fragment>
 }
 return <React.Fragment><TransgenderIcon /></React.Fragment>
}