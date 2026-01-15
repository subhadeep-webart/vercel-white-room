"use client";

import Image from "next/image";
import styles from "./coverage.module.scss";

const FlippingCard = ({ pressCoverages }) => {
  return (
    <div className={styles.flip_card}>
      <div className={`${styles.card_inner}`}>
        {/* Front Side */}
        <div className={styles.card_front}>
          <Image
            src={
              pressCoverages?.poster_image || `/assets/images/white-room-2.png`
            }
            alt="Front of card"
            fill
            className="object-contain"
          />
        </div>
        <div className="relative w-full h-full rotate-y-180 backface-hidden bg-gray-800 p-6 flex flex-col justify-center items-center text-white">
          <div className={styles.card_front}>
            {/* <Image
              src={
                pressCoverages?.poster_image ||
                `/assets/images/white-room-2.png`
              }
              alt="Back of card"
              fill
              className="object-cover rounded-lg"
            /> */}
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
            <h3 className="text-xl font-bold mb-4">
              {pressCoverages?.poster_title || "Music Player"}
            </h3>
            <div
              className="w-full"
              dangerouslySetInnerHTML={{
                __html: pressCoverages?.poster_song || "",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlippingCard;
