import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3", // Replace with your API base URL
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzhhODY5NTdjMGUwNTYyMmU1NDgxNjY4YjJhZTEwOCIsInN1YiI6IjY1ODE0OWI5MDA1MDhhMDlhNTE2MWJiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xpNVfvHot6tvSygGl653pCIQIY_hNZqmjWlyF4Z_ar0",
  },
});

export default instance;
