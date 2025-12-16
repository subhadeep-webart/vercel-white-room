const CommonBanner = ({ backgroundImage }) => {
  return (
    <>
      <section
        className="w-full h-[50vh] md:h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></section>
    </>
  );
};

export default CommonBanner;
