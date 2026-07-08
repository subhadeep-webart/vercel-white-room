import { SPINDRIFTWEBSITE } from "@/utils/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <section className="bg-[#101010] h-16 relative flex items-center justify-center">
        <p className="text-center font-medium text-xs text-[#EDEDED] px-3">
          © {new Date().getFullYear()} The White Rooms · All rights reserved.
          Design by{" "}
          <Link
            href={SPINDRIFTWEBSITE}
            target="_blank"
            className="uppercase underline"
          >
            spindrift
          </Link>
        </p>
      </section>
    </>
  );
};

export default Footer;
