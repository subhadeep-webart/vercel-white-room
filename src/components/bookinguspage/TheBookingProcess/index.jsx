import NoiseComponent from "@/components/common/NoiseComponent";
import Image from "next/image";
import styles from "./bookingprocess.module.scss";
import BookingStepsTimeline from "./BookingStepsTimeline";

const TheBookingProcess = ({ bookingPage, bookingProcess }) => {

  return (
    <>
      <section className="pt-20 pb-20 bg-black relative overflow-hidden">
        <NoiseComponent />
        <div className="container px-4 md:px-0">
          <h3 className="text-white font-bold text-xl md:text-[45px] text-center mb-20">
            {bookingPage?.title || "WHAT YOU GET WHEN YOU BOOK THE WHITE ROOMS"}
          </h3>

          <div>
            <h3 className="text-white font-bold text-xl md:text-[45px] text-center mb-6 text-capitalize">
              {bookingProcess?.title || "The Booking Process"}
            </h3>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 ${styles.timeline_container}`}>
              <div className="self-center">
                <div className={`${styles.booking_us_image_container}`}>
                  <Image
                    src="/assets/images/booking-us-img-1.png"
                    alt=""
                    fill
                    className="img_border"
                    priority
                  />
                </div>
              </div>
              <BookingStepsTimeline bookingProcess={bookingProcess?.booking_steps ?? []} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TheBookingProcess;
