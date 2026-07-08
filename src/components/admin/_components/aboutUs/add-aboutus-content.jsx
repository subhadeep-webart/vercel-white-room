"use client";

import Forms from "@/components/admin/_components/forms/page";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formFields = [
  {
    name: "header",
    label: "Header",
    type: "text",
    placeholder: "Enter about header",
  },
  {
    name: "content",
    label: "Content",
    type: "text",
    placeholder: "Enter about content",
  },
  {
    name: "image",
    label: "Images",
    type: "text",
    placeholder: "Enter image url",
  },
  {
    name: "slide",
    label: "Slider Images",
    type: "text",
    placeholder: "Enter slider image urls",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter a description...",
  },
];

const AddAboutusContent = ({ openAddContent, setOpenAddContent }) => {
  const handleFormSubmit = (data) => {
    console.log("Received form data:", data);
  };

  return (
    <>
      <Dialog open={openAddContent} onOpenChange={setOpenAddContent}>
        <DialogContent className="w-full max-w-[90vw] bg-[#f0f3f8]">
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle className="text-lg font-semibold">
              Add About Us Content
            </DialogTitle>
          </DialogHeader>

          <Forms fields={formFields} onSubmit={handleFormSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddAboutusContent;
