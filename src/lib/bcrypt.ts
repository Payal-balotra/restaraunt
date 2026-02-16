
import bcrypt from "bcrypt";

export const hashPassword = (password : any) =>{
   return bcrypt.hash(password, 10);
  
}

export const comparePassword = (passwordTo : any, passwordBy : any) =>{
    return bcrypt.compare(passwordTo, passwordBy);
}