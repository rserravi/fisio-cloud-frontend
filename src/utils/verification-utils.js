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
// TODO: LA VERIFICACION DE MOBILES ESTÁ DANDO PROBLEMAS
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
    const homephone= (frmData.homephone && frmData.homephone !=="" && validator.isMobilePhone(frmData.homephone));
    const mobilephone= (frmData.mobilephone && frmData.mobilephone !=="" && validator.isMobilePhone(frmData.mobilephone));
    required.phone = true;
    return required;
}

// Comprueba si es un DNI correcto (entre 5 y 8 letras seguidas de la letra que corresponda).

// Acepta NIEs (Extranjeros con X, Y o Z al principio)
export function validateDNI(dni) {
    var numero, leti, letra;
    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

    dni = dni.toUpperCase();

    if(expresion_regular_dni.test(dni) === true){
        numero = dni.substr(0,dni.length-1);
        numero = numero.replace('X', 0);
        numero = numero.replace('Y', 1);
        numero = numero.replace('Z', 2);
        leti = dni.substr(dni.length-1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero+1);
        if (letra !== leti) {
            //alert('Dni erroneo, la letra del NIF no se corresponde');
            return false;
        }else{
            //alert('Dni correcto');
            return true;
        }
    }else{
        //alert('Dni erroneo, formato no válido');
        return false;
    }
}