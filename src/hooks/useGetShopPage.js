import { useState, useEffect, useCallback } from "react";

export function useGetShopPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/pages/shop", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch shop page");
      const page = await res.json();
      console.log("Page Data====>", page);
      // if (type) {
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

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
