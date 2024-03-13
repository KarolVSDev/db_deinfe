import Axios from "axios";
import Cookies from "universal-cookie";


const api = Axios.create({
    baseURL:`${import.meta.env.VITE_API_BACKEND}/api`
})

api.interceptors.request.use(config => {
    const cookie = new Cookies();
    const Token = cookie.get('token')
    if(Token && config.headers){
      config.headers.Authorization = `Bearer ${Token}`;
    }
    return config
  })
  
export {api}