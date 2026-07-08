import { useState, useEffect } from "react";

export function useGetBannerContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBannerContent() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/pages/home");
        if (!res.ok) throw new Error("Failed to fetch Banner page");
        const page = await res.json();

        const bannerSection = page.components.find(
          (c) => c.type === "banner_section"
        );
        setData(bannerSection ? bannerSection.data : null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBannerContent();
  }, []);

  return { data, loading, error };
}
