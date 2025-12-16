"use client";
export const ssr = false;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { IoMdAddCircle } from "react-icons/io";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorText from "../forms/FormErrorText";
import dynamic from "next/dynamic";

const CldUploadWidget = dynamic(
  () => import("next-cloudinary").then((mod) => mod.CldUploadWidget),
  { ssr: false }
);

// Validation schema
const schema = yup.object().shape({
  concert_description: yup.string().required("Concert description is required"),
  youtube_link: yup
    .string()
    .url("Enter a valid YouTube link")
    .required("YouTube link is required"),
  concert_image_url: yup.string().required("Concert image is required"),
});

const AddLatestConcertsContent = ({ openAddContent, setOpenAddContent }) => {
  const [imageUrl, setImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      concert_description: "",
      youtube_link: "",
      concert_image_url: "",
    },
  });

  const handleUploadSuccess = (result) => {
    if (result.event === "success") {
      const uploadedUrl = result.info?.secure_url;
      if (!uploadedUrl) {
        console.error("Image URL missing in Cloudinary result");
        return;
      }
      setImageUrl(uploadedUrl);
      setValue("concert_image_url", uploadedUrl); // Update react-hook-form
    }
  };

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    reset();
    setImageUrl("");
    setOpenAddContent(false);
  };

  return (
    <Dialog open={openAddContent} onOpenChange={setOpenAddContent}>
      <DialogContent className="bg-[#f0f3f8] !max-w-2/3 !w-full overflow-visible z-[50]">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-lg font-semibold">
            Add Latest Concerts Content
          </DialogTitle>
        </DialogHeader>

        <div className="max-w-full p-6 rounded-md space-y-6">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Image Upload */}
            <div className="grid grid-cols-1 gap-6">
              <div className="w-full relative z-0">
                <Label htmlFor="concert_image" className="mb-1 block">
                  Upload Poster
                </Label>
                {typeof window !== "undefined" && (
                  <CldUploadWidget
                    signatureEndpoint="/api/sign-image"
                    uploadPreset="white-room-image"
                    options={{
                      multiple: false,
                      clientAllowedFormats: ["png", "jpeg", "jpg", "gif"],
                      maxFileSize: 10485760,
                    }}
                    onSuccess={handleUploadSuccess}
                    container={document.body} // Ensures widget is not blocked
                  >
                    {({ open }) => (
                      <Button
                        onClick={() => open()}
                        type="button"
                        className="relative inline-flex items-center gap-2 bg-white text-[#0F1116] font-bold text-sm w-full py-2 px-4 mb-4 mt-4 border-2 border-black rounded-lg"
                      >
                        <IoMdAddCircle size={20} />
                        <span>{imageUrl ? "Change Image" : "Add Images"}</span>
                      </Button>
                    )}
                  </CldUploadWidget>
                )}
                {errors.concert_image_url && (
                  <FormErrorText errorText={errors.concert_image_url.message} />
                )}
              </div>
            </div>

            {/* Concert Description */}
            <div className="grid grid-cols-1 gap-6">
              <div className="w-full relative">
                <Label htmlFor="concert_description" className="mb-1 block">
                  Concert Description
                </Label>
                <Textarea
                  id="concert_description"
                  placeholder="Add Concert Description"
                  {...register("concert_description")}
                  rows={4}
                />
                {errors.concert_description && (
                  <FormErrorText
                    errorText={errors.concert_description.message}
                  />
                )}
              </div>
            </div>

            {/* YouTube Link */}
            <div className="grid grid-cols-1 gap-6">
              <div className="w-full relative">
                <Label htmlFor="youtube_link" className="mb-1 block">
                  Add YouTube Link
                </Label>
                <Textarea
                  id="youtube_link"
                  placeholder="Add YouTube Link"
                  {...register("youtube_link")}
                  rows={2}
                />
                {errors.youtube_link && (
                  <FormErrorText errorText={errors.youtube_link.message} />
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="w-32">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddLatestConcertsContent;
