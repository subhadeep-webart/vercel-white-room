"use client";
export const ssr = false;
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IoMdAddCircle } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorText from "@/components/admin/_components/forms/FormErrorText";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import {
  artistSectionValidationSchema,
  commonBannerValidationSchema,
} from "@/utils/formValidationSchema";
import { toast } from "sonner";
import { Loader } from "@/components/common/Loader";
import { Trash2 } from "lucide-react";

const CldUploadWidget = dynamic(
  () => import("next-cloudinary").then((mod) => mod.CldUploadWidget),
  { ssr: false }
);

const AddBannerTextForm = ({
  defaultValues = {},
  onSubmitHandler,
  isLoading,
}) => {
  const [imageUrl, setImageUrl] = useState(defaultValues?.file_url || "");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(artistSectionValidationSchema),
    defaultValues: {
      file_url: "",
      buttonText: "",
      buttonLink: "#",
    },
  });

  // Populate form when defaultValues change (for edit mode)
  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset({
        file_url: defaultValues.file_url || "",
        buttonText: defaultValues.buttonText || "",
        buttonLink: defaultValues.buttonLink || "",
      });
      setImageUrl(defaultValues.file_url || "");
    }
  }, [defaultValues, reset]);

  const handleUploadSuccess = (result) => {
    if (result.event === "success") {
      console.log("Result getting from url======>", result);
      const uploadedUrl = result.info?.secure_url;
      const type = result.info?.resource_type;
      if (!uploadedUrl || !type) return;
      setImageUrl(uploadedUrl);
      setValue("file_url", uploadedUrl);
    }
  };

  const onSubmit = async (data) => {
    try {
      await onSubmitHandler(data);
      setImageUrl("");
    } catch (err) {
      toast.error("Something Went Wrong");
      console.error(err);
    }
  };

  const handleRemovePicture = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const payload = {
      file_url: "",
      buttonText: defaultValues.buttonText || "",
      buttonLink: defaultValues.buttonLink || "",
    };
    await onSubmit(payload);
  };

  return (
    <form
      className="space-y-6 bg-white shadow-md px-4 py-2 rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-black py-2 text-lg font-semibold px-2">CTA CONTENT</p>
      <div className="grid grid-cols-1 gap-6">
        <Label htmlFor="file_url" className="block">
          Upload About Section Background Image
        </Label>

        <div className="w-full relative z-0 min-h-52 border-2 border-dashed border-gray-500 rounded-md px-4 py-4">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-full max-h-52 object-contain rounded"
            />
          )}
          {defaultValues?.file_url && (
            <button
              className="w-fit px-2 py-2 absolute top-2.5 right-2 z-50 bg-gray-300 rounded-full cursor-pointer shadow-2xl"
              type="button"
              onClick={handleRemovePicture}
              disabled={isLoading}
            >
              <Trash2 size={20} className="text-red-500" />
            </button>
          )}
          {/* Upload Button absolutely centered */}
          {typeof window !== "undefined" && (
            <CldUploadWidget
              signatureEndpoint="/api/sign-image"
              uploadPreset="white-room-image"
              options={{
                multiple: false,
                clientAllowedFormats: ["png", "jpeg", "jpg", "gif", "webp"],
                maxFileSize: 10485760,
                resourceType: "auto",
                modal: true,
              }}
              onSuccess={handleUploadSuccess}
            >
              {({ open }) => (
                <Button
                  onClick={() => open()}
                  type="button"
                  className="absolute top-1/2 left-1/2 w-36 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2  text-[#0F1116] font-bold text-sm !py-2 !px-4 border-2 border-black rounded-lg hover:bg-white bg-white/80"
                >
                  <IoMdAddCircle size={20} />
                  <span>{imageUrl ? "Change Image" : "Add Image"}</span>
                </Button>
              )}
            </CldUploadWidget>
          )}
          {errors?.file_url && (
            <div className="absolute bottom-2 left-2">
              <FormErrorText errorText={errors.file_url.message} />
            </div>
          )}
        </div>
      </div>

      {/* Concert Name */}
      <div className="grid grid-cols-1 gap-6">
        <div className="w-full relative">
          <Label htmlFor="buttonText" className="mb-1 block">
            Button Text
          </Label>
          <Input
            id="buttonText"
            placeholder="Button Text"
            {...register("buttonText")}
          />
          {errors.buttonText && (
            <FormErrorText errorText={errors.buttonText.message} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="w-full relative">
          <Label htmlFor="buttonLink" className="mb-1 block">
            Button Link
          </Label>
          <Input
            id="buttonLink"
            placeholder="Button Link"
            {...register("buttonLink")}
          />
          {errors.buttonLink && (
            <FormErrorText errorText={errors.buttonLink.message} />
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="w-32" disable={isLoading}>
          {isLoading ? <Loader /> : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default AddBannerTextForm;
