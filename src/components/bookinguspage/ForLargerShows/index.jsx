import NoiseComponent from "@/components/common/NoiseComponent";
import Image from "next/image";

const ForLargerShows = ({ largerShows }) => {
  return (
    <>
      <section className="bg-white relative overflow-hidden">
        <NoiseComponent/>
        <div className="container py-10">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 justify-center items-center px-[65px]">
            <div className="bg-white w-[675px] md:w-[906px] h-[751px] pt-12 pl-16">
              <div className="flex flex-col space-y-4 mb-14 pr-24">
                <p className="font-bold text-xl md:text-4xl text-[#0F1116] ">
                  {largerShows?.title}
                </p>
                {/* <p className="font-normal text-base md:text-lg text-[#8F8F8F] ">
                  {largerShows?.description}
                </p> */}
                 <div
                className="font-normal text-base md:text-lg text-[#8F8F8F]"
                dangerouslySetInnerHTML={{
                  __html: largerShows?.description,
                }}
              />
              </div>

              <div className="flex flex-col space-y-4 bg-white py-7 px-16 mb-14 border-1 border-[#0F1116]">
                <p className="font-bold text-xl md:text-xl text-[#0F1116] ">
                  {largerShows?.subsection1_title}
                </p>
                <p className="font-normal text-sm md:text-[16px] text-[#8F8F8F] ">
                  {largerShows?.subsection1_description}
                </p>
              </div>

              <div className="flex flex-col space-y-4 bg-white py-7 px-16 mb-7 border-1 border-[#0F1116]">
                <p className="font-bold text-xl md:text-xl text-[#0F1116] ">
                  {largerShows?.subsection2_title}
                </p>
                <p className="font-normal text-sm md:text-[16px] text-[#8F8F8F] ">
                  {largerShows?.subsection2_description}
                </p>
              </div>

              <div>
                <p className="font-normal text-base md:text-[16px] text-[#0F1116] ">
                  PLEASE NOTE -{" "}
                  <span className="text-[#8F8F8F] text-sm ">
                    {" "}
                    Extra time is required for setup with XL packages.
                  </span>{" "}
                </p>
              </div>
            </div>

            {/* <div>
            <Image
              src="/assets/images/booking-us-img-4.png"
              alt=""
              width={614}
              height={565}
            />
          </div> */}
            <div className="w-full max-w-[614px]">
              <Image
                src={
                  largerShows?.section_image_url ??
                  "/assets/images/booking-us-img-4.png"
                }
                alt="Booking image"
                width={614}
                height={565}
                className="w-full h-auto img_border"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForLargerShows;
