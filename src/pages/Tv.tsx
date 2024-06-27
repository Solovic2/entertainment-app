import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { useEffect } from "react";
import CardList from "../components/shared/CardList";
import Loading from "../components/shared/Loading";
import { useSearchParams } from "react-router-dom";
import { fetchTvMedia } from "../state/features/tvSlice";
import PageWrapper from "../components/shared/PageWrapper";
import Pagination from "../components/shared/Pagination";
import { toast } from "react-toastify";

const Tv = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, movieList, currentPage, totalPages, error } = useSelector(
    (state: RootState) => state.tv
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
    if (!searchParams.get("q") && !error) {
      dispatch(fetchTvMedia(page));
    }
    if (error) toast.error(error);
  }, [dispatch, searchParams, page, error]);

  return (
    <PageWrapper placeholder="Search for tv series">
      {loading ? (
        <Loading />
      ) : (
        <>
          <CardList title="TV Series" movieList={movieList} />
          {movieList.length > 0 && (
            <Pagination
              totalPages={pageCount}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              dataTestId="search-pagination"
            />
          )}
        </>
      )}
    </PageWrapper>
  );
};

export default Tv;
