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
      {/* <section className="pt-20 pb-20 bg-black relative overflow-hidden">
        <NoiseComponent />
        <div className="container">
          <h3 className="text-white font-bold text-xl md:text-3xl text-center py-6">
            WHAT TO EXPECT FROM A NIGHT WITH THE WHITE ROOMS
          </h3>

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
                  className={`relative lg:absolute mb-4 lg:mb-0 w-full max-w-[650px] ${
                    isEven ? "lg:top-0 lg:left-28" : "lg:top-32 lg:right-20"
                  }`}
                >
                  <Image
                    src={content?.section_image_url}
                    alt={content?.title}
                    width={650}
                    height={650}
                    className="w-full h-auto object-cover img_border"
                    priority
                  />
                </div>

                <div
                  className={`relative lg:absolute ${
                    isEven ? "lg:bottom-[48px]" : "lg:top-[50px]"
                  } ${
                    isEven
                      ? "lg:right-[-276px] lg:transform lg:-translate-x-1/2"
                      : " lg:left-[453px] lg:transform lg:-translate-x-1/2"
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
      </section> */}
      <section className="pt-20 pb-20 bg-black relative overflow-hidden">
  <NoiseComponent />

  <div className="container">
    <h3 className="text-white font-bold text-xl md:text-3xl text-center py-6">
      WHAT TO EXPECT FROM A NIGHT WITH THE WHITE ROOMS
    </h3>

    {onthedayContents?.contents?.map((content, index) => {
      const isEven = index % 2 === 0;

      return (
        <div
          key={content?._id}
          className="relative flex flex-col lg:block h-auto lg:h-[700px] mb-16 lg:mb-0"
        >
   
          <div
            className={`relative mt-6 lg:absolute lg:mt-0 
              ${isEven ? "lg:top-[116px]" : "lg:top-[116px]"}
              ${isEven ? "lg:right-[55px]" : "lg:right-[55px]"}
              w-full max-w-[578px] mx-auto lg:mx-0`}
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
            className={`relative mb-6 lg:absolute w-full max-w-[650px] mx-auto lg:mx-0
              ${isEven ? "lg:top-0 lg:left-28" : "lg:top-32 lg:right-20"}`}
          >
            <Image
              src={content?.section_image_url}
              alt={content?.title}
              width={650}
              height={650}
              className="w-full h-auto object-cover img_border"
              priority
            />
          </div>

          <div
            className={`relative w-full max-w-[700px] mx-auto
              py-8 px-6 bg-[#1B1E25] z-10 shadow-xl
              lg:absolute lg:py-[57px] lg:px-[91px]
              ${
                isEven
                  ? "lg:bottom-[48px] lg:right-[-276px] lg:transform lg:-translate-x-1/2"
                  : "lg:top-[50px] lg:left-[453px] lg:transform lg:-translate-x-1/2"
              }`}
          >
            <h3 className="text-white font-bold text-xl md:text-3xl mb-6 lg:mb-8">
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

      {/* <section className="pt-20 pb-20 bg-black relative overflow-hidden">
        <NoiseComponent />
        <div className="container px-4 md:px-0">
          <h3 className="text-white font-bold text-xl md:text-3xl text-center py-6">
            WHAT TO EXPECT FROM A NIGHT WITH THE WHITE ROOMS
          </h3>

          {onthedayContents?.contents?.map((content, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={content?._id}
                className={`relative flex flex-col lg:block mb-10 lg:mb-0`}
              >
                <div
                  className={`absolute top-[80px] lg:top-[116px] ${
                    isEven
                      ? "right-8 lg:right-[55px]"
                      : "right-5 lg:right-[55px]"
                  } w-full max-w-[578px]`}
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
                  className={`relative lg:absolute mb-4 lg:mb-0 w-full max-w-[428px] lg:max-w-[650px] ${
                    isEven ? "lg:top-0 lg:left-28" : "lg:top-32 lg:right-20"
                  } mx-auto`}
                >
                  <Image
                    src={content?.section_image_url}
                    alt={content?.title}
                    width={650}
                    height={650}
                    className="w-full h-auto object-cover img_border"
                    priority
                  />
                </div>

                <div
                  className={`relative lg:absolute w-full max-w-[700px] py-10 px-6 lg:px-[91px] bg-[#1B1E25] z-10 shadow-xl mx-auto ${
                    isEven
                      ? "lg:bottom-[48px] lg:right-[-276px] lg:transform lg:-translate-x-1/2"
                      : "lg:top-[50px] lg:left-[453px] lg:transform lg:-translate-x-1/2"
                  }`}
                >
                  <h3 className="text-white font-bold text-xl md:text-3xl mb-6 md:mb-8 text-center lg:text-left">
                    {content?.title}
                  </h3>

                  <div className="text-sm md:text-lg font-normal text-[#8F8F8F] text-center lg:text-left">
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
      </section> */}
    </>
  );
};

export default WhatToExpectSection;
