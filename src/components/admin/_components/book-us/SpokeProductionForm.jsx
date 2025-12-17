"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorText from "@/components/admin/_components/forms/FormErrorText";
import { Loader } from "@/components/common/Loader";
import { Input } from "@/components/ui/input";
import { spokeProductionFormValidationSchema } from "@/utils/formValidationSchema";
import useUpdateBookingPageComponent from "@/hooks/useUpdateBookingPageComponent";
import RichTextEditor from "@/components/common/RichTextEditor";
import { toast } from "sonner";

const SpokeProductionForm = ({ defaultValues = {}, refetch }) => {
    const { handleUpdateBookingPageComponent, loading: isUpdatingBookingPage } = useUpdateBookingPageComponent(refetch);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm({
        resolver: yupResolver(spokeProductionFormValidationSchema),
        defaultValues: {
            title: defaultValues?.title || "",
            description: defaultValues?.description || "",
            buttonText: defaultValues?.buttonText || "",
            buttonUrl: defaultValues?.buttonUrl || "",
        },
    });

    // Populate form when defaultValues change (for edit mode)

    useEffect(() => {
        if (defaultValues && Object.keys(defaultValues).length > 0) {

            const { title = "", description = "", buttonText = "", buttonUrl = "" } = defaultValues;

            reset({ title, description, buttonText, buttonUrl });
        }
    }, [defaultValues, reset]);

    const onSubmit = async (data) => {
        try {
            const payload = { type: "spoke_production", data: data }
            await handleUpdateBookingPageComponent(payload);
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <form className="space-y-6 bg-white px-8 py-6 shadow-2xl rounded-2xl" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6">
                <div className="w-full relative">
                    <Label htmlFor="title" className="mb-2 block">
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

            <div className="grid grid-cols-1 gap-6">
                <div className="w-full relative">
                    <Label htmlFor="buttonText" className="mb-2 block">
                        Button Text
                    </Label>
                    <Input
                        id="buttonText"
                        placeholder="Add Section Button Text"
                        {...register("buttonText")}
                    />
                    {errors.buttonText && (
                        <FormErrorText errorText={errors.buttonText.message} />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div className="w-full relative">
                    <Label htmlFor="buttonUrl" className="mb-2 block">
                        Button Link
                    </Label>
                    <Input
                        type={"url"}
                        id="buttonUrl"
                        placeholder="Add Section buttonUrl"
                        {...register("buttonUrl")}
                    />
                    {errors.buttonUrl && (
                        <FormErrorText errorText={errors.buttonUrl.message} />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 w-full">
                <Label htmlFor="about-description" className="mb-2 block">
                    Section Description
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
                    className="w-32"
                >
                    {isUpdatingBookingPage ? <Loader /> : "Save"}
                </Button>
            </div>
        </form>
    );
};

export default SpokeProductionForm;
