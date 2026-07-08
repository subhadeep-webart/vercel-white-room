import { useCallback, useEffect, useState } from "react";

export function useGetBookingPageContent(type) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Define refetch as a memoized function
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/pages/booking-us", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch booking page");
      const page = await res.json();

      if (type) {
        const requiredSection = page.components.find((c) => c.type === type);
        setData(requiredSection ? requiredSection.data : null);
      } else {
        // No type provided, return full components array
        setData(page);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [type]);

  // ✅ Fetch on mount and when `type` changes
  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
