import { HTMLAttributes, useRef } from "react";
import styled from "styled-components";

const ThumbImg = styled.img`
  height: 160px;
  width: auto;
  border-radius: 8px;
  margin: 20px 12px;
  box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.8);
`;

const ThumbVideo = styled.video`
  height: 160px;
  width: auto;
  border-radius: 8px;
  margin: 20px 12px;
  box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.8);
`;

const ThumbDiv = styled.div`
  border-radius: 8px;
  margin: 20px 12px;
  box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  overflow: hidden;

  flex-shrink: 0;

  // display: inline-block;
`;

type GalleryThumbProps = HTMLAttributes<any> & {
  src: string;
};

export function GalleryThumb(props: GalleryThumbProps) {
  const { src, ...divAttr } = props;

  const videoRef = useRef<HTMLVideoElement>(null);

  // const PAUSED = useWatchReturnValue(
  //   () => {
  //     if (!ref.current) return;
  //     if (!ref.current.parentElement) return;

  //     const parentScrollX = ref.current.parentElement.scrollLeft;
  //     const parentWidth = ref.current.parentElement.clientWidth;

  //     const myLeft = ref.current.offsetLeft;
  //     const shouldPause = myLeft < parentScrollX || myLeft > parentScrollX + 500;

  //     if (shouldPause != ref.current.paused) {
  //       if (shouldPause) {
  //         ref.current.pause();
  //       } else {
  //         ref.current.play();
  //       }
  //     }

  //     return shouldPause;
  //   }
  // , [])
  // console.log('GalleryThumb', src, PAUSED);

  const contentElemenetStyle: React.CSSProperties = {
    height: "160px",
    width: "auto",
    margin: "0",
    padding: "0",
    // borderRadius: "8px",
    // margin: "20px 12px",
    // boxShadow: "0 0 20px 0px rgba(0, 0, 0, 0.8)",
    // objectFit: "cover",
  };

  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");

  return (
    <ThumbDiv>
      {isVideo ? (
        <video
          muted
          autoPlay
          loop
          ref={videoRef}
          preload="metadata"
          style={contentElemenetStyle}
        >
          <source
            src={src}
            type={src.endsWith(".mp4") ? "video/mp4" : "video/webm"}
          />
        </video>
      ) : (
        <img src={src} alt={`Image thumbnail: "${src}"`} style={contentElemenetStyle} />
      )}
    </ThumbDiv>
  );
}

// const ThumbPic = styled.picture`
//   border-radius: 12px;
//   box-shadow: 0 0 24px 0px rgba(0, 0, 0, 0.75), inset 0 0 24px 0px rgba(0, 0, 0, 0.75);
//   margin: 24px;
//   height: 160px;
//   width: auto;
// `;

// type GalleryThumbProps = HTMLAttributes<any> & {
//   src: string;
// };

// function ThumbContent(props: GalleryThumbProps) {
//   const { src } = props;
//   if (!src) return null;
//   if (src.endsWith('.mp4')) return <source srcSet={src} type='video/mp4' />;
//   if (src.endsWith('.webp')) return <source srcSet={src} type='video/webp' />;
//   if (src.endsWith('.jpg')) return <source srcSet={src} type="image/jpeg" />;
//   return <img src={src} alt="Gallery image" />;
// }

// export function GalleryThumb(props: GalleryThumbProps) {
//   const { src, ...divAttr } = props;

//   return (
//     <ThumbPic {...divAttr}>
//       <ThumbContent src={src} />
//     </ThumbPic>
//   );
// }
