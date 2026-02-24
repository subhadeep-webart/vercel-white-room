import NoiseComponent from "@/components/common/NoiseComponent";

const BespokeProduction = ({ spokeProduction }) => {
  return (
    <>
      <section className="bg-black relative overflow-hidden">
        <NoiseComponent />
        <div className="container px-4 md:px-0">
          <div className="flex justify-center items-center ">
            <div
              className="bg-[#1B1E25] flex flex-col justify-center items-center
                      w-full max-w-[1244px]
                      h-auto md:h-[504px]
                      py-10 md:py-[74px]
                      px-6 md:px-[102px]
                      space-y-2 border-b-[3px] border-white rounded-[6px]"
            >
              <h3 className="font-bold text-white text-xl md:text-[45px] text-center">
                {spokeProduction?.title}
              </h3>

              <div
                className="font-normal text-sm md:text-lg text-[#8F8F8F] text-center"
                dangerouslySetInnerHTML={{
                  __html: spokeProduction?.description,
                }}
              />

              <button
                onClick={() =>
                  window.open(spokeProduction?.buttonUrl, "_blank")
                }
                className="btn-11 relative inline-block bg-white text-[#0F1116] font-medium
                     text-sm md:text-[17px] w-full max-w-[210px] !h-[54px] overflow-hidden
                     transition-all duration-300 hover:text-white"
              >
                {spokeProduction?.buttonText}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BespokeProduction;
