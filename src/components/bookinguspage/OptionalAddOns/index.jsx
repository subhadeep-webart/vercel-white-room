import NoiseComponent from "@/components/common/NoiseComponent";
import Image from "next/image";

const OptionalAddOns = ({optionalAddOn}) => {
  return (
    <>
      <section className="bg-black relative overflow-hidden">
        <NoiseComponent/>
        <div className="container">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-white font-bold text-xl md:text-[45px] text-center mb-4 mt-5">
             {optionalAddOn?.title}
            </h3>
            <p className="text-[#8F8F8F] text-base md:text-xl font-normal mb-4 md:mb-16 text-center">
             {optionalAddOn?.description}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-center">
              <Image
                className="img_border"
                src={optionalAddOn?.section_image_url}
                alt=""
                width={821}
                height={418}
              />
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 mt-[-66px]">
              <div className="flex flex-col space-y-4 justify-center items-center bg-[#1B1E25] w-[426px] h-[271px] p-4 md:p-12">
                <p className="font-bold text-sm md:text-2xl text-white whitespace-nowrap">
                 {optionalAddOn?.subsection1_title}
                </p>
                <p className="font-normal text-sm md:text-[16px] text-[#8F8F8F] text-center">
                {optionalAddOn?.subsection1_description}
                </p>
              </div>

              <div className="flex flex-col space-y-4 justify-center items-center bg-[#1B1E25] w-[426px] h-[271px] p-4 md:p-12 md:mt-[-179px]">
                <p className="font-bold text-sm md:text-2xl text-white whitespace-nowrap">
                 {optionalAddOn?.subsection2_title}
                </p>
                <p className="font-normal text-sm md:text-[16px] text-[#8F8F8F] text-center">
                 {optionalAddOn?.subsection2_description}
                </p>
              </div>

              <div className="flex flex-col space-y-4 justify-center items-center bg-[#1B1E25] w-[426px] h-[271px] p-4 md:p-12">
                <p className="font-bold text-sm md:text-2xl text-white whitespace-nowrap">
                  {optionalAddOn?.subsection3_title}
                </p>
                <p className="font-normal text-sm md:text-[16px] text-[#8F8F8F] text-center">
                  {optionalAddOn?.subsection3_description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OptionalAddOns;