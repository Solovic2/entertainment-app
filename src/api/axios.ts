import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3", // Replace with your API base URL
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_ACCESS_TOKEN,
  },
});

export default instance;
