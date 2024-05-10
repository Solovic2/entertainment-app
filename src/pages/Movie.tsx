import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { useEffect } from "react";
import { fetchMovieMedia } from "../state/features/movieSlice";
import CardList from "../components/shared/CardList";
import Loading from "../components/shared/Loading";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "../components/shared/PageWrapper";
import Pagination from "../components/shared/Pagination";

const Movies = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, movieList, error, currentPage, totalPages } = useSelector(
    (state: RootState) => state.movies
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const page: number = Number(searchParams.get("page")) || 1;
  const pageCount = totalPages < 500 ? totalPages : 500;

  const handlePageChange = (selectedItem: { selected: number }) => {
    const value = selectedItem.selected + 1;
    if (value === 1) setSearchParams({}, { replace: true });
    else setSearchParams({ page: value.toString() }, { replace: true });
  };

  useEffect(() => {
    if (!searchParams.get("q")) dispatch(fetchMovieMedia(page));
  }, [dispatch, searchParams, page]);

  // Display Error when fetch fail
  if (error) throw new Error(error);

  return (
    <PageWrapper placeholder="Search for movies">
      {loading ? (
        <Loading />
      ) : (
        <>
          <CardList title="Movie Series" movieList={movieList} />
          <Pagination
            totalPages={pageCount}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            dataTestId="search-pagination"
          />
        </>
      )}
    </PageWrapper>
  );
};

export default Movies;
