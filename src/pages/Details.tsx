import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../state/store";
import {
  fetchSimilarMedia,
  fetchSpecificMedia,
} from "../state/features/detailsSlice";
import { basic_imageUrl } from "../constants";
import Button from "../components/shared/Button";
import CardList from "../components/shared/CardList";
import Loading from "../components/shared/Loading";
import movieTrailer from "movie-trailer";
import Expanded from "../components/Details/Expanded";
import ReactModal from "../components/shared/Modal";
import { toast } from "react-toastify";

const Details = () => {
  const { type, id } = useParams();
  const [trailerUrl, setTrailerUrl] = useState<string>("");
  const [trailerErr, setTrailerError] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const { loading, movieDetails, similarMovie, detailError } = useSelector(
    (state: RootState) => state.details
  );

  // Movie Image
  const image: string = movieDetails.backdrop_path
    ? basic_imageUrl + movieDetails.backdrop_path
    : movieDetails.poster_path
    ? basic_imageUrl + movieDetails.poster_path
    : "/assets/placeholder-image.png";

  // Handle Trailer
  const showTrailer = () => {
    if (trailerUrl) setTrailerUrl("");
    else {
      movieTrailer(
        movieDetails?.name ||
          movieDetails?.original_name ||
          movieDetails?.title ||
          movieDetails?.original_title ||
          ""
      )
        .then((url: string | URL) => {
          if (url) {
            const urlParams:
              | string
              | URLSearchParams
              | string[][]
              | Record<string, string>
              | undefined = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v")!);
          } else {
            setTrailerError("Trailer not Found for this " + type);
          }
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            setTrailerError("Trailer not Found for this " + type);
          }
        });
    }
  };

  useEffect(() => {
    if (!trailerErr && !detailError) {
      dispatch(fetchSpecificMedia({ type: type, id: id })).then(() =>
        dispatch(fetchSimilarMedia({ type: type, id: id }))
      );
    }
    if (trailerErr) toast.error(trailerErr);
    if (detailError) toast.error(detailError);
  }, [type, id, dispatch, trailerErr, detailError]);

  if (loading) return <Loading />;
  return (
    <div className=" md:p-8 md:ml-24 w-full" data-test-id="movie-details">
      <div
        className=" bg-cover bg-center h-[448px] shadow-inner bg-opacity-50 rounded-md"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`,
        }}
      >
        <div className="pt-[70px] md:pt-[80px] ml-8 max-w-[250px] md:max-w-[450px] opacity-100 ">
          <div className="flex gap-2 flex-wrap select-none mb-1">
            {movieDetails?.genres.map((element) => {
              return (
                <div
                  key={element.id}
                  className="px-2 py-1 text-sm text-white bg-primaryRed rounded-full font-outfitMedium"
                >
                  {element.name}
                </div>
              );
            })}
          </div>
          <div className="mb-5 text-2xl md:text-4xl lg:text-5xl font-bold break-word  ">
            {movieDetails.title || movieDetails.name}
          </div>
          <div
            className="w-28 mb-5 font-bold"
            data-test-id="play-button"
            onClick={showTrailer}
          >
            <Button name="Play" />
          </div>
          <Expanded text={movieDetails.overview} />
        </div>
      </div>

      {trailerUrl !== "" && (
        <ReactModal setTrailerUrl={setTrailerUrl}>
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailerUrl}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </ReactModal>
      )}
      <div className="p-4">
        <CardList title="Similar" movieList={similarMovie} />
      </div>
    </div>
  );
};

export default Details;
