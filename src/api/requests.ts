const requests = {
  createRequestToken: "/authentication/token/new",
  createSessionId: "/authentication/session/convert/4",
  fetchTrending: `/trending/all/day?language=en-US`,
  fetchSearchHome: `/search/multi`,
  fetchMovies: `/movie/popular`,
  fetchSearchMovies: `/search/movie`,
  fetchTV: `/tv/popular`,
  fetchSearchTV: `/search/tv`,
};
export default requests;
