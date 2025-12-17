const Footer = () => {
  return (
    <>
      <section className="bg-[#101010] h-20 py-7 relative">
        <p className="text-center font-medium text-[16px] text-[#EDEDED] ">
          © {new Date().getFullYear()} The White Rooms · All rights reserved. Design by <span className="uppercase">spindrift</span>
        </p>
      </section>
    </>
  );
};

export default Footer;