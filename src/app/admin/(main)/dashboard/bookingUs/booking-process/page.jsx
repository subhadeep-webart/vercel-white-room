"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGetBookingUsPageContent } from "@/hooks/useGetBookingUsPageContent";
import useUpdateBookingPageComponent from "@/hooks/useUpdateBookingPageComponent";
import { CirclePlus, Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { Loader } from "@/components/common/Loader";

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
});


const BookingProcessSection = () => {
    const { data: bookingProcessPageContent, loading: isPageContentLoading, refetch } =
        useGetBookingUsPageContent("booking_process");

    const { handleUpdateBookingPageComponent, loading: isBookingPageUpdating } =
        useUpdateBookingPageComponent(refetch);

    const [bookingSteps, setBookingSteps] = useState(bookingProcessPageContent?.booking_steps ?? []);
    const [isEditing, setIsEditing] = useState(null);
    const [newStep, setNewStep] = useState("");
    const [editingStepValue, setEditingStepValue] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
        },
    });

    const handleEdit = (index) => {
        setIsEditing(index);
        setEditingStepValue(bookingSteps[index]);
    };

    const handleSaveEdit = (index) => {
        const updatedSteps = [...bookingSteps];
        updatedSteps[index] = editingStepValue;
        setBookingSteps(updatedSteps);
        setIsEditing(null);
        setEditingStepValue("");
        toast.success("Step edited locally. Don't forget to save.");
    };

    const handleDelete = (index) => {
        const updatedSteps = bookingSteps.filter((_, i) => i !== index);
        setBookingSteps(updatedSteps);
        toast.success("Step removed locally. Don't forget to save");
    };

    const handleAddStep = () => {
        if (newStep.trim() === "") return;
        setBookingSteps([...bookingSteps, newStep.trim()]);
        setNewStep("");
        toast.success("Step added locally. Don't forget to save.");
    };

    // === Submit Handler ===
    const onSubmit = async (data) => {
        const payload = {
            type: "booking_process",
            data: {
                title: data.title,
                booking_steps: bookingSteps,
            },
        };

        await handleUpdateBookingPageComponent(payload);
        toast.success("Booking process updated successfully.");
    };

    useEffect(() => {
        if (bookingProcessPageContent) {
            setValue("title", bookingProcessPageContent?.title ?? ""); // Set form title
            setBookingSteps(bookingProcessPageContent?.booking_steps ?? []); // Set steps
        }
    }, [bookingProcessPageContent, setValue]);

    console.log("Booking Psage Content", bookingProcessPageContent);
    if (isPageContentLoading) {
        return <AdminPageLoader content={"Loading Booking Process Content"} />
    }

    return (
        <div className="p-3 bg-[#f0f3f8] min-h-screen">
            <p className="text-black text-xl font-semibold my-4">Booking Process Page Content</p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full bg-white shadow-2xl px-4 py-6 flex flex-col gap-6 rounded-md"
            >
                <div>
                    <Label htmlFor="title" className="mb-2 block">
                        Booking Process Title
                    </Label>
                    <Textarea
                        id="title"
                        placeholder="Add Booking Process Title"
                        rows={2}
                        {...register("title")}
                    />
                    {errors.title && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Booking Steps */}
                <div className="w-full">
                    {/* Add New Step */}
                    <div className="flex gap-1 justify-start items-center">
                        <Input
                            value={newStep}
                            onChange={(e) => setNewStep(e.target.value)}
                            placeholder="Add new step"
                            className="py-3"
                        />
                        <Button
                            type="button"
                            className="relative inline-flex items-center gap-2 bg-white text-[#0F1116] font-bold text-sm w-32 py-2 px-4 mb-4 mt-4 
              border-2 border-black overflow-hidden transition-all duration-300 hover:text-white whitespace-nowrap text-center rounded-lg"
                            onClick={handleAddStep}
                        >
                            <IoMdAddCircle size={20} />
                            <span>Add Step</span>
                        </Button>
                    </div>

                    <Label htmlFor="booking-steps" className="mb-2 block">
                        Booking Steps
                    </Label>
                    <div className="flex flex-col gap-4 bg-white shadow-2xl py-2 px-2">
                        {bookingSteps.map((step, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-12 gap-2 items-center"
                            >
                                <div className="col-span-11">
                                    {isEditing === index ? (
                                        <Input
                                            value={editingStepValue}
                                            onChange={(e) => setEditingStepValue(e.target.value)}
                                            className="py-3"
                                        />
                                    ) : (
                                        <p className="text-gray-800 text-sm py-2 px-3 bg-gray-100 rounded">
                                            <span className="font-semibold">{`${index + 1}.`}</span>{" "}
                                            {step}
                                        </p>
                                    )}
                                </div>
                                <div className="col-span-1 flex justify-end gap-1">
                                    {isEditing === index ? (
                                        <button
                                            onClick={() => handleSaveEdit(index)}
                                            title="Save"
                                            className="text-green-600"
                                            type="button"
                                        >
                                            <CirclePlus size={18} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(index)}
                                            title="Edit"
                                            className="text-blue-600"
                                            type="button"
                                        >
                                            <Pen size={18} />
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(index)}
                                        title="Delete"
                                        className="text-red-600"
                                        type="button"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button type="submit" className="w-32" disabled={isBookingPageUpdating}>
                        {isBookingPageUpdating ? <Loader /> : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BookingProcessSection;
