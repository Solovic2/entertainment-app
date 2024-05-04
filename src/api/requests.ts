const requests = {
  createRequestToken: "/authentication/token/new",
  validateRequestToken: "/authentication/token/validate_with_login",
  createSessionId: "/authentication/session/new",
  fetchTrending: `/trending/all/day?language=en-US`,
  fetchSearchHome: `/search/multi`,
  fetchMovies: `/movie/popular`,
  addFavorite: `/account/${import.meta.env.VITE_ACCOUNT_ID}/favorite`,
  fetchFavoriteMovies: `/account/${
    import.meta.env.VITE_ACCOUNT_ID
  }/favorite/movies`,
  fetchFavoriteTV: `/account/${import.meta.env.VITE_ACCOUNT_ID}/favorite/tv`,
  fetchSearchMovies: `/search/movie`,
  fetchTV: `/tv/popular`,
  fetchSearchTV: `/search/tv`,
};
export default requests;
