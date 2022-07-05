import validator from 'validator';

export const SignUpValidator = (frmdata) =>{
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
    return message
}

export const EmailValidation = (email) =>{
    return validator.isEmail(email);
}

export const ShortTextValidation = (text, minChars) => {
    const val = (text.length >= minChars)
    console.log(val);
    return val
}

export const LongTextValidation = (text, maxChars) => {
    return (text.length <= maxChars)
}

export const PhoneVerification = (text) => {
    return (validator.isMobilePhone(text))
}

export const CustomerValidation = (frmData) =>{
    const required = {
        firstname : false,
        lastname : false,
        email: false,
        phone: false,
    }

    required.firstname = frmData.firstname !=="";
    required.lastname = frmData.lastname !=="";
    required.email = (validator.isEmail(frmData.emailhome) || validator.isEmail(frmData.emailwork));
    const homephone= (frmData.homephone !=="" && validator.isMobilePhone(frmData.homephone));
    const mobilephone= (frmData.mobilephone !=="" && validator.isMobilePhone(frmData.mobilephone));
    required.phone = homephone || mobilephone;
    return required;
}