import axios from "axios"
const axiosInstance=axios.create({
    baseURL:"https://manage-stock-api-radhia-rahmani.vercel.app/",
    withCredentials:true,
    credential:"include",
    headers:{
        "Content-Type":"application/json",

       
    }
})
export default axiosInstance;