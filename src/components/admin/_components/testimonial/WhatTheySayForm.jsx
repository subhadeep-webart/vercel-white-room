"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorText from "@/components/admin/_components/forms/FormErrorText";
import { Loader } from "@/components/common/Loader";
import { Input } from "@/components/ui/input";
import { whatTheySayValidationSchema } from "@/utils/formValidationSchema";
import { Textarea } from "@/components/ui/textarea";
import WhatTheySectionClientCard from "./WhatTheySectionClientCard";
import AddClientModal from "./AddClientModal";
import useUpdateTestimonialPage from "@/hooks/useUpdateTestimonialPage";
import { toast } from "sonner";


const WhatTheySayForm = ({ defaultValues = {}, refetch }) => {
    const { handleUpdateTestimonialPage, loading: isUpdatingTestimonial } = useUpdateTestimonialPage(refetch);
    const [openAddClientModal, setOpenAddClientModal] = useState(false);
    const [clientDetails, setClientDetails] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(whatTheySayValidationSchema),
        defaultValues: {
            title: defaultValues?.title || "",
            description: defaultValues?.description || "",
            button_text: defaultValues?.button_text || "",
            button_link: defaultValues?.button_link || "",
        },
    });

    useEffect(() => {
        if (defaultValues && Object.keys(defaultValues).length > 0) {
            reset({
                title: defaultValues?.title || "",
                description: defaultValues?.description || "",
                button_text: defaultValues?.button_text || "",
                button_link: defaultValues?.button_link || ""
            });

            if (defaultValues?.clients) {
                setClientDetails(defaultValues.clients);
            }
        }
    }, [defaultValues, reset]);


    const onSubmit = async (data) => {
        try {
            const payload = {
                type: "what_they_say",
                data: {
                    ...data,
                    clients: clientDetails,
                }
            };
            await handleUpdateTestimonialPage(payload);
        } catch (err) {
            toast.error("Something Went Wrong");
            console.error(err);
        }
    };

    const handleAddClient = (clientData) => {
        setClientDetails((prev) => [...prev, clientData]);
        setOpenAddClientModal(false);
    };

    return (
        <>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-6">
                    <div className="w-full relative">
                        <Label htmlFor="title" className="mb-1 block">Section Title</Label>
                        <Input id="title" placeholder="Add Section Title" {...register("title")} />
                        {errors.title && <FormErrorText errorText={errors.title.message} />}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 w-full">
                    <Label htmlFor="description" className="mb-2 block">Section Description</Label>
                    <Textarea id="description" placeholder="Add Section Description" {...register("description")} />
                    {errors.description && <FormErrorText errorText={errors.description.message} />}
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="w-full relative">
                        <Label htmlFor="button_text" className="mb-1 block">Section Button Text</Label>
                        <Input id="button_text" placeholder="Add Section Button Text" {...register("button_text")} />
                        {errors.button_text && <FormErrorText errorText={errors.button_text.message} />}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="w-full relative">
                        <Label htmlFor="button_link" className="mb-1 block">Section Button Link</Label>
                        <Input id="button_link" placeholder="Add Section Button Link" {...register("button_link")} />
                        {errors.button_link && <FormErrorText errorText={errors.button_link.message} />}
                    </div>
                </div>

                <div className="w-full">
                    <div className="w-full flex justify-end items-center">
                        <Button type="button" className="w-32 border-black" variant="outline" onClick={() => setOpenAddClientModal(true)}>
                            Add Client
                        </Button>
                    </div>

                    <div className="grid grid-cols-4 gap-6 mt-4">
                        {clientDetails.map((clientDetail, index) => (
                            <WhatTheySectionClientCard key={index} clientDetail={clientDetail} />
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button type="submit" className="w-32" disabled={isUpdatingTestimonial}>
                        {isUpdatingTestimonial ? <Loader /> : "Save"}
                    </Button>
                </div>
            </form>

            {openAddClientModal && (
                <AddClientModal
                    openAddClientModal={openAddClientModal}
                    setOpenAddClientModal={setOpenAddClientModal}
                    onClientAdd={handleAddClient}
                />
            )}
        </>
    );
};

export default WhatTheySayForm;
