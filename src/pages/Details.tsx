import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { basic_imageUrl } from "../constants";
import Button from "../components/ui/Button";
import CardList from "../components/ui/CardList";
import Loading from "../components/ui/Loading";
import YouTube, { YouTubeProps } from "react-youtube";
import movieTrailer from "movie-trailer";
import { toast } from "react-toastify";
import { useGetDetailsQuery } from "../state/features/detailsApiSlice";
const Details = () => {
  const { type, id } = useParams();
  const [trailerUrl, setTrailerUrl] = useState<string>("");
  const [trailerErr, setTrailerError] = useState("");
  const page = {
    type: type!,
    id: id!,
  };
  const { data, error, isLoading } = useGetDetailsQuery(page);
  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  if (!data) return <>No Data</>;
  const { detailsResult, similarResults } = data;

  const image: string = detailsResult.backdrop_path
    ? basic_imageUrl + detailsResult.backdrop_path
    : detailsResult.poster_path
    ? basic_imageUrl + detailsResult.poster_path
    : "/assets/placeholder-image.png";

  const showTrailer = () => {
    if (trailerUrl) setTrailerUrl("");
    else {
      movieTrailer(
        detailsResult?.name ||
          detailsResult?.original_name ||
          detailsResult?.title ||
          detailsResult?.original_title ||
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
  if (isLoading) return <Loading />;
  if (error) return <>Error Occur</>;
  return (
    <div className="p-4 md:p-8 md:ml-16 w-full  ">
      <div
        className="bg-cover bg-center h-[448px] shadow-inner bg-opacity-80 "
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${image})`,
        }}
      >
        <div className="pt-[70px] md:pt-[100px] ml-8 max-w-[250px] md:max-w-[450px]">
          <div className="flex gap-2 flex-wrap select-none mb-1">
            {detailsResult.genres.map((element) => {
              return (
                <div
                  key={element.id}
                  className="px-2 py-1 text-sm text-white bg-primaryRed rounded-full"
                >
                  {element.name}
                </div>
              );
            })}
          </div>
          <div className="mb-5 text-[32px] md:text-4xl lg:text-5xl font-bold break-word ">
            {detailsResult.title || detailsResult.name}
          </div>
          <div className="w-28 mb-5 font-bold" onClick={showTrailer}>
            <Button name="Play" />
          </div>
          <p className="h-20 max-w-[300px] md:max-w-[450px] md:leading-[1.3] text-sm w-[45rem] break-words  ">
            {detailsResult.overview}
          </p>
        </div>
      </div>
      {trailerUrl !== "" && (
        <>
          {trailerErr ? (
            <> Error </>
          ) : (
            <YouTube videoId={trailerUrl} opts={opts} className="mt-5" />
          )}
        </>
      )}
      <CardList title="Similar" movieList={similarResults} />
    </div>
  );
};

export default Details;
