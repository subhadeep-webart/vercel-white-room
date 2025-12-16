// hooks/useSubmitReview.js

import { nanoid } from "nanoid";
import { useState } from "react";
import { toast } from "sonner";

const useAddReview = (refetch) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmitReview = async ({ reviewer_name, ratings, reviews, reviewer_position }) => {
        setLoading(true);
        setError(null);

        try {
            const payload = {
                name: reviewer_name,
                rating: Number(ratings),
                comment: reviews,
                position: reviewer_position,
                _id: nanoid()
            }


            const res = await fetch("/api/pages/home/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errData = await res.json();
                toast.error("Failed to submit review")
                throw new Error(errData.error || "Failed to submit review");
            }

            const result = await res.json();
            toast.success(`Review Submission Successfully`);
            refetch();
            return { success: true, data: result };
        } catch (err) {
            console.error("Review submission error:", err);
            setError(err.message);
            toast.error(`Review Submission Failed ${err.message}`)
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    return {
        handleSubmitReview,
        loading,
        error,
    };
};

export default useAddReview;
