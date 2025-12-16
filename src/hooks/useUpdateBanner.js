import { useState } from "react";
import { toast } from "sonner";

export function useUpdateBanner() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    async function handleUpdateBanner(data) {
        setLoading(true);
        setError(null);
        setSuccess(false);

        console.log("Banner Data=======>",data);

        try {
            const res = await fetch("/api/pages/home/banner", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "banner_section",
                    data,
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                toast.error(`Failed to Update Banner section ${errData.error}`)
                throw new Error(errData.error || "Failed to update About page");
            }
            toast.success(`Banner Content Updated Successfully`);
            setSuccess(true);
        } catch (err) {
            toast.error(`Error Occured ! ${err?.message}`)
            setError(err?.message);
        } finally {
            setLoading(false);
        }
    }

    return { handleUpdateBanner, loading, error, success };
}
