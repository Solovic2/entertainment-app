import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import requests from "../../api/requests";
import { ApiPayload } from "../../types";
export const homeApiSlice = createApi({
  reducerPath: "HomeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzhhODY5NTdjMGUwNTYyMmU1NDgxNjY4YjJhZTEwOCIsInN1YiI6IjY1ODE0OWI5MDA1MDhhMDlhNTE2MWJiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xpNVfvHot6tvSygGl653pCIQIY_hNZqmjWlyF4Z_ar0",
    },
  }),
  tagTypes: ["home"],
  endpoints: (builder) => ({
    getTrending: builder.query({
      query: () => requests.fetchTrending,
      transformResponse: (res: ApiPayload) => {
        return {
          trending: res.results.slice(0, 5),
          recommending: res.results.slice(-15),
        };
      },
      providesTags: ["home"],
    }),
    getSearchResults: builder.query({
      query: (search: string) => ({
        url: requests.fetchSearchHome,
        params: {
          query: search,
          include_adult: "false",
          language: "en-US",
          page: "1",
        },
      }),
      transformResponse: (res: ApiPayload) => res.results,
      providesTags: ["home"],
    }),
  }),
});

export const { useGetTrendingQuery, useGetSearchResultsQuery } = homeApiSlice;
