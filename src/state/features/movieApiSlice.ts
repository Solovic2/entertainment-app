import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import requests from "../../api/requests";
import { ApiMovie, ApiPayload } from "../../types";
export const movieApiSlice = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzhhODY5NTdjMGUwNTYyMmU1NDgxNjY4YjJhZTEwOCIsInN1YiI6IjY1ODE0OWI5MDA1MDhhMDlhNTE2MWJiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xpNVfvHot6tvSygGl653pCIQIY_hNZqmjWlyF4Z_ar0",
    },
  }),
  tagTypes: ["movie"],
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (search?: string) => {
        if (search) {
          return {
            url: requests.fetchSearchMovies,
            params: {
              query: search,
              include_adult: "false",
              language: "en-US",
              page: "1",
            },
          };
        } else {
          return {
            url: requests.fetchMovies,
          };
        }
      },
      transformResponse: (res: ApiPayload) =>
        res.results.map((item: ApiMovie) => {
          return { ...item, movie_type: "movie" };
        }),
      providesTags: ["movie"],
    }),
  }),
});

export const { useGetMoviesQuery } = movieApiSlice;
