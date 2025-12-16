import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";
import Forms from "../forms/page";
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

const AddWorkedforContent = ({ openAddContent, setOpenAddContent }) => {
  const handleFormSubmit = (data) => {
    console.log("Received form data:", data);
  };

  const handleClose = () => {
    setOpenAddContent(false);
  };

  return (
    <>
      {/* <div className="p-4 bg-[#f0f3f8] relative">
        <Button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-black text-sm font-bold hover:bg-white hover:border-black hover:border-2"
          
        >
          <IoMdClose size={20}/>
          <span>Close</span>
        </Button>
        <h2 className="text-lg font-semibold mb-4">Add Worked For Content</h2>
        <Forms fields={formFields} onSubmit={handleFormSubmit} />
      </div> */}

      <Dialog open={openAddContent} onOpenChange={setOpenAddContent}>
        <DialogContent className="w-full max-w-[90vw] bg-[#f0f3f8]">
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle className="text-lg font-semibold">
              Add Worked For Content
            </DialogTitle>
          </DialogHeader>

          <Forms fields={formFields} onSubmit={handleFormSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddWorkedforContent;
