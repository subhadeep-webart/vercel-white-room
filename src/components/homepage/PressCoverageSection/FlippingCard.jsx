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
            className="object-cover"
          />
        </div>
        {/* Back Side */}
        {/* <div className="absolute w-full h-full rotate-y-180 backface-hidden bg-gray-800 rounded-lg p-6 flex flex-col justify-center items-center text-white">
          <div className="relative w-full h-full mb-4">
            <Image
              src={pressCoverages?.poster_image || `/assets/images/white-room-2.png`}
              alt="Back of card"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <h3 className="text-xl font-bold mb-4">
            {pressCoverages?.poster_title || "Music Player"}
          </h3>
          {pressCoverages?.poster_song && (
            <audio controls className="w-full mb-4">
              <source src={pressCoverages?.poster_song} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div> */}
        <div className="relative w-full h-full rotate-y-180 backface-hidden bg-gray-800 rounded-lg p-6 flex flex-col justify-center items-center text-white">
          <div className={styles.card_front}>
            <Image
              src={
                pressCoverages?.poster_image ||
                `/assets/images/white-room-2.png`
              }
              alt="Back of card"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
            <h3 className="text-xl font-bold mb-4">
              {pressCoverages?.poster_title || "Music Player"}
            </h3>
            {pressCoverages?.poster_song && (
              <audio controls className="w-4/5 mb-4">
                {" "}
                <source src={pressCoverages?.poster_song} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlippingCard;
