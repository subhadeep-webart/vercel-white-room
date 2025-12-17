"use client"
import { useState } from "react";
import { toast } from "sonner";

export function usePostAboutUsImages() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    async function handlePostAboutUsImages(data) {
        setLoading(true);
        setError(null);
        setSuccess(false);

        console.log("About images Data=======>",data);

        try {
            const res = await fetch("/api/pages/about", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "about_us_images",
                    url:data,
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                toast.error(`Failed to Update About section images ${errData.error}`)
                throw new Error(errData.error || "Failed to update About page");
            }
            toast.success(`About Images Updated Successfully`);
            setSuccess(true);
        } catch (err) {
            toast.error(`Error Occured ! ${err?.message}`)
            setError(err?.message);
        } finally {
            setLoading(false);
        }
    }

    return { handlePostAboutUsImages, loading, error, success };
}
