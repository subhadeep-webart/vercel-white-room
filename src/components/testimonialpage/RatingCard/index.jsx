import FiveStarTestimonial from "@/components/common/ui/FiveStarTestimonial";
import Image from "next/image";

const RatingCard = ({ review }) => {
  return (
    <>
      {/* <div className="md:max-w-[1209px] md:min-w-[800px] md:w-full md:min-h-[200px] md:max-h-[490px] md:h-full p-[40px] relative bg-[#1B1E25] mb-8">
        <div className="absolute top-[25px] left-[22px]">
          <Image
            src="/assets/icons/inverted-colon.svg"
            alt="InvertedColon"
            width={171}
            height={268}
          />
        </div>
        <div className="w-full ">
          <p className="text-[#8F8F8F] text-xl font-normal mb-7 text-justify">
            {review?.comment}
          </p>
          <div className="flex justify-between">
            <div className="flex flex-col space-y-0.5">
              <p className="text-[#F6B3F7] text-xl font-bold">{review?.name}</p>
              <p className="text-[#8F8F8F] text-xl font-normal">
                {review?.position}
              </p>
            </div>
            <div className="flex flex-col">
              <div>
              
                <FiveStarTestimonial rating={review?.rating} />
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div> */}
      <div
        className="
        w-full
        max-w-full
        md:max-w-[1209px]
        md:min-w-[800px]
        p-5 md:p-[40px]
        relative
        bg-[#1B1E25]
        mb-6 md:mb-8
        overflow-hidden
        border-b-[3px] border-white rounded-[6px]
      "
      >
        <div className="absolute top-4 left-4 md:top-[25px] md:left-[22px]">
          <Image
            src="/assets/icons/inverted-colon.svg"
            alt="InvertedColon"
            width={90}
            height={140}
            className="md:w-[171px] md:h-[268px]"
          />
        </div>

        <p className="text-[#8F8F8F] text-sm md:text-xl font-normal mb-6 text-justify">
          {review?.comment}
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div>
            <p className="text-[#F6B3F7] text-sm md:text-xl font-bold">
              {review?.name}
            </p>
            <p className="text-[#8F8F8F] text-sm md:text-xl">
              {review?.position}
            </p>
          </div>

          <FiveStarTestimonial rating={review?.rating} />
        </div>
      </div>
    </>
  );
};

export default RatingCard;
