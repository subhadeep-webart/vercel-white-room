import { useState, useEffect } from "react";

export default function useGetMediaById(id) {
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchMedia = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/pages/media/${id}`);
        const data = await res.json();
        console.log("Data====>", data);
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch media");
        }

        setMedia(data?.media_asset ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [id]);

  return { media, loading, error };
}
