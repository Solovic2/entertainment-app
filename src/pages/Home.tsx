import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { useEffect } from "react";
import { fetchMedia } from "../state/features/homeSlice";
import CardList from "../components/shared/CardList";
import Loading from "../components/shared/Loading";
import Trending from "../components/home/Trending";
import PageWrapper from "../components/shared/PageWrapper";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, trending, recommending, recommendingError, trendingError } =
    useSelector((state: RootState) => state.home);

  // Fetch all Media
  useEffect(() => {
    if (!recommendingError && !trendingError) {
      dispatch(fetchMedia());
    }
    if (recommendingError) toast.error(recommendingError);
    if (trendingError) toast.error(trendingError);
  }, [dispatch, recommendingError, trendingError]);

  return (
    <PageWrapper placeholder="Search for movies or tv series">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Trending movieList={trending} />
          <CardList title="Recommended for you" movieList={recommending} />
        </>
      )}
    </PageWrapper>
  );
};

export default Home;
