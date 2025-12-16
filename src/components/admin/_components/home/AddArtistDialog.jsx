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
import { Label } from "@/components/ui/label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorText from "../forms/FormErrorText";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/common/Loader";

const schema = yup.object().shape({
    artist_name: yup
        .string()
        .required("Artist Name is required"),
});

const AddArtistDialog = ({ openAddContent, setOpenAddContent, submitHandler, isAddArtistLoading }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            artist_name: ""
        },
    });

    const onSubmit = async (data) => {
        console.log("Form submitted with data:", data);
        await submitHandler(data);
        reset();
        setOpenAddContent(false);
    };

    return (
        <Dialog open={openAddContent} onOpenChange={setOpenAddContent}>
            <DialogContent className="bg-[#f0f3f8] !max-w-1/3 !w-full overflow-visible z-[50]">
                <DialogHeader className="flex justify-between items-center">
                    <DialogTitle className="text-lg font-semibold">
                        Add Artist Name
                    </DialogTitle>
                </DialogHeader>

                <div className="max-w-full p-6 rounded-md space-y-6">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="w-full relative">
                                <Label htmlFor="artist_name" className="mb-1 block">
                                    Arist Name
                                </Label>
                                <Input
                                    id="artist_name"
                                    placeholder="Add Artist Name"
                                    {...register("artist_name")}
                                />
                                {errors.artist_name && (
                                    <FormErrorText errorText={errors.artist_name.message} />
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" className="w-32" disabled={isAddArtistLoading}>
                                {isAddArtistLoading ? <Loader /> : "Submit"}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddArtistDialog;
