"use client"
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
      <section className="bg-[#0F1116] relative overflow-hidden">
        <NoiseComponent/>
        <div className="container">
          <div className="relative h-[750px]">
            <div className="absolute left-[67px] top-[-170px] md:top-0 w-[577px] md:w-[1010px]">
              <Image
                src={getWithBoking?.section_image_url}
                alt=""
                width={1010}
                height={747}
                className="w-full h-auto img_border"
                priority
              />
            </div>

            <div className="w-[675px] md:w-[875px] h-[520px] md:h-[600px] bg-[#1B1E25] shadow-xl p-7 md:p-10 absolute bottom-[66px] right-[-372px] transform -translate-x-1/2 z-10">
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

          <div className=" md:mt-8">
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
