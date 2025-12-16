import { useState, useCallback } from "react";
import { toast } from "sonner";

export default function useDeleteMediaById(refetch) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleDeleteMedia = useCallback(async (_id) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch("/api/pages/media", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id }),
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Delete failed");
            setSuccess(true);
            refetch();
            toast.success("Media Deleted Successfully");
            return json;
        } catch (err) {
            toast.error("Media Deletion Failed");
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return { handleDeleteMedia, loading, error, success };
}
