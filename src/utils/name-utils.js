export const nameInitial= (name) =>{

    try {
        const val = ""+ name.replace(/\s/g,'');
        return val[0].toUpperCase()+".";
    } catch (error) {
        console.log(error.error);
    }
   
}
