import axios from "axios";
export default axios.create({
    baseURL: 'http://localhost:3006',
    // baseURL: 'https://car-rent-back.vercel.app',
})