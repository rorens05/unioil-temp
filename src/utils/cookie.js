import Cookies from "universal-cookie";
import CryptoJSEncUtf8 from "crypto-js/enc-utf8";
import CryptoJSAES from "crypto-js/aes";

export const COOKIE_NAME = "FRONT_END_REST";
const PUBLIC_KEY = "PUBLIC_00001";
const timeOut = 60;
const cookies = new Cookies();

export function setCookie(params, name = COOKIE_NAME) {
  Date.prototype.addHours = function(h) {
    this.setHours(this.getHours() + h);
    return this;
  }

  let expiration = new Date().addHours(timeOut);
  let options = { path: '/', expires: expiration };

  try {
    if (params instanceof Object) {
      cookies.set(name.toUpperCase(), CryptoJSAES.encrypt(JSON.stringify(params), PUBLIC_KEY).toString(), options);
    } else {
      throw new TypeError('setCookie params should be object type.', "utils/cookies.js", 20);
    }
  } catch(e) {
    console.error(e);
  }
  
  return true;
}

export function getCookie(name = COOKIE_NAME) {
  let ctext = cookies.get(name.toUpperCase());

  if (!ctext)
      return undefined; 

  try {
      let bytes  = CryptoJSAES.decrypt(ctext.toString(), PUBLIC_KEY);
      return JSON.parse(bytes.toString(CryptoJSEncUtf8));
  } catch (e) {
      return undefined; 
  }
}

export function removeCookie(name = COOKIE_NAME) {
  cookies.remove(name, { path: '/' });
  return true;
}