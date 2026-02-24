"use client";
import NoiseComponent from "@/components/common/NoiseComponent";
import Image from "next/image";

const WhatDoYouGet = ({ getWithBoking }) => {
  // Function to render list items with blue arrows and paragraphs normally
  const renderContentWithArrows = (description) => {
    // Create a temporary div to parse the description HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = description;

    // Find all <ul> and <li> elements
    const listItems = tempDiv.querySelectorAll("ul li");

    // Replace <li> elements with a blue arrow next to each item
    listItems.forEach((li) => {
      const arrowContainer = document.createElement("div");
      arrowContainer.className =
        "text-sm md:text-lg font-normal text-[#8F8F8F] mb-7 flex items-center gap-2";
      const arrowImage = document.createElement("img");
      arrowImage.src = "/assets/icons/arrow-blue.svg";
      arrowImage.alt = "Arrow";
      arrowImage.width = 28;
      arrowImage.height = 28;
      arrowImage.className = "shrink-0";
      arrowContainer.appendChild(arrowImage);
      arrowContainer.appendChild(document.createTextNode(li.textContent));

      li.replaceWith(arrowContainer);
    });

    return tempDiv.innerHTML; // Return the modified HTML content
  };

  return (
    <>
      <section className="bg-black relative overflow-hidden">
        <NoiseComponent />
        <div className="container px-4 md:px-0">
          <div className="relative h-[750px] hidden md:block">
            <div className="absolute left-[67px] top-0 w-[725px]">
              <Image
                src={getWithBoking?.section_image_url}
                alt=""
                width={725}
                height={578}
                className="w-full max-w-[725px] h-auto img_border"
                priority
              />
            </div>

            <div className="w-[850px] h-[600px] bg-[#1B1E25] shadow-xl p-10 absolute bottom-[60px] right-[-400px] transform -translate-x-1/2 z-10 border-b-[3px] border-white rounded-[6px]">
              <h3 className="text-white font-bold text-xl md:text-4xl mb-6">
                {getWithBoking?.title}
              </h3>

              <div
                className="text-base md:text-lg font-normal text-[#8F8F8F] mb-8"
                dangerouslySetInnerHTML={{
                  __html: renderContentWithArrows(getWithBoking?.description),
                }}
              />
            </div>
          </div>

          <div className="md:hidden flex flex-col items-center mt-8">
            <div className="w-full max-w-[577px] mb-6">
              <Image
                src={getWithBoking?.section_image_url}
                alt=""
                width={577}
                height={747}
                className="w-full h-auto img_border"
                priority
              />
            </div>

            <div className="w-full max-w-[875px] bg-[#1B1E25] shadow-xl p-7 mx-auto border-b-[3px] border-white rounded-[6px]">
              <h3 className="text-white font-bold text-xl mb-6">
                {getWithBoking?.title}
              </h3>

              <div
                className="text-base font-normal text-[#8F8F8F] mb-8"
                dangerouslySetInnerHTML={{
                  __html: renderContentWithArrows(getWithBoking?.description),
                }}
              />
            </div>
          </div>

          <div className="mt-4 md:mt-8">
            <p className="text-base md:text-lg font-normal text-white text-center">
              Take a detailed look at how your big night will play out on our
              ‘how it works on the day’ page.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhatDoYouGet;
