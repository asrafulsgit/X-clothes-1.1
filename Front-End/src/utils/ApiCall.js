import axios from "axios";

export const  apiRequiest = async(method,route,data=null,headers={}) =>{
     try {
          const res = await axios({
               method,
               url :`${import.meta.env.VITE_BACKEND_URL}${route}`,
               data,
               headers
          })
          return res.data;
     } catch (error) {
          console.log('API ERROR : ',error)
          throw error;
     }
}

export const apiRequiestWithCredentials=async(method,route,data=null,headers={}) =>{

     try {
          const res = await axios({
               method,
               url :`${import.meta.env.VITE_BACKEND_URL}${route}`,
               data,
               headers,
               withCredentials : true
          })
          return res.data;
     } catch (error) {
          console.log('API ERROR : ',error)
          throw error;
     }
}