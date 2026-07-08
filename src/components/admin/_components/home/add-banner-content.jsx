"use client";

import Forms from "@/components/admin/_components/forms/page";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";

const formFields = [
  {
    name: "image",
    label: "Banner Image",
    type: "text",
    placeholder: "Enter image URL",
  },
  {
    name: "video",
    label: "Banner Video",
    type: "text",
    placeholder: "Enter video URL",
  },
  {
    name: "status",
    label: "Status",
    type: "text",
    placeholder: "Active / Inactive",
  },
  {
    name: "menu",
    label: "Menu Label",
    type: "text",
    placeholder: "E.g. About Us",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter a description...",
  },
];

const AddBannerContent = ({ openAddContent, setOpenAddContent }) => {
  const handleFormSubmit = (data) => {
    console.log("Received form data:", data);
  };

  return (
    <>
      <Dialog open={openAddContent} onOpenChange={setOpenAddContent}>
        <DialogContent className="w-full max-w-[90vw] bg-[#f0f3f8]">
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle className="text-lg font-semibold">
              Add Banner Content
            </DialogTitle>
          </DialogHeader>

          <Forms fields={formFields} onSubmit={handleFormSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddBannerContent;
