import { useState, useCallback } from "react";
import { toast } from "sonner";;

export default function useDeleteArtist(refetch) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleDeleteArtist = useCallback(async (payload) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch("/api/pages/home/artist-section", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Delete failed");
            setSuccess(true);
            refetch();
            toast.success("Artist Name Deleted Successfully");
            return json;
        } catch (err) {
            toast.error("Artist Name Deletion Failed");
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return { handleDeleteArtist, loading, error, success };
}
