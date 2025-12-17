import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { toast } from "sonner";

export default function useUpdateOnTheDayContent(refetch) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleUpdateOnTheDayContent = useCallback(async (payload) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch("/api/pages/on-the-day", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error("Content Updation Failed")
                throw new Error(data.error || "Failed to update on the day content");
            }
            toast.success("Content Updated Successfully");
            router.push("/admin/dashboard/on-the-day/content")
            setSuccess(true);

            // ✅ Call refetch only if provided
            if (typeof refetch === "function") {
                await refetch();
            }

            return data;
        } catch (err) {
            console.error("Error updating media asset:", err);
            toast.error("Content Updation Failed")
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [refetch]);

    return { handleUpdateOnTheDayContent, loading, error, success };
}
