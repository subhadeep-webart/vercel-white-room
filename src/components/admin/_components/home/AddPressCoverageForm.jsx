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
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { pressCoverageAddValidationSchema } from "@/utils/formValidationSchema";
import useCreatePressCoverage from "@/hooks/useCreatePressCoverage";
import useUpdateCoverage from "@/hooks/useUpdateCoverage";
import { Textarea } from "@/components/ui/textarea";

const CldUploadWidget = dynamic(
  () => import("next-cloudinary").then((mod) => mod.CldUploadWidget),
  { ssr: false }
);

const AddPressCoverageForm = ({ isEdited = false, defaultValues = {} }) => {
  const router = useRouter();
  const { handleCreatePressCoverage, loading: isCreatingPressCoverage } =
    useCreatePressCoverage();
  const { handleUpdateCoverage, loading: isUpdatingCoverage } =
    useUpdateCoverage();
  const [songUrl, setSongUrl] = useState();
  const [imageUrl, setImageUrl] = useState(defaultValues?.poster_image || "");
  const [songImageUrl, setSongImageUrl] = useState(
    defaultValues?.song_image || ""
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(pressCoverageAddValidationSchema),
    defaultValues: {
      poster_title: defaultValues?.poster_title || "",
      poster_image: defaultValues?.poster_image || "",
      poster_song: defaultValues?.poster_song || "",
      song_image: defaultValues?.song_image || "",
    },
  });

  // Populate form when defaultValues change (for edit mode)
  useEffect(() => {
    if (isEdited && defaultValues) {
      reset({
        poster_image: defaultValues.poster_image || "",
        poster_title: defaultValues.poster_title || "",
        poster_song: defaultValues.poster_song || "",
        song_image: defaultValues?.song_image || "",
      });
      setSongImageUrl(defaultValues?.song_image || "");
      setImageUrl(defaultValues?.poster_image || "");
      setSongUrl(defaultValues?.poster_song || "");
    }
  }, [defaultValues, isEdited, reset]);

  const handleUploadSuccess = (result, type, dataType) => {
    if (result.event === "success") {
      const uploadedUrl = result.info?.secure_url;
      if (!uploadedUrl) return;
      if (type === "image") {
        if (dataType === "poster") {
          setImageUrl(uploadedUrl);
          setValue("poster_image", uploadedUrl);
        } else if (dataType === "song-image") {
          setSongImageUrl(uploadedUrl);
          setValue("song_image", uploadedUrl);
        }
      } else if (type === "song") {
        setSongUrl(uploadedUrl);
        setValue("poster_song", uploadedUrl);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      if (isEdited) {
        await handleUpdateCoverage({ ...data, _id: defaultValues?._id });
      } else {
        await handleCreatePressCoverage(data);
      }
      router.push("/admin/dashboard/home/press-coverage");
      setImageUrl("");
      setSongUrl("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Poster Name */}
      <div className="grid grid-cols-1 gap-6">
        <div className="w-full relative">
          <Label htmlFor="poster_title" className="mb-1 block">
            Poster Title
          </Label>
          <Input
            id="poster_title"
            placeholder="Add Poster Name"
            {...register("poster_title")}
          />
          {errors.poster_title && (
            <FormErrorText errorText={errors.poster_title.message} />
          )}
        </div>
      </div>

      {/* Image Upload */}
      <div className="grid grid-cols-1 gap-6">
        <div className="w-full relative z-0">
          <Label htmlFor="concert_image" className="mb-1 block">
            Upload Poster Image
          </Label>
          {typeof window !== undefined && (
            <CldUploadWidget
              signatureEndpoint="/api/sign-image"
              uploadPreset="white-room-image"
              options={{
                multiple: false,
                clientAllowedFormats: ["png", "jpeg", "jpg", "gif"],
                maxFileSize: 10485760,
              }}
              onSuccess={(result) =>
                handleUploadSuccess(result, "image", "poster")
              }
            >
              {({ open }) => (
                <Button
                  onClick={() => open()}
                  type="button"
                  className="relative inline-flex items-center gap-2 bg-white text-[#0F1116] font-bold text-sm w-full py-2 px-4 mb-4 mt-4 border-2 border-black rounded-lg hover:bg-white"
                >
                  <IoMdAddCircle size={20} />
                  <span>{imageUrl ? "Change Image" : "Add Images"}</span>
                </Button>
              )}
            </CldUploadWidget>
          )}
          {errors.poster_image && (
            <FormErrorText errorText={errors.poster_image.message} />
          )}
        </div>
      </div>

      {/* Upload Song Image */}
      <div className="grid grid-cols-1 gap-6">
        <div className="w-full relative z-0">
          <Label htmlFor="song_image" className="mb-1 block">
            Upload Song Image
          </Label>
          {typeof window !== undefined && (
            <CldUploadWidget
              signatureEndpoint="/api/sign-image"
              uploadPreset="white-room-image"
              options={{
                multiple: false,
                clientAllowedFormats: ["png", "jpeg", "jpg", "gif"],
                maxFileSize: 10485760,
              }}
              onSuccess={(result) =>
                handleUploadSuccess(result, "image", "song-image")
              }
            >
              {({ open }) => (
                <Button
                  onClick={() => open()}
                  type="button"
                  className="relative inline-flex items-center gap-2 bg-white text-[#0F1116] font-bold text-sm w-full py-2 px-4 mb-4 mt-4 border-2 border-black rounded-lg hover:bg-white"
                >
                  <IoMdAddCircle size={20} />
                  <span>{songImageUrl ? "Change Image" : "Add Images"}</span>
                </Button>
              )}
            </CldUploadWidget>
          )}
          {errors.song_image && (
            <FormErrorText errorText={errors.song_image.message} />
          )}
        </div>
      </div>

      {/* Song Upload */}
      <div className="grid grid-cols-1 gap-6">
        <div className="w-full relative z-0">
          <Label htmlFor="poster_song" className="mb-2 block">
            Upload Song File
          </Label>
          <Textarea
            placeholder="Add Song Iframe"
            id="poster_song"
            {...register("poster_song")}
            className={"resize-none h-40"}
          />
          {/* {typeof window !== undefined && (
                        <CldUploadWidget
                            signatureEndpoint="/api/sign-image"
                            uploadPreset="white-room-audio"
                            options={{
                                multiple: false,
                                resourceType: "video", // Cloudinary treats audio as a "video" resource
                                clientAllowedFormats: ["mp3", "wav", "flac", "aac", "ogg", "m4a"],
                                maxFileSize: 52428800, // e.g. 50MB
                            }}
                            onSuccess={(result) => handleUploadSuccess(result, "song")}
                        >
                            {({ open }) => (
                                <Button
                                    onClick={() => open()}
                                    type="button"
                                    className="relative inline-flex items-center gap-2 bg-white text-[#0F1116] font-bold text-sm w-full py-2 px-4 mb-4 mt-4 border-2 border-black rounded-lg hover:bg-white"
                                >
                                    <IoMdAddCircle size={20} />
                                    <span>{songUrl ? "Change Song" : "Upload Song"}</span>
                                </Button>
                            )}
                        </CldUploadWidget>
                    )} */}
          {errors.poster_song && (
            <FormErrorText errorText={errors.poster_song.message} />
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-32"
          disabled={isCreatingPressCoverage || isUpdatingCoverage}
        >
          {isCreatingPressCoverage || isUpdatingCoverage ? (
            <Loader />
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddPressCoverageForm;
