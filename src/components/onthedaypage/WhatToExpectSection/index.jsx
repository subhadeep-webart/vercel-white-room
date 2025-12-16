"use client";

import NoiseComponent from "@/components/common/NoiseComponent";
import Image from "next/image";

const WhatToExpectSection = ({ onthedayContents }) => {
  const parseDescription = (description) => {
    // Create a temporary div to parse the HTML content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = description; // Use the raw HTML description here

    const listItems = tempDiv.querySelectorAll("li");

    listItems.forEach((item, index) => {
      // Trim the content and check for empty list items
      const content = item.innerHTML.trim();

      if (!content || content === "&nbsp;") {
        // For empty items, we'll create an empty span to preserve the space
        const spaceContainer = document.createElement("span");
        spaceContainer.classList.add("empty-space");
        item.innerHTML = ""; // Clear current content and insert the space
        item.appendChild(spaceContainer);
        return;
      }

      // Always set the arrow to be pink (for even and odd)
      const arrow = document.createElement("img");
      arrow.src = "/assets/icons/arrow-pink.svg"; // Always pink
      arrow.alt = "Arrow";
      arrow.width = 28;
      arrow.height = 28;
      arrow.classList.add("shrink-0");

      // Create the flex container for the icon and the text
      const flexContainer = document.createElement("div");
      flexContainer.classList.add("flex", "items-center", "gap-3");

      // Create a container for the text
      const textContainer = document.createElement("span");
      textContainer.classList.add(
        "text-sm",
        "md:text-lg",
        "font-normal",
        "text-[#8F8F8F]"
      );
      textContainer.innerHTML = item.innerHTML; // Preserve inner HTML including <br> tags

      // Append the arrow and the text to the flex container
      flexContainer.appendChild(arrow);
      flexContainer.appendChild(textContainer);

      // Replace the content of the list item with the new structure
      item.innerHTML = ""; // Clear current content
      item.appendChild(flexContainer);
    });

    // Return the updated HTML as a string with preserved line breaks
    return tempDiv.innerHTML;
  };

  return (
    <>
      <section className="pt-20 pb-20 bg-[#0F1116] relative overflow-hidden">
        <NoiseComponent/>
        <div className="container">
          <h3 className="text-white font-bold text-xl md:text-3xl text-center py-6">
            WHAT TO EXPECT FROM A NIGHT WITH THE WHITE ROOMS
          </h3>

          {/* <div className="relative h-[700px]">
            <div className="absolute top-[80px] md:top-[116px] right-8 md:right-[55px] w-[578px]">
              <Image
                src="/assets/images/rw-bg.png"
                alt=""
                width={578}
                height={578}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="absolute top-0 left-10 md:left-[113px] w-[440px] md:w-[725px]">
              <Image
                src="/assets/images/ontheday-img-1.png"
                alt=""
                width={725}
                height={578}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="absolute bottom-[48px] md:bottom-[30px] right-[-276px] transform -translate-x-1/2 w-xl md:w-[700px] h-72 md:h-[370px] py-[57px] px-10 md:px-[91px] bg-[#1B1E25] z-10 shadow-xl">
              <h3 className="text-white font-bold text-xl md:text-3xl mb-8">
                THE BUILD UP
              </h3>

              <p className="text-sm md:text-lg font-normal text-[#8F8F8F] flex items-center gap-2 mb-7">
                <Image
                  src="/assets/icons/arrow-pink.svg"
                  alt="Next"
                  width={28}
                  height={28}
                  className="shrink-0"
                />
                Once contracts are signed and deposits paid, we’ll work with you
                to iron out all the crucial details ahead of the main event.
              </p>

              <p className="text-sm md:text-lg font-normal text-[#8F8F8F] flex items-center gap-2 mb-7">
                <Image
                  src="/assets/icons/arrow-blue.svg"
                  alt="Previous"
                  width={28}
                  height={28}
                  className="shrink-0"
                />
                Time to take a look at our repertoire, and pick out your ten
                favourites. You can also choose one special request that’s not
                in our repertoire.
              </p>
            </div>
          </div>

          <div className="relative  h-[1400px]">
            <div className="absolute left-[56px] top-[0px]">
              <Image
                src="/assets/images/rw-bg.png"
                alt=""
                width={578}
                height={578}
              />
            </div>

            <div className="absolute top-[344px] md:top-[122px] right-[5px] md:right-[85px] w-[428px] md:w-[500px]">
              <Image
                src="/assets/images/ontheday-img-2.png"
                alt=""
                width={500}
                height={500}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="absolute top-[50px] left-[321px] md:left-[453px] transform -translate-x-1/2 w-xl md:w-[700px] h-[300px] md:h-[370px] py-10 md:py-[57px] px-18 md:px-[91px] bg-[#1B1E25] z-10 shadow-xl">
              <h3 className="text-white font-bold text-xl md:text-3xl mb-8">
                ARRIVAL
              </h3>

              <p className="text-sm md:text-lg font-normal text-[#8F8F8F] flex items-center gap-2 mb-7">
                <Image
                  src="/assets/icons/arrow-pink.svg"
                  alt="Next"
                  width={28}
                  height={28}
                  className="shrink-0"
                />
                Before your big event, we’ll work to find the perfect time to
                arrive on site. Our standard arrival time is 5pm, but if you’d
                like us earlier or later, we can make this happen.
              </p>

              <p className="text-sm md:text-lg font-normal text-[#8F8F8F] flex items-center gap-2 mb-7">
                <Image
                  src="/assets/icons/arrow-blue.svg"
                  alt="Previous"
                  width={28}
                  height={28}
                  className="shrink-0"
                />
                If you’ve booked an afternoon live lounge set, we’ll be onsite
                with plenty of time to set up ahead of the drinks reception
                performance.
              </p>
            </div>

            <div className="absolute left-10 md:left-[108px] bottom-[400px] md:bottom-[507px] md:w-[500px]">
              <Image
                src="/assets/images/ontheday-img-3.png"
                alt=""
                width={500}
                height={500}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="absolute bottom-[-92px] md:bottom-[40px] right-[-276px] transform -translate-x-1/2 w-[570px] md:w-[800px] h-[480px] md:h-[620px] py-[42px] md:py-[57px] px-[50px] md:px-[91px] bg-[#1B1E25] z-10 shadow-xl">
              <h3 className="text-white font-bold text-xl md:text-3xl mb-8">
                LOAD IN & SET UP
              </h3>

              <p className="text-sm md:text-lg font-normal text-[#8F8F8F] flex items-center gap-2 mb-7">
                <Image
                  src="/assets/icons/arrow-pink.svg"
                  alt="Next"
                  width={28}
                  height={28}
                  className="shrink-0"
                />
                Our touring-quality stage setup takes time to get it looking and
                sounding amazing. In order to ensure you get the best
                experience, we’ll need access to the performance area at least
                90 mins before the show starts.
              </p>

              <p className="text-sm md:text-lg font-normal text-[#8F8F8F] flex items-center gap-2 mb-7">
                <Image
                  src="/assets/icons/arrow-blue.svg"
                  alt="Previous"
                  width={28}
                  height={28}
                  className="shrink-0"
                />
                We’ll need at least 90 mins to setup and soundcheck. If there’s
                a gap between setup and performance, we kindly ask for a further
                30 mins stage access before the show begins.
              </p>

              <p className="text-sm md:text-lg font-normal text-[#8F8F8F] flex items-center gap-2 mb-7">
                <Image
                  src="/assets/icons/arrow-pink.svg"
                  alt="Next"
                  width={28}
                  height={28}
                  className="shrink-0"
                />
                Once set up, we can hit play on background music or tunes to get
                the party started.
              </p>

              <p className="text-sm md:text-lg font-normal text-[#8F8F8F] flex items-center gap-2 mb-7">
                <Image
                  src="/assets/icons/arrow-blue.svg"
                  alt="Previous"
                  width={28}
                  height={28}
                  className="shrink-0"
                />
                Please note it you’ve ordered the XL sound and lighting
                packages, we will require an additional 15mins setup per system
              </p>
            </div>
          </div>

          <div className="relative  h-[1400px] mb-10 md:mb-0">
           
            <div className="absolute top-[120px] md:top-[197px] right-10 md:right-[102px] w-[400px] md:w-[500px]">
              <Image
                src="/assets/images/ontheday-img-4.png"
                alt=""
                width={500}
                height={500}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="absolute top-[453px] md:top-0 left-[312px] md:left-[456px] transform -translate-x-1/2 w-[560px] md:w-[700px] h-[490px] md:h-[540px] py-[46px] md:py-[57px] px-[45px] md:px-[91px] bg-[#1B1E25] z-10 shadow-xl">
              <h3 className="text-white font-bold text-xl md:text-3xl mb-8">
                IT’S SHOWTIME!
              </h3>

              <p className="text-base md:text-lg font-normal text-[#8F8F8F] flex items-center gap-2 mb-7">
                <Image
                  src="/assets/icons/arrow-pink.svg"
                  alt="Next"
                  width={28}
                  height={28}
                  className="shrink-0"
                />
                Our powerful sound system and pulsing subs will have guests
                flooding the dancefloor, and immersive lighting will transport
                you right into the midst of a headliner show.
              </p>

              <p className="text-base md:text-lg font-normal text-[#8F8F8F] flex items-center gap-2 mb-7">
                <Image
                  src="/assets/icons/arrow-blue.svg"
                  alt="Previous"
                  width={28}
                  height={28}
                  className="shrink-0"
                />
                We’ll play two hours of singalong tunes, split into sets as
                requested. The most popular options are 2 x 60 min, or 3 x 40
                min. For the best experience, we recommend 2 x 60!
              </p>

              <p className="text-base md:text-lg font-normal text-[#8F8F8F] flex items-center gap-2 mb-7">
                <Image
                  src="/assets/icons/arrow-pink.svg"
                  alt="Next"
                  width={28}
                  height={28}
                  className="shrink-0"
                />
                In between sets, we’ll make sure the dancefloor stays busy with
                a party playlist of your choice. Or you can book a band member
                to DJ - see our optional extras for more info.
              </p>
            </div>

            <div className="absolute right-[5px] md:right-[57px] bottom-[69px] md:bottom-[290px]">
              <Image
                src="/assets/images/rw-bg.png"
                alt=""
                width={578}
                height={578}
              />
            </div>

            <div className="absolute left-[34px] md:left-[107px] bottom-[138px] md:bottom-[236px] w-[370px] md:w-[650px]">
              <Image
                src="/assets/images/ontheday-img-5.png"
                alt=""
                width={650}
                height={578}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="absolute bottom-[-89px] md:bottom-[129px] right-[-276px] transform -translate-x-1/2 w-[569px] md:w-[700px] h-[216px] md:h-[320px] py-[40px] md:py-[57px] px-[46px] md:px-[91px] bg-[#1B1E25] z-10 shadow-xl">
              <h3 className="text-white font-bold text-xl md:text-3xl mb-8">
                THANK YOU & GOODNIGHT!
              </h3>

              <p className="text-sm md:text-lg font-normal text-[#8F8F8F] flex items-center gap-2 mb-7">
                <Image
                  src="/assets/icons/arrow-pink.svg"
                  alt="Next"
                  width={28}
                  height={28}
                  className="shrink-0"
                />
                We’ll close the show with an encore or two. Finish times are
                often dependent on your venue’s music licence, which you can
                check in advance. Our standard finish is midnight, but if you
                want us to stay later, let us know!
              </p>
            </div>
          </div> */}

          {onthedayContents?.contents?.map((content, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={content?._id}
                className={`relative flex flex-col lg:block ${
                  isEven ? "h-[700px]" : "h-[700px]"
                } mb-10 lg:mb-0`}
              >

                <div
                  className={`absolute ${
                    isEven ? "top-[80px]" : "top-[56px]"
                  } lg:top-[116px] ${
                    isEven ? "right-8" : "right-5"
                  } lg:right-[55px] w-[578px]`}
                >
                  <Image
                    src="/assets/images/rw-bg.png"
                    alt=""
                    width={578}
                    height={578}
                    className="w-full h-auto"
                    priority
                  />
                </div>

                <div
                  className={`relative lg:absolute mb-4 lg:mb-0 ${
                    // isEven ? "top-[0px] " : "top-[344px] lg:top-[122px]"
                    isEven ? "lg:top-[0px] " : "lg:top-[122px]"
                  } ${
                    // isEven ? "left-10 lg:left-[113px]" : "right-[85px]"
                    isEven ? " lg:left-[113px]" : "lg:right-[85px]"
                  }  w-[428px] lg:w-[650px]`}
                
                >
                  <Image
                    src={content?.section_image_url}
                    alt={content?.title}
                    width={500}
                    height={500}
                    className="w-full h-auto"
                    priority
                  />
                </div>

                <div
                  className={`relative lg:absolute ${
                    isEven ? "lg:bottom-[48px]" : "lg:top-[50px]"
                  } ${
                    isEven
                      ? "lg:right-[-276px] lg:transform lg:-translate-x-1/2"
                      // : "left-[321px] lg:left-[453px] transform -translate-x-1/2"
                      : " lg:left-[453px] lg:transform lg:-translate-x-1/2"
                  // } w-xl lg:w-[700px] py-[57px] px-10 lg:px-[91px] bg-[#1B1E25] z-10 shadow-xl`}
                  }   lg:w-[700px] py-[57px] px-10 lg:px-[91px] bg-[#1B1E25] z-10 shadow-xl`}
                >
                  <h3 className="text-white font-bold text-xl md:text-3xl mb-8">
                    {content?.title}
                  </h3>

                  <div className="text-sm md:text-lg font-normal text-[#8F8F8F]">
  
                    {content?.description && (
                      <div
                        className="description"
                        dangerouslySetInnerHTML={{
                          __html: parseDescription(content?.description),
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default WhatToExpectSection;
