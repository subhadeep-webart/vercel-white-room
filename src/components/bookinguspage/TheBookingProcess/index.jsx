import NoiseComponent from "@/components/common/NoiseComponent";
import Image from "next/image";

const TheBookingProcess = ({bookingPage, bookingProcess }) => {
  const stepPositions = [
    { side: "left", offset: "top-[37px]" },
    { side: "right", offset: "top-[287px]" },
    { side: "left", offset: "bottom-[351px]" },
    { side: "right", offset: "bottom-[170px]" },
  ];

  return (
    <>
      <section className="pt-20 pb-20 bg-white relative overflow-hidden">
        <NoiseComponent/>
        <div className="container">
          <h3 className="text-[#0F1116] font-bold text-xl md:text-[45px] text-center mb-20">
           {bookingPage?.title || "WHAT YOU GET WHEN YOU BOOK THE WHITE ROOMS"}
          </h3>
          <div>
            <h3 className="text-[#0F1116] font-bold text-xl md:text-[45px] text-center mb-6 text-capitalize">
              {bookingProcess?.title || "The Booking Process"}
            </h3>

            <div className="h-[938px] relative">
              <div className="absolute md:bottom-[107px] right-[-75px] md:right-[108px] w-[990px]">
                <Image
                  src="/assets/images/rw-2.png"
                  alt=""
                  width={990}
                  height={990}
                  className="w-full h-auto"
                  priority
                />
              </div>

              <div className="absolute top-0 left-0 md:left-[426px] w-[620px] md:w-[700px]">
                <Image
                  src="/assets/images/booking-us-img-1.png"
                  alt=""
                  width={700}
                  height={800}
                  className="w-full h-auto img_border"
                  priority
                />
              </div>

              {bookingProcess?.booking_steps?.length > 0 &&
                bookingProcess?.booking_steps?.map((step, index) => {
                  const isLeft =
                    stepPositions[index % stepPositions.length].side === "left";
                  const positionClass =
                    stepPositions[index % stepPositions.length].offset;
                  const sideClass = isLeft
                    ? "left-[-27px] md:left-[46px]"
                    : "right-[-29px] md:right-0";

                  return (
                    <div
                      key={index}
                      className={`bg-white absolute z-10 ${sideClass} ${positionClass} w-[530px] md:w-[708px] h-[120px] md:h-[124px] py-5 px-9 border-1 border-[#0F1116] shadow-md`}
                    >
                      <p className="text-[#0F1116] text-sm md:text-[18px] font-normal">
                        {step}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TheBookingProcess;
