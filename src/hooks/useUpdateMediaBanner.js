import { useState } from "react";
import { toast } from "sonner";

export function useUpdateMediaBanner() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    async function handleUpdateMediaBanner(data) {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch("/api/pages/media/banner", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errData = await res.json();
                toast.error(`Failed to update banner: ${errData.error}`);
                throw new Error(errData.error || "Failed to update banner");
            }

            toast.success("Media banner updated successfully");
            setSuccess(true);
        } catch (err) {
            toast.error(`Error occurred: ${err?.message}`);
            setError(err?.message);
        } finally {
            setLoading(false);
        }
    }

    return { handleUpdateMediaBanner, loading, error, success };
}
