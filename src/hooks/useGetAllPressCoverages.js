import { useState, useEffect } from "react";

export default function useGetAllPressCoverages() {
    const [coverages, setCoverages] = useState([]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPressCoverages = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/pages/home/press-coverage");
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Failed to load press coverages");
            setCoverages(json.coverages);
            setTitle(json.title || "");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPressCoverages();
    }, []);

    return { coverages, loading, error, title, refetch: fetchPressCoverages };
}
