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