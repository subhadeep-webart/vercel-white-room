// import Image from "next/image";

const ExploreBrand = ({ shopContent }) => {
  return (
    <>
      <section className="pt-20 pb-20 bg-[#0F1116]">
        <div className="container">
          <div className="flex justify-center items-center ">
            <div className="w-[815px] h-[132px]">
              {/* <p className="font-normal text-base md:text-xl text-white text-center">
                {shopContent?.description}
              </p> */}
              <div
                className="font-normal text-base md:text-xl text-white text-center"
                dangerouslySetInnerHTML={{
                  __html: shopContent?.description,
                }}
              />
            </div>
          </div>
          <div className="flex justify-center items-center ">
            <button
              onClick={() => window.open(shopContent?.button_url, "_blank")}
              className="btn-11 relative inline-block bg-white text-[#0F1116] font-medium text-sm md:text-[17px] w-[180px] md:w-[210px] h-[50px] md:h-[54px] overflow-hidden transition-all duration-300 hover:text-white"
            >
              {shopContent?.button_text}
            </button>
          </div>

          {/* <div className="flex flex-row justify-center items-center w-[1340px] h-[524px] relative ml-[143px] mt-[-99px]"> */}
          {/* <div className="flex flex-row justify-center items-center h-[524px] relative">

            <div className="absolute top-0 left-0">
              <Image
                src="/assets/images/shop-img-1.png"
                alt=""
                width={200}
                height={200}
              />
            </div>
            <div className="absolute bottom-[214px] left-[169px]">
              <Image
                src="/assets/images/shop-img-2.png"
                alt=""
                width={200}
                height={200}
              />
            </div>
            <div className="absolute bottom-[145px] left-[347px]">
              <Image
                src="/assets/images/shop-img-3.png"
                alt=""
                width={200}
                height={200}
              />
            </div>
            <div className="absolute bottom-[92px] right-[596px]">
              <Image
                src="/assets/images/shop-img-4.png"
                alt=""
                width={200}
                height={200}
              />
            </div>
            <div className="absolute bottom-[145px] right-[400px]">
              <Image
                src="/assets/images/shop-img-5.png"
                alt=""
                width={200}
                height={200}
              />
            </div>
            <div className="absolute bottom-[214px] right-[218px]">
              <Image
                src="/assets/images/shop-img-6.png"
                alt=""
                width={200}
                height={200}
              />
            </div>
            <div className="absolute top-0 right-[41px]">
              <Image
                src="/assets/images/shop-img-7.png"
                alt=""
                width={200}
                height={200}
              />
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default ExploreBrand;
