"use client";

import Header from "@/components/common/Header";
import React from "react";
import AOSInit from "../aos-client-init";
import Footer from "@/components/common/Footer";

const userLayout = ({ children }) => {
  return (
    <div className="bg-[#333]">
      <Header />
      {/* <AOSInit /> */}
      {children}
      <Footer />
    </div>
  );
};

export default userLayout;
