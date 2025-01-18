import axios from "axios";

const BASE_URL = process.env.API_PHOTO_ENDPIONT;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
  },
});

export default axiosInstance;
