"use client";
export const ssr = false;
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IoMdAddCircle } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorText from "@/components/admin/_components/forms/FormErrorText";
import { Loader } from "@/components/common/Loader";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { addOnthePageContentValidationSchema } from "@/utils/formValidationSchema";
import useUpdateMediaFile from "@/hooks/useUpdateMediaFile";
import RichTextEditor from "@/components/common/RichTextEditor";
import useAddOnTheDaySection from "@/hooks/useAddOnTheDaySection";
import useUpdateOnTheDayContent from "@/hooks/useUpdateOnTheDayContent";

const CldUploadWidget = dynamic(
    () => import("next-cloudinary").then((mod) => mod.CldUploadWidget),
    { ssr: false }
);

const OnTheDayContentForm = ({ isEdited = false, defaultValues = {} }) => {
    const { handleAddOnTheDaySection, loading: isNewSectionAdded } = useAddOnTheDaySection();
    const { handleUpdateOnTheDayContent, loading: isUpdating } = useUpdateOnTheDayContent();
    const [imageUrl, setImageUrl] = useState(
        defaultValues?.section_image_url || ""
    );

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        control
    } = useForm({
        resolver: yupResolver(addOnthePageContentValidationSchema),
        defaultValues: {
            section_image_url: "",
            description: "",
            title: ""
        },
    });

    // Populate form when defaultValues change (for edit mode)
    useEffect(() => {
        if (isEdited && defaultValues && Object.keys(defaultValues).length > 0) {
            reset({
                section_image_url: defaultValues.section_image_url || "",
                title: defaultValues.title || "",
                description: defaultValues.description || "",
            });
            setImageUrl(defaultValues.section_image_url || "");
        }
    }, [defaultValues, isEdited, reset]);

    const handleUploadSuccess = (result) => {
        if (result.event === "success") {
            console.log("Result getting from url======>", result);
            const uploadedUrl = result.info?.secure_url;
            const type = result.info?.resource_type;
            if (!uploadedUrl || !type) return;
            setImageUrl(uploadedUrl);
            setValue("section_image_url", uploadedUrl);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (isEdited) {
                await handleUpdateOnTheDayContent({ ...data, _id: defaultValues?._id });
            } else {
                await handleAddOnTheDaySection({ data })
            }
            setImageUrl("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form className="space-y-6 bg-white py-4 px-4 shadow-2xl" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6">
                {/* Label outside */}
                <Label htmlFor="file_url" className="mb-1 block">
                    Upload Section Image
                </Label>

                <div className="w-full relative z-0 min-h-52 border-2 border-dashed border-gray-500 rounded-md px-4 py-4">
                    {/* Show image preview if exists */}
                    {imageUrl &&
                        <img
                            src={imageUrl}
                            alt="Uploaded"
                            className="w-full max-h-52 object-contain rounded"
                        />}
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
                                    "webp"
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
                    <Label htmlFor="title" className="mb-1 block">
                        Section Title
                    </Label>
                    <Input
                        id="title"
                        placeholder="Section Title"
                        {...register("title")}
                    />
                    {errors.title && (
                        <FormErrorText errorText={errors.title.message} />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 w-full">
                <Label htmlFor="about-description" className="mb-1 block">
                    Description
                </Label>
                <Controller
                    name="description"
                    control={control}
                    rules={{ required: "Description is required" }}
                    render={({ field }) => (
                        <RichTextEditor value={field.value} onChange={field.onChange} />
                    )}
                />
                {errors.description && (
                    <FormErrorText errorText={errors.description.message} />
                )}
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    className="w-40"
                    disabled={isNewSectionAdded || isUpdating}
                >
                    {isNewSectionAdded || isUpdating ? (
                        <Loader />
                    ) : isEdited ? (
                        "Edit Section Content"
                    ) : (
                        "Add New Section"
                    )}
                </Button>
            </div>
        </form>
    );
};

export default OnTheDayContentForm;
