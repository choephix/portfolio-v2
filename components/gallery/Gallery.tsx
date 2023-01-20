import React, { useEffect, useRef, useState } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import styled from "styled-components";
import { GalleryBackground } from "./GalleryBackground";
import { GalleryThumbsSlider } from "./GalleryThumbsSlider";
import { PageBlocksProjects } from "../../.tina/__generated__/types";

type ProjectsData = PageBlocksProjects["projects"][number];

export type GalleryProps = {
  data: ProjectsData;
};

const GalleryTitleDiv = styled.h1`
  font-size: 48px;
  font-weight: bolder;
  margin: 0px;
  padding: 0px 24px;

  color: #fff;
  -webkit-text-stroke: 1px black;
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
  transform: translateX(-24px);
  transition: opacity 0.3s linear, transform 0.3s linear;
  *:hover > * > & {
    opacity: 1;
    transform: translateX(0%);
    transition: opacity 0.2s linear, transform 0.2s linear;
  }
`;

/* A React component that is using the useState and useEffect hooks to create a gallery of images that
will scroll through the images every 3 seconds. */
export const Gallery = (props: GalleryProps) => {
  const { data } = props;

  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

  const ref = useRef<any>(null);
  const [width, setWidth] = useState(0);
  React.useEffect(() => {
    const handleResize = () => setWidth(ref.current?.offsetWidth || 0);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [!!ref.current]);

  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

  if (data.thumbnailImages.length < 1) {
    data.thumbnailImages.push(
      `https://picsum.photos/seed/${Math.random()}/400/300`,
      `https://picsum.photos/seed/${Math.random()}/200/300`,
      `https://picsum.photos/seed/${Math.random()}/400/300`,
      `https://picsum.photos/seed/${Math.random()}/400/300`,
      `https://picsum.photos/seed/${Math.random()}/500/300`
    );
  }

  const backgroundImages = (data.backgroundImages || []).map(
    (img) => `backdrops/${img}`
  );

  const thumbnailImages = (data.thumbnailImages || []).map(
    (img) => `thumbs/${img}`
  );

  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

  return (
    <div
      ref={ref}
      className="gallery w-full relative"
      style={{ height: "400px" }}
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
        images={thumbnailImages}
      />

      <div className="absolute top-0 left-0 right-0">
        {/* <GalleryTitleDiv data-tinafield="name">{data.name}</GalleryTitleDiv> */}
        <GalleryTitleDiv data-tinafield="abstract">
          {data.abstract}
        </GalleryTitleDiv>
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
