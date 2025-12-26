import FiveStarTestimonial from "@/components/common/ui/FiveStarTestimonial";
import Image from "next/image";

const RatingCard = ({ review }) => {
  return (
    <>
      <div className="md:max-w-[1209px] md:min-w-[800px] md:w-full md:min-h-[200px] md:max-h-[490px] md:h-full p-[40px] relative bg-[#1B1E25] mb-8">
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
                {/* <Image
                                    src="/assets/icons/star-icon.svg"
                                    alt="Star"
                                    width={208}
                                    height={32}
                                /> */}
                <FiveStarTestimonial rating={review?.rating} />
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RatingCard;
