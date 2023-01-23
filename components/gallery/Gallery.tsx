import React, {
  PropsWithRef,
  PropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import styled from "styled-components";
import { GalleryBackground } from "./GalleryBackground";
import { GalleryThumbsSlider } from "./GalleryThumbsSlider";
import { PageBlocksProjects } from "../../.tina/__generated__/types";
import { useTina } from "tinacms/dist/react";

type ProjectsData = PageBlocksProjects["projects"][number];

export type GalleryProps = {
  data: ProjectsData;
  selected?: boolean;
  onClick?: () => void;

  urlBaseBackgroundImages?: string;
  urlBaseThumbnailImages?: string;
  urlBaseThumbnailVideos?: string;
};

const GalleryTitleDiv = styled.h1`
  font-size: 36px;
  font-weight: bolder;
  margin: 0px;
  color: #fff;
  text-shadow: 0px 0px 6px black, 0px 0px 24px black;
`;

const GalleryDescrDiv = styled.div`
  font-size: 16px;
  font-weight: bolder;

  margin: 20px 20px;
  padding: 1px 12px;

  max-width: 60%;

  color: #fff;
  -webkit-text-stroke: 0.5px black;
  background: #000a;
  border-radius: 8px;

  opacity: 0;
  // transform: translateX(-24px);
  transition: opacity 0.3s linear, transform 0.3s linear;
  
  // *:hover > * > & {
  *.selected & {
    opacity: 1;
    transform: translateX(0%);
    transition: opacity 0.2s linear, transform 0.2s linear;
  }
`;

/* A React component that is using the useState and useEffect hooks to create a gallery of images that
will scroll through the images every 3 seconds. */
export const Gallery = (props: GalleryProps) => {
  const {
    data,
    selected,
    onClick,
    urlBaseBackgroundImages,
    urlBaseThumbnailImages,
    urlBaseThumbnailVideos,
  } = props;

  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

  const ref = useRef<any>(null);
  // const [width, setWidth] = useState(0);
  // React.useEffect(() => {
  //   const handleResize = () => setWidth(ref.current?.offsetWidth || 0);
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);`
  // }, [!!ref.current]);

  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

  if (!data) return <div>no data</div>;

  const backgroundImages = (data.backgroundImages || []).map((img) => {
    const url = urlBaseBackgroundImages + img;
    return url;
  });

  const thumbnails = (data.thumbnails || []).map((thumb) => {
    const isVideo = thumb.endsWith(".mp4") || thumb.endsWith(".webm");
    const url = isVideo
      ? urlBaseThumbnailVideos + thumb
      : urlBaseThumbnailImages + thumb;
    return url;
  });

  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

  return (
    <div
      ref={ref}
      className={`gallery w-full relative overflow-hidden ${selected ? "selected" : ""}`}
      style={{
        height: selected ? "75vh" : "360px",
        maxHeight: "800px",
        transition: "height 0.7s linear",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onClick={onClick}
    >
      <GalleryBackground
        images={backgroundImages}
        data-tinafield="backgroundImages"
      />

      {/* <GalleryThumbsSlider
        images={props.thumbImagesExtra}
        scrollSpeed={0.5}
        style={{
          position: 'absolute',
          bottom: '100px',
          left: '0px',
          right: '0px',
        }}
      /> */}

      <GalleryThumbsSlider
        className="absolute bottom-0 left-0 right-0"
        data-tinafield="thumbnailImages"
        images={thumbnails}
      />

      <div className="absolute top-0 left-0 right-0 m-7">
        {/* <GalleryTitleDiv data-tinafield="name">{data.name}</GalleryTitleDiv> */}
        <GalleryTitleDiv data-tinafield="abstract">
          {data.abstract}
        </GalleryTitleDiv>

        <div>
          {
            //// Platforms list, presented as small chips, white text on transparent black
            data.platforms?.split(",").map((platform) => (
              <span
                className="inline-block bg-black bg-opacity-20 rounded-full px-3 py-.25 text-xs font-semibold text-white my-4 mr-2"
                style={{ boxShadow: "inset 0 0 12px #0004, 0 0 12px #0005" }}
              >
                {platform}
              </span>
            ))
          }
        </div>

        {data.summary && (
          <GalleryDescrDiv>
            <TinaMarkdown content={data.summary} />
          </GalleryDescrDiv>
        )}
      </div>
    </div>
  );
};

export default Gallery;
