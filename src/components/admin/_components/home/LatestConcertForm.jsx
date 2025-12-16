"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { IoMdAddCircle } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorText from "@/components/admin/_components/forms/FormErrorText";
import useCreateConcert from "@/hooks/useCreateConcert";
import { Loader } from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import useUpdateConcert from "@/hooks/useUpdateConcert";
import dynamic from "next/dynamic";
import { latestConcertAddFormValidationSchema } from "@/utils/formValidationSchema";
import RichTextEditor from "@/components/common/RichTextEditor";

const CldUploadWidget = dynamic(
  () => import("next-cloudinary").then((mod) => mod.CldUploadWidget),
  { ssr: false }
);

const LatestConcertForm = ({ isEdited = false, defaultValues = {} }) => {
  const router = useRouter();
  const { createConcert, loading: isCreateConcertLoading } = useCreateConcert();
  const { updateConcert, loading: isUpdatingConcert } = useUpdateConcert();
  const [imageUrl, setImageUrl] = useState(
    defaultValues.concert_image_url || ""
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(latestConcertAddFormValidationSchema),
    defaultValues: {
      concert_name: defaultValues.concert_name || "",
      concert_description: defaultValues.concert_description || "",
      youtube_link: defaultValues.youtube_link || "",
      concert_image_url: defaultValues.concert_image_url || "",
    },
  });

  // Populate form when defaultValues change (for edit mode)
  useEffect(() => {
    if (isEdited && defaultValues) {
      reset({
        concert_name: defaultValues.concert_name || "",
        concert_description: defaultValues.concert_description || "",
        youtube_link: defaultValues.youtube_link || "",
        concert_image_url: defaultValues.concert_image_url || "",
      });
      setImageUrl(defaultValues.concert_image_url || "");
    }
  }, [defaultValues, isEdited, reset]);

  const handleUploadSuccess = (result) => {
    if (result.event === "success") {
      const uploadedUrl = result.info?.secure_url;
      if (!uploadedUrl) return;
      setImageUrl(uploadedUrl);
      setValue("concert_image_url", uploadedUrl);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (isEdited) {
        await updateConcert({ ...data, _id: defaultValues?._id });
      } else {
        await createConcert(data);
      }
      router.push("/admin/dashboard/home/latest-concerts");
      setImageUrl("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

      <div className="grid grid-cols-1 gap-6">
        {/* Label outside */}
        <Label htmlFor="file_url" className="mb-1 block">
          Upload Section Image
        </Label>

        <div className="w-full relative z-0 min-h-52 border-2 border-dashed border-gray-500 rounded-md px-4 py-4">
          {/* Show image preview if exists */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-full max-h-52 object-contain rounded"
            />
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

          {/* Error message */}
          {errors?.section_image_url && (
            <div className="absolute bottom-2 left-2">
              <FormErrorText errorText={errors.section_image_url.message} />
            </div>
          )}
        </div>
      </div>

      {/* Concert Name */}
      <div className="grid grid-cols-1 gap-6">
        <div className="w-full relative">
          <Label htmlFor="concert_name" className="mb-1 block">
            Concert Name
          </Label>
          <Input
            id="concert_name"
            placeholder="Add Concert Name"
            {...register("concert_name")}
          />
          {errors.concert_name && (
            <FormErrorText errorText={errors.concert_name.message} />
          )}
        </div>
      </div>

      {/* Concert Description */}
      {/* <div className="grid grid-cols-1 gap-6">
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
            <FormErrorText errorText={errors.concert_description.message} />
          )}
        </div>
      </div> */}

      <div className="grid grid-cols-1 gap-6 w-full">
        <Label htmlFor="concert_description" className="mb-1 block">
          Concert Description
        </Label>
        <Controller
          name="concert_description"
          control={control}
          render={({ field }) => (
            <RichTextEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.concert_description && (
          <FormErrorText errorText={errors.concert_description.message} />
        )}
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
        <Button
          type="submit"
          className="w-32"
          disabled={isCreateConcertLoading || isUpdatingConcert}
        >
          {isCreateConcertLoading || isUpdatingConcert ? <Loader /> : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default LatestConcertForm;
