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
import { forLargerShowsValidationSchema } from "@/utils/formValidationSchema";
import useUpdateBookingPageComponent from "@/hooks/useUpdateBookingPageComponent";
import RichTextEditor from "@/components/common/RichTextEditor";
import { Textarea } from "@/components/ui/textarea";

const CldUploadWidget = dynamic(
    () => import("next-cloudinary").then((mod) => mod.CldUploadWidget),
    { ssr: false }
);

const ForLargerShowsForm = ({ defaultValues = {}, refetch }) => {
    const { handleUpdateBookingPageComponent, loading: isUpdatingBookingPageComponent } = useUpdateBookingPageComponent(refetch);
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
        resolver: yupResolver(forLargerShowsValidationSchema),
        defaultValues: {
            title: defaultValues?.title || "",
            description: defaultValues?.description || "",
            section_image_url: defaultValues?.section_image_url || "",
            subsection1_title: defaultValues?.subsection1_title || "",
            subsection1_description: defaultValues?.subsection1_title || "",
            subsection2_title: defaultValues?.subsection2_title || "",
            subsection2_description: defaultValues?.subsection2_description || ""
        },
    });

    // Populate form when defaultValues change (for edit mode)
    useEffect(() => {
        if (defaultValues) {
            reset({
                title: defaultValues?.title || "",
                description: defaultValues?.description || "",
                section_image_url: defaultValues?.section_image_url || "",
                subsection1_title: defaultValues?.subsection1_title || "",
                subsection1_description: defaultValues?.subsection1_title || "",
                subsection2_title: defaultValues?.subsection2_title || "",
                subsection2_description: defaultValues?.subsection2_description || ""
            });
            setImageUrl(defaultValues?.section_image_url || "");
        }
    }, []);

    const handleUploadSuccess = (result) => {
        if (result.event === "success") {
            const uploadedUrl = result.info?.secure_url;
            if (!uploadedUrl) return;
            setImageUrl(uploadedUrl);
            setValue("section_image_url", uploadedUrl);
        }
    };

    const onSubmit = async (data) => {
        try {
            const payload = { type: "larger_shows", data: data }
            await handleUpdateBookingPageComponent(payload);
            setImageUrl("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Image Upload */}
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
                        placeholder="Add Section Title"
                        {...register("title")}
                    />
                    {errors.title && (
                        <FormErrorText errorText={errors.title.message} />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 w-full">
                <Label htmlFor="description" className="mb-2 block">
                    Section Description
                </Label>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <RichTextEditor value={field.value} onChange={field.onChange} />
                    )}
                />
                {errors.description && (
                    <FormErrorText errorText={errors.description.message} />
                )}
            </div>

            <div className="w-full bg-white shadow-2xl space-y-4 my-2 font-semibold text-lg px-8 py-4 rounded-2xl">
                <p className="text-md font-semibold text-black my-4">Subsection 1</p>
                <div className="grid grid-cols-1 gap-6">
                    <div className="w-full relative">
                        <Label htmlFor="subsection1_title" className="mb-1 block">
                            Title
                        </Label>
                        <Input
                            id="subsection1_title"
                            placeholder="Add Concert Name"
                            {...register("subsection1_title")}
                        />
                        {errors.subsection1_title && (
                            <FormErrorText errorText={errors.subsection1_title.message} />
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="w-full relative">
                        <Label htmlFor="subsection1_description" className="mb-1 block">
                            Subsection(1) Description
                        </Label>
                        <Textarea
                            row={4}
                            id="subsection1_description"
                            placeholder="Add Concert Name"
                            {...register("subsection1_description")}
                        />
                        {errors.subsection1_description && (
                            <FormErrorText errorText={errors.subsection1_description.message} />
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full bg-white shadow-2xl space-y-4 my-2 font-semibold text-lg px-8 py-4 rounded-2xl">
                <p className="text-md font-semibold text-black  my-4">Subsection 2</p>
                <div className="grid grid-cols-1 gap-6">
                    <div className="w-full relative">
                        <Label htmlFor="subsection2_title" className="mb-1 block">
                            Subsection(2)
                        </Label>
                        <Input
                            id="subsection2_title"
                            placeholder="Add Subsection2 Title"
                            {...register("subsection2_title")}
                        />
                        {errors.subsection2_title && (
                            <FormErrorText errorText={errors.subsection2_title.message} />
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="w-full relative">
                        <Label htmlFor="subsection2_description" className="mb-1 block">
                            Description
                        </Label>
                        <Textarea
                            row={4}
                            id="subsection2_description"
                            placeholder="Add Concert Name"
                            {...register("subsection2_description")}
                        />
                        {errors.subsection2_description && (
                            <FormErrorText errorText={errors.subsection2_description.message} />
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    className="w-32"
                    disabled={isUpdatingBookingPageComponent}
                >
                    {isUpdatingBookingPageComponent ? <Loader /> : "Save"}
                </Button>
            </div>
        </form>
    );
};

export default ForLargerShowsForm;
