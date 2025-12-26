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
        <NoiseComponent/>
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
                    className="w-full h-auto img_border"
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
