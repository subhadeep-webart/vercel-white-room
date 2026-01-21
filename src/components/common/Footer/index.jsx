const Footer = () => {
  return (
    <>
      <section className="bg-[#101010] h-16 relative flex items-center justify-center">
        <p className="text-center font-medium text-xs text-[#EDEDED] ">
          © {new Date().getFullYear()} The White Rooms · All rights reserved. Design by <span className="uppercase">spindrift</span>
        </p>
      </section>
    </>
  );
};

export default Footer;