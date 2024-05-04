import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface ImageProps {
  src: string;
  className: string;
  alt: string | undefined;
}
const Image = ({ src, className, alt }: ImageProps) => {
  return (
    <LazyLoadImage
      effect="blur"
      src={src}
      alt={alt}
      className={className}
      wrapperClassName={className}
      wrapperProps={{
        style: {},
      }}
    />
  );
};

export default Image;
