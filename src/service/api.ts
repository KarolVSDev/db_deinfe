import Axios from "axios";
import Cookies from "universal-cookie";
import env from "./env";


const api = Axios.create({
    baseURL:`${env.API_URL}`
})

api.interceptors.request.use(config => {
    const cookie = new Cookies();
    const Token = cookie.get('focusToken')
    if(Token && config.headers){
      config.headers.Authorization = `Bearer ${Token}`;
    }
    return config
  })
  
export {api}