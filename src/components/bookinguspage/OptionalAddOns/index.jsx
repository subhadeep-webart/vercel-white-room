import NoiseComponent from "@/components/common/NoiseComponent";
import Image from "next/image";

const OptionalAddOns = ({ optionalAddOn }) => {
  return (
    <>
      <section className="bg-black relative overflow-hidden">
        <NoiseComponent />
        <div className="container px-4 md:px-0">


          <div className="flex flex-col justify-center items-center">
            <h3 className="text-white font-bold text-xl md:text-[45px] text-center mb-4 mt-5">
              {optionalAddOn?.title}
            </h3>
            <p className="text-[#8F8F8F] text-base md:text-xl font-normal mb-6 md:mb-16 text-center max-w-3xl">
              {optionalAddOn?.description}
            </p>
          </div>

          <div className="flex items-center justify-center mb-6 md:mb-16">
            <Image
              className="img_border w-full max-w-[821px] h-auto"
              src={optionalAddOn?.section_image_url}
              alt=""
              width={821}
              height={418}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
            <div className="flex flex-col justify-start items-center bg-[#1B1E25] w-full sm:max-w-[426px] h-auto md:h-[271px] p-6 md:p-12 border-b-[3px] border-white rounded-[6px]">
              <p className="font-bold text-base md:text-2xl text-white text-center">
                {optionalAddOn?.subsection1_title}
              </p>
              <p className="text-sm md:text-[16px] text-[#8F8F8F] text-center line-clamp-5">
                {optionalAddOn?.subsection1_description}
              </p>
            </div>

            <div className="flex flex-col justify-start items-center bg-[#1B1E25] w-full sm:max-w-[426px] h-auto md:h-[271px] p-6 md:p-12 border-b-[3px] border-white rounded-[6px]">
              <p className="font-bold text-base md:text-2xl text-white text-center">
                {optionalAddOn?.subsection2_title}
              </p>
              <p className="text-sm md:text-[16px] text-[#8F8F8F] text-center line-clamp-5">
                {optionalAddOn?.subsection2_description}
              </p>
            </div>

            <div className="flex flex-col justify-start items-center bg-[#1B1E25] w-full sm:max-w-[426px] h-auto md:h-[271px] p-6 md:p-12 border-b-[3px] border-white rounded-[6px]">
              <p className="font-bold text-base md:text-2xl text-white text-center">
                {optionalAddOn?.subsection3_title}
              </p>
              <p className="text-sm md:text-[16px] text-[#8F8F8F] text-center line-clamp-5">
                {optionalAddOn?.subsection3_description}
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default OptionalAddOns;