import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useGetInstagramFeedHeader() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const fetchInstagramFeedHeader = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/pages/home/instagram-feed");

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to fetch Instagram Feed");
      }

      setTitle(json.title);
    } catch (err) {
      console.error(err);
      toast?.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstagramFeedHeader();
  }, []);

  return { title, loading, refetch: fetchInstagramFeedHeader };
}
