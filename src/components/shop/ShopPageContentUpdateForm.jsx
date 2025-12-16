"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorText from "@/components/admin/_components/forms/FormErrorText";
import { Loader } from "@/components/common/Loader";
import { Input } from "@/components/ui/input";
import { shopPageValidationSchema } from "@/utils/formValidationSchema";
import RichTextEditor from "@/components/common/RichTextEditor";
import useUpdateShopContent from "@/hooks/useUpdateShopContent";


const ShopPageContentUpdateForm = ({ defaultValues = {} ,refetch}) => {
    const { handleUpdateShopContent, loading: isUpdatingShopContent } = useUpdateShopContent(refetch);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm({
        resolver: yupResolver(shopPageValidationSchema),
        defaultValues: {
            description: "",
            title: "",
            button_text: "",
            button_url: ""
        },
    });

    // Populate form when defaultValues change (for edit mode)
    useEffect(() => {
        if (defaultValues && Object.keys(defaultValues)?.length > 0) {
            reset({
                title: defaultValues?.title || "",
                description: defaultValues?.description || "",
                button_text: defaultValues?.button_text || "",
                button_url: defaultValues?.button_url || ""
            });
        }
    }, [defaultValues, reset]);

    const onSubmit = async (data) => {
        try {

            const payload ={
                        type: "contents",
                        data
                    }
              
          
            await handleUpdateShopContent(payload)
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form className="space-y-6 bg-white py-4 px-4 shadow-2xl" onSubmit={handleSubmit(onSubmit)}>
            {/* Concert Name */}
            <div className="grid grid-cols-1 gap-6">
                <div className="w-full relative">
                    <Label htmlFor="title" className="mb-1 block">
                        Page Title
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

            <div className="grid grid-cols-1 gap-6">
                <div className="w-full relative">
                    <Label htmlFor="button_text" className="mb-1 block">
                        Section Button Text
                    </Label>
                    <Input
                        id="button_text"
                        placeholder="Section Button Text"
                        {...register("button_text")}
                    />
                    {errors.button_text && (
                        <FormErrorText errorText={errors.button_text.message} />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div className="w-full relative">
                    <Label htmlFor="button_url" className="mb-1 block">
                        Section Button Url
                    </Label>
                    <Input
                        id="button_url"
                        placeholder="Section Button Url"
                        {...register("button_url")}
                    />
                    {errors.button_url && (
                        <FormErrorText errorText={errors.button_url.message} />
                    )}
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    className="w-32"
                    disabled={isUpdatingShopContent}
                >
                    {isUpdatingShopContent ? <Loader /> : "Save"}
                </Button>
            </div>
        </form>
    );
};

export default ShopPageContentUpdateForm;
