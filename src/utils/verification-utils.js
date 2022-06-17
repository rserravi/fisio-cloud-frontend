import React from "react";
import validator from 'validator';

export const SignUpValidator(frmdata) =>{
    const emailvalidated= validator.isEmail(frmdata.email);
    const machedPass = validator.equals(frmdata.password, frmdata.machedPass);
    var message = "";
    
    if (emailvalidated && machedPass){
        message =  {
            "status" : "success",
            "message": "All Matched"
        }
    }
    if (!emailvalidated){
        message = {
            "status": "error",
            "message": "Incorrect email"
        }
    }

    if (!machedPass){
        message = {
            "status": "error",
            "message": "Passwords dont match"
        }
    }

    if (!emailvalidated && !machedPass){
        message = {
            "status": "error",
            "message": "Incorrect email and Passwords dont match"
        }
    }


}