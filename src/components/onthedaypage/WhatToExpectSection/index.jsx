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
                  className={`absolute mt-6 lg:mt-0
    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-full max-w-[578px] mx-auto lg:mx-0
    ${isEven
                      ? "lg:top-[40px] lg:right-[45px] lg:left-auto lg:-translate-x-0 lg:-translate-y-0"
                      : "lg:bottom-[40px] lg:left-[45px] lg:right-auto lg:-translate-x-0 lg:-translate-y-0"
                    }`}
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
                  className={`relative w-full max-w-[700px] mx-auto border-b-[3px] border-white rounded-[6px]
              py-8 px-6 bg-[#1B1E25] z-10 shadow-xl
              lg:absolute lg:py-[57px] lg:px-[91px]
              ${isEven
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
    </>
  );
};

export default WhatToExpectSection;
