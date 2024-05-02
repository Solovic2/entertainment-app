import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../state/store";
import { fetchSpecificMedia } from "../state/features/detailsSlice";
import { basic_imageUrl } from "../constants";
import Button from "../components/ui/Button";
import CardList from "../components/ui/CardList";
import Loading from "../components/ui/Loading";
import YouTube, { YouTubeProps } from "react-youtube";
import movieTrailer from "movie-trailer";
import { toast } from "react-toastify";
const Details = () => {
  const { type, id } = useParams();
  const [trailerUrl, setTrailerUrl] = useState<string>("");
  const [trailerErr, setTrailerError] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const { loading, movieDetails, similarMovie, detailError } = useSelector(
    (state: RootState) => state.details
  );
  const page = {
    type: type!,
    id: id!,
  };
  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

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
            const urlParams: Record<string, any> = new URLSearchParams(
              new URL(url).search
            );
            console.log(urlParams.get("v"));

            setTrailerUrl(urlParams.get("v"));
          } else {
            setTrailerError("Trailer not Found for this " + type);
          }
        })
        .catch((error: any) => {
          if (error instanceof Error) {
            setTrailerError("Trailer not Found for this " + type);
          }
        });
    }
  };
  useEffect(() => {
    if (detailError) toast.error(detailError);
    if (trailerErr) toast.error(trailerErr);
  }, [detailError, trailerErr]);

  useEffect(() => {
    dispatch(fetchSpecificMedia(page));
  }, [type, id]);

  if (loading) return <Loading />;
  return (
    <div className="p-4 md:p-8 md:ml-16 w-full  ">
      <div
        className="bg-cover bg-center h-[448px] shadow-inner bg-opacity-80 "
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${basic_imageUrl}${movieDetails.backdrop_path})`,
        }}
      >
        <div className="pt-[100px] md:pt-[140px] ml-8 max-w-[250px] md:max-w-[450px]">
          <div className="mb-5 text-[32px] md:text-4xl lg:text-5xl font-bold break-word ">
            {movieDetails.title || movieDetails.name}
          </div>
          <div className="w-28 mb-5 font-bold" onClick={showTrailer}>
            <Button name="Play" />
          </div>
          <p className="h-20 max-w-[300px] md:max-w-[450px] md:leading-[1.3] text-sm w-[45rem] break-words ">
            {movieDetails.overview}
          </p>
        </div>
      </div>
      {trailerUrl !== "" && (
        <YouTube videoId={trailerUrl} opts={opts} className="mt-5" />
      )}
      <CardList title="Similar" movieList={similarMovie} />
    </div>
  );
};

export default Details;
