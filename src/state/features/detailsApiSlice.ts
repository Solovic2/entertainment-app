import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDetails, ApiMovie } from "../../types";

interface detailsType {
  type: string;
  id: string;
}
interface DetailsData {
  detailsResult: ApiDetails;
  similarResults: ApiMovie[];
}
export const detailsApiSlice = createApi({
  reducerPath: "detailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzhhODY5NTdjMGUwNTYyMmU1NDgxNjY4YjJhZTEwOCIsInN1YiI6IjY1ODE0OWI5MDA1MDhhMDlhNTE2MWJiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xpNVfvHot6tvSygGl653pCIQIY_hNZqmjWlyF4Z_ar0",
    },
  }),
  tagTypes: ["details"],
  endpoints: (builder) => ({
    getDetails: builder.query<DetailsData, detailsType>({
      queryFn: async (
        _arg,
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ): Promise<any> => {
        const detailsResultResponse = await fetchWithBQ({
          url: `/${_arg.type}/${_arg.id}`,
          params: {
            language: "en-US",
          },
        });
        const detailsResult = detailsResultResponse.data as ApiDetails;
        const similarResultsResponse: any = await fetchWithBQ({
          url: `/${_arg.type}/${_arg.id}/similar`,
          params: {
            language: "en-US",
          },
        });
        const similarResults = similarResultsResponse?.data?.results.map(
          (element: ApiMovie) => {
            return { ...element, movie_type: _arg.type };
          }
        ) as ApiMovie[];

        return {
          data: {
            detailsResult,
            similarResults,
          },
        };
      },
    }),
  }),
});

export const { useGetDetailsQuery } = detailsApiSlice;
