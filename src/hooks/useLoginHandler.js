import { useState } from "react";
import { useRouter } from "next/navigation";

export const useLoginHandler = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const router = useRouter();

    const handleLoginFormSubmit = async (payload) => {
        setIsSubmitting(true);
        setErrorMessage("");
        setSuccessMessage("");

        console.log("Payload", payload);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            console.log("Result========>abc", result);

            // if (!res.ok) {
            //     throw new Error(result.message || "Login failed");
            // }
            if (result?.success) {
                setSuccessMessage(result?.msg);
                return { success: true, data: result.data };
            } else {
                setErrorMessage(result?.error ?? "Login Failed");
                return { success: false, error: result.error };
            }
        } catch (err) {
            console.log("Err====>", err);
            setErrorMessage(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        handleLoginFormSubmit,
        isSubmitting,
        errorMessage,
        successMessage,
    };
};
