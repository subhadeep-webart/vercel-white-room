"use client";

import Image from "next/image";

const SmallImageCard = ({ imageUrl, alt = "Image" }) => {
    if (!imageUrl) return;
    return (
        <div
            className="
        w-40 h-40 overflow-hidden border border-gray-200 rounded-lg
        transform transition-transform duration-300 ease-in-out
        hover:scale-110 hover:shadow-2xl
        cursor-pointer
      "
        >
            <div className="relative w-full h-full">
                <Image
                    src={imageUrl}
                    alt={alt}
                    fill
                    className="object-cover rounded-lg"
                />
            </div>
        </div>
    );
};

export default SmallImageCard;
