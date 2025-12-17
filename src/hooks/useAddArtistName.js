// hooks/useSubmitReview.js

import { nanoid } from "nanoid";
import { useState } from "react";
import { toast } from "sonner";

const useAddArtistName = (refetch) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmitArtistName = async ({ artist_name }) => {
        setLoading(true);
        setError(null);

        try {
            const payload = {
                artist_name
            }


            const res = await fetch("/api/pages/home/artist-section", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errData = await res.json();
                toast.error("Failed to submit artist")
                throw new Error(errData.error || "Failed to submit artist");
            }

            const result = await res.json();
            toast.success(`Artist Submission Successfully`);
            refetch();
            return { success: true, data: result };
        } catch (err) {
            console.error("Artist submission error:", err);
            setError(err.message);
            toast.error(`Artist Submission Failed ${err.message}`)
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    return {
        handleSubmitArtistName,
        loading,
        error,
    };
};

export default useAddArtistName;
