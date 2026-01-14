import { useState, useEffect, useCallback } from "react";

export function useGetAboutPageContent(type = "") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Define refetch as a memoized function
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/pages/about", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch about page");
      const page = await res.json();

      if (type) {
        console.log("Entry point")
        const requiredSection = page?.components.find((c) => { console.log("aaa", c); return c.type === type });
        console.log("required section==>", requiredSection);
        setData(requiredSection ? requiredSection.data : page);
      } else {
        setData(page ?? {});
      }

      // setData(page);
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

  // Function to get a specific section by its type
  // const getAboutSectionByType = (type) => {
  //   return data?.components?.find((c) => c.type === type)?.data || null;
  // };

  return { data, loading, error, refetch };
}
