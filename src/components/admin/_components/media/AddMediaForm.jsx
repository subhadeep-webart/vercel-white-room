"use client";
export const ssr = false;
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IoMdAddCircle } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorText from "@/components/admin/_components/forms/FormErrorText";
import { Loader } from "@/components/common/Loader";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { addMediaFormValidationSchema } from "@/utils/formValidationSchema";
import useAddMediaContent from "@/hooks/useAddMediaPageContent";
import useUpdateMediaFile from "@/hooks/useUpdateMediaFile";

const CldUploadWidget = dynamic(
  () => import("next-cloudinary").then((mod) => mod.CldUploadWidget),
  { ssr: false }
);

const AddMediaForm = ({ isEdited = false, defaultValues = {} }) => {
  const { handleAddMediaContent, loading: isUpdatingMediaPageContent } =
    useAddMediaContent();
  const { handleUpdateMedia, loading: isUpdatingMedia } = useUpdateMediaFile();
  const [imageUrl, setImageUrl] = useState(defaultValues?.file_url || "");

  const [fileType, setFileType] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addMediaFormValidationSchema),
    defaultValues: {
      file_url: "",
      file_type: "",
      title: "",
    },
  });

  // Populate form when defaultValues change (for edit mode)
  useEffect(() => {
    if (isEdited && defaultValues) {
      reset({
        file_url: defaultValues.file_url || "",
        file_type: defaultValues.file_type || "",
        title: defaultValues.title || "",
      });
      setImageUrl(defaultValues.file_url || "");
      setFileType(defaultValues.file_type || "");
    }
  }, [defaultValues, isEdited, reset]);

  const handleUploadSuccess = (result) => {
    if (result.event === "success") {
      console.log("Result getting from url======>", result);
      const uploadedUrl = result.info?.secure_url;
      const type = result.info?.resource_type;
      if (!uploadedUrl || !type) return;
      setImageUrl(uploadedUrl);
      setFileType(type);
      setValue("file_url", uploadedUrl);
      setValue("file_type", type);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (isEdited) {
        await handleUpdateMedia({ ...data, _id: defaultValues?._id });
      } else {
        await handleAddMediaContent({ data });
      }
      setImageUrl("");
      setFileType("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-6">
        {/* Label outside */}
        <Label htmlFor="file_url" className="mb-1 block">
          Upload Media
        </Label>

        <div className="w-full relative z-0 min-h-52 border-2 border-dashed border-gray-500 rounded-md px-4 py-4">
          {/* Show image preview if exists */}
          {imageUrl && fileType === "image" ? (
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-full max-h-52 object-contain rounded"
            />
          ) : imageUrl && fileType === "video" ? (
            <video
              src={imageUrl}
              controls
              className="w-full max-h-52 object-contain rounded"
            />
          ) : null}
          {/* Upload Button absolutely centered */}
          {typeof window !== "undefined" && (
            <CldUploadWidget
              signatureEndpoint="/api/sign-image"
              uploadPreset="white-room-image"
              options={{
                multiple: false,
                clientAllowedFormats: [
                  "png",
                  "jpeg",
                  "jpg",
                  "gif",
                  "mp4",
                  "mov",
                  "webm",
                ],
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

          {/* Error message */}
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
          <Label htmlFor="title" className="mb-1 block">
            Media Title
          </Label>
          <Input id="title" placeholder="Media Title" {...register("title")} />
          {errors.title && <FormErrorText errorText={errors.title.message} />}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-32"
          disabled={isUpdatingMediaPageContent || isUpdatingMedia}
        >
          {isUpdatingMediaPageContent || isUpdatingMedia ? (
            <Loader />
          ) : isEdited ? (
            "Edit Media"
          ) : (
            "Add Media"
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddMediaForm;
