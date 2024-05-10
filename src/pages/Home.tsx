import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { useEffect } from "react";
import { fetchMedia } from "../state/features/homeSlice";
import CardList from "../components/shared/CardList";
import Loading from "../components/shared/Loading";
import Trending from "../components/home/Trending";
import PageWrapper from "../components/shared/PageWrapper";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, trending, recommending, trendingError, recommendingError } =
    useSelector((state: RootState) => state.home);

  // Fetch all Media
  useEffect(() => {
    dispatch(fetchMedia());
  }, [dispatch]);

  // Display Error when fetch fail
  if (recommendingError || trendingError)
    throw new Error("Error Fetching Data");

  return (
    <PageWrapper>
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
