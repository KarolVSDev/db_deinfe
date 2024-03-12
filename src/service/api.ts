import Axios from "axios";
import Cookies from "universal-cookie";


const api = Axios.create({
    baseURL:`${process.env.REACT_APP_API_BACKEND}`
})

api.interceptors.request.use(config => {
    const cookie = new Cookies();
    const Token = cookie.get('token')
    console.log(process.env)
    if(Token && config.headers){
      config.headers.Authorization = `Bearer ${Token}`;
    }
    return config
  })
  
export {api}