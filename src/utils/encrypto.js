import crypto from "crypto";
import buffer from "buffer";
import { getCookie } from './cookie';


const algorithm = 'aes-256-ctr'
const password = getCookie(process.env.REACT_APP_TOKEN)

export function encrypt(text){ 
 
  let cipher = crypto.createCipher(algorithm,password.token)

  let crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
 export function decrypt(text){ 

  let decipher = crypto.createDecipher(algorithm,password.token)
  let dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');

  console.log('====================================');
  console.log(dec, "decrypt");
  console.log('====================================');
 
  let regexp = /^[0-9a-fA-F]+$/;

  
  if (regexp.test(dec)) {
    alert("hex")
    return dec
  } else {
     alert("Not hex")
    return false
  }
  
}

