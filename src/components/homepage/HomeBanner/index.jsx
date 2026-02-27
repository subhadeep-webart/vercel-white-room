"use client";
// HomeBanner
const HomeBanner = () => {
  return (
    <>
      {/* <section > */}
      <video
        className="w-full h-screen object-cover"
        src="/assets/videos/home-bg-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* </section> */}
    </>
  );
};

export default HomeBanner;
