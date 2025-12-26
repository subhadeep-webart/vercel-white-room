import NoiseComponent from "@/components/common/NoiseComponent";

const WhatTheySaySection = ({ whatTheySay }) => {
  console.log("whatTheySay",whatTheySay)
  return (
    <>
      <section className="pt-20 pb-20 bg-black relative overflow-hidden">
        <NoiseComponent/>
        <div className="container">
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-white font-bold text-xl md:text-[45px] ">
              {whatTheySay?.title}
            </h3>
            <p className="text-base md:text-xl font-normal text-[#8F8F8F] text-center">
              {whatTheySay?.description}
            </p>
          </div>

          <div
            // className="flex flex-col md:flex-row space-y-2 md:space-x-2 items-center justify-between py-12 md:py-16 "
            className={`flex flex-col md:flex-row space-y-2 md:space-x-2 items-center justify-between py-12 md:py-16 ${
              whatTheySay?.clients?.length <= 2 ? "justify-center" : ""
            }`}
          >
            {/* <div className="w-[226px] h-[54px] px-20 flex flex-col items-center">
              <p className="font-bold text-white text-xl">BBC</p>
              <p className="font-normal text-[15px] text-[#8F8F8F]  whitespace-nowrap">
                The Gherkin
              </p>
            </div>
            <div className="w-[226px] h-[54px] px-20 flex flex-col items-center">
              <p className="font-bold text-white text-xl  whitespace-nowrap">
                International Sports Stars
              </p>
              <p className="font-normal text-[15px] text-[#8F8F8F]  whitespace-nowrap">
                Grosvenor House
              </p>
            </div>
            <div className="w-[282px] h-[129px] px-7 py-8 bg-[#1B1E25] flex flex-col items-center">
              <p className="font-bold text-white text-2xl  whitespace-nowrap">
                Hollywood A-Listers
              </p>
              <p className="font-normal text-[15px] text-[#8F8F8F]  whitespace-nowrap">
                Wembley Stadium
              </p>
            </div>
            <div className="w-[226px] h-[54px] px-20 flex flex-col items-center">
              <p className="font-bold text-white text-xl  whitespace-nowrap">
                Facebook
              </p>
              <p className="font-normal text-[15px] text-[#8F8F8F]  whitespace-nowrap">
                Battersea Evolution
              </p>
            </div>
            <div className="w-[226px] h-[54px] px-20 flex flex-col items-center">
              <p className="font-bold text-white text-xl  whitespace-nowrap">
                Google
              </p>
              <p className="font-normal text-[15px] text-[#8F8F8F]  whitespace-nowrap">
                Abbey Road Studios
              </p>
            </div> */}
            {whatTheySay?.clients?.map((client, index) => {
              const isMiddle =
                index === Math.floor(whatTheySay?.clients?.length / 2);
              return (
                <div
                  key={index}
                  className={` px-20 flex flex-col items-center ${
                    isMiddle
                      ? "bg-[#1B1E25] py-8 w-[282px] h-[129px]"
                      : "w-[226px] h-[54px]"
                  }`}
                >
                  <p
                    className={`font-bold text-white text-xl whitespace-nowrap`}
                  >
                    {client?.client_name}
                  </p>
                  <p
                    className={`font-normal text-[15px] text-[#8F8F8F] whitespace-nowrap`}
                  >
                    {client?.client_location}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center pb-20">
            <button onClick={() => window.open(whatTheySay?.button_url, "_blank")} className="btn-11 relative inline-block bg-white text-[#0F1116] font-medium text-[17px] w-[163px] h-[54px] overflow-hidden transition-all duration-300 hover:text-white">
              {whatTheySay?.button_text}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhatTheySaySection;
