"use client";

import styles from "./homevideo.module.scss";
// HomeVideo
const HomeVideo = ({ bannerData }) => {
  return (
    <video
      className={styles.home_video_section}
      src={
        bannerData
          ? bannerData.video_url
          : "/assets/videos/home-second-video.mp4"
      }
      autoPlay
      loop
      muted
      playsInline
    />
  );
};

export default HomeVideo;
