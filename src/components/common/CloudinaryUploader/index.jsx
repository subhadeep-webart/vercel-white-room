"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { IoMdAddCircle } from "react-icons/io";

const CldUploadWidget = dynamic(
    () => import("next-cloudinary").then((mod) => mod.CldUploadWidget),
    { ssr: false }
);

const CloudinaryUploader = ({ onUpload, imageUrl }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <CldUploadWidget
            signatureEndpoint="/api/sign-image"
            uploadPreset="white-room-image"
            options={{
                multiple: false,
                clientAllowedFormats: ["png", "jpeg", "jpg", "gif", "mp4", "mov", "webm"],
                maxFileSize: 10485760,
                resourceType: "auto",
                modal: true,
            }}
            onSuccess={(result) => {
                if (result.event === "success") {
                    onUpload(result.info);
                }
            }}
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
    );
};

export default CloudinaryUploader;
