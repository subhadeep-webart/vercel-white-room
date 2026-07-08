import { useState, useEffect, useCallback } from "react";

export function useGetTestimonialPageContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Define refetch as a memoized function
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/pages/testimonial", { cache: "no-store" });
      console.log("Response====>", res);
      if (!res.ok) throw new Error("Failed to fetch testimonial page");
      const page = await res.json();

      // const requiredSection = page.components.find((c) => c.type === type);
      // setData(requiredSection ? requiredSection.data : null);
      //  if (type) {
      //     const requiredSection = page?.components.find((c) => { return c.type === type });
      //     console.log("required section==>", requiredSection);
      //     setData(requiredSection ? requiredSection.data : page);
      // } else {
      //     setData(page ?? {});
      // }
      setData(page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Fetch on mount and when `type` changes
  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
