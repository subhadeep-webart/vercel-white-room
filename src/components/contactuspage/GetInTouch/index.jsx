import NoiseComponent from "@/components/common/NoiseComponent";
import Image from "next/image";
import React from "react";

const GetInTouch = () => {
  return (
    <>
      <section className="bg-black relative overflow-hidden">
        <NoiseComponent />
        <div className="container">
          <div className="py-96">
            <div className="bg-[#1B1E25] h-[341px]"></div>
          </div>

          <div className="flex justify-center items-center mb-[60px] mt-[-1024px] md:mt-[-945px]">
            {/* <div className='bg-[#2E3136] w-[787px] h-[753px] py-[64px] px-[56px]'>
              <h3 className="font-bold text-white text-xl md:text-[45px] mb-8">GET IN TOUCH WITH US</h3>
              <form className="grid grid-cols-2 gap-8 ">

                <div className="flex flex-col col-span-2">
                  <label htmlFor="name" className="font-bold text-lg text-white">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your full name"
                    className="text-[#9D9D9D] p-3 bg-[#1B1E25] border border-[#898989] rounded-md"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="font-bold text-lg text-white">Email ID</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email id"
                    className="text-[#9D9D9D] p-3 bg-[#1B1E25] border border-[#898989] rounded-md"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phone" className="font-bold text-lg text-white">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter number"
                    className="text-[#9D9D9D] p-3 bg-[#1B1E25] border border-[#898989] rounded-md"
                  />
                </div>


                <div className="flex flex-col col-span-2">
                  <label htmlFor="address" className="font-bold text-lg text-white">Your Address</label>
                  <textarea
                    id="address"
                    placeholder="Enter address"
                    rows={2}
                    className="text-[#9D9D9D] p-3 bg-[#1B1E25] border border-[#898989] rounded-md"
                  />
                </div>

                <div className="flex flex-col col-span-2">
                  <label htmlFor="address" className="font-bold text-lg text-white">Your Address</label>
                  <textarea
                    id="address"
                    placeholder="Enter address"
                    rows={2}
                    className="text-[#9D9D9D] p-3 bg-[#1B1E25] border border-[#898989] rounded-md"
                  />
                </div>

                <div className="flex justify-end col-span-2">
                  <button
                    type="submit"
                    className="btn-11 relative inline-block bg-white text-[#0F1116] font-medium text-sm md:text-[17px] w-[145px] md:w-[185px] h-[44px] md:h-[54px] overflow-hidden transition-all duration-300 hover:text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div> */}
            <div className="bg-[#2E3136] w-full max-w-[787px] md:h-[753px] py-16 px-8 md:py-[64px] md:px-[56px] border-b-[3px] border-white rounded-[6px]">
              <h3 className="font-bold text-white text-xl md:text-[45px] mb-8">
                GET IN TOUCH WITH US
              </h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                <div className="flex flex-col col-span-2">
                  <label
                    htmlFor="name"
                    className="font-bold text-lg text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your full name"
                    className="text-[#9D9D9D] p-3 bg-[#1B1E25] border border-[#898989] rounded-md"
                  />
                </div>

                <div className="flex flex-col col-span-2 md:col-span-1">
                  <label
                    htmlFor="email"
                    className="font-bold text-lg text-white"
                  >
                    Email ID
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email id"
                    className="text-[#9D9D9D] p-3 bg-[#1B1E25] border border-[#898989] rounded-md"
                  />
                </div>

                <div className="flex flex-col col-span-2 md:col-span-1">
                  <label
                    htmlFor="phone"
                    className="font-bold text-lg text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter number"
                    className="text-[#9D9D9D] p-3 bg-[#1B1E25] border border-[#898989] rounded-md"
                  />
                </div>

                <div className="flex flex-col col-span-2">
                  <label
                    htmlFor="address"
                    className="font-bold text-lg text-white"
                  >
                    Your Address
                  </label>
                  <textarea
                    id="address"
                    placeholder="Enter address"
                    rows={2}
                    className="text-[#9D9D9D] p-3 bg-[#1B1E25] border border-[#898989] rounded-md"
                  />
                </div>

                <div className="flex flex-col col-span-2">
                  <label
                    htmlFor="address"
                    className="font-bold text-lg text-white"
                  >
                    Your Address
                  </label>
                  <textarea
                    id="address"
                    placeholder="Enter address"
                    rows={2}
                    className="text-[#9D9D9D] p-3 bg-[#1B1E25] border border-[#898989] rounded-md"
                  />
                </div>

                <div className="flex justify-end col-span-2">
                  <button
                    type="submit"
                    className="btn-11 relative inline-block bg-white text-[#0F1116] font-medium text-sm md:text-[17px] w-[145px] md:w-[185px] h-[44px] md:h-[54px] overflow-hidden transition-all duration-300 hover:text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* <div className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-x-10'>
            <div className='bg-[#2E3136] w-[430px] h-[125px] flex space-x-10 py-6 pl-10 pr-24'>
              <div>
                <Image
                  src="/assets/icons/contact-phone.svg"
                  alt="Phone"
                  width={72}
                  height={72}
                />
              </div>

              <div className='flex flex-col justify-center'>
                <p className='font-normal text-lg text-[#9D9D9D]'>Phone Number</p>
                <p className='font-medium text-xl text-white'>1 (747) 265-199</p>
              </div>
            </div>

            <div className='bg-[#2E3136] w-[430px] h-[125px] flex space-x-10 py-6 pl-10 pr-10'>
              <div>
                <Image
                  src="/assets/icons/contact-email.svg"
                  alt="Email"
                  width={72}
                  height={72}
                />
              </div>

              <div className='flex flex-col justify-center'>
                <p className='font-normal text-lg text-[#9D9D9D]'>Email ID</p>
                <p className='font-medium text-xl text-white'>whiteroom@gmail.com</p>
              </div>
            </div>

          </div> */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10">
            <div className="bg-[#2E3136] w-full max-w-[430px] flex flex-col md:flex-row items-center md:items-start py-6 px-6 md:px-10 h-auto md:h-[125px] border-b-[3px] border-white rounded-[6px]">
              <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                <Image
                  src="/assets/icons/contact-phone.svg"
                  alt="Phone"
                  width={72}
                  height={72}
                />
              </div>

              <div className="flex flex-col justify-center text-center md:text-left">
                <p className="font-normal text-lg text-[#9D9D9D]">
                  Phone Number
                </p>
                <p className="font-medium text-xl text-white">
                  1 (747) 265-199
                </p>
              </div>
            </div>

            <div className="bg-[#2E3136] w-full max-w-[430px] flex flex-col md:flex-row items-center md:items-start py-6 px-6 md:px-10 h-auto md:h-[125px] border-b-[3px] border-white rounded-[6px]">
              <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                <Image
                  src="/assets/icons/contact-email.svg"
                  alt="Email"
                  width={72}
                  height={72}
                />
              </div>

              <div className="flex flex-col justify-center text-center md:text-left">
                <p className="font-normal text-lg text-[#9D9D9D]">Email ID</p>
                <p className="font-medium text-xl text-white">
                  whiteroom@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetInTouch;
