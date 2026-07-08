import { useState, useEffect, useCallback } from "react";

export function useGetHomePageContent(type) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Define refetch as a memoized function
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/pages/home", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch home page");
      const page = await res.json();

      if (type) {
        const requiredSection = page?.components.find((c) => {
          return c.type === type;
        });
        console.log("required section==>", requiredSection);
        setData(requiredSection ? requiredSection.data : page);
      } else {
        setData(page ?? {});
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

// import { useState, useEffect, useCallback } from "react";

// export function useGetHomePageContent() {
//   const [data, setData] = useState(null);  // To store all the fetched data
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Refetch function to get the data
//   const refetch = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch("/api/pages/home", { cache: "no-store" });
//       if (!res.ok) throw new Error("Failed to fetch home page");
//       const page = await res.json();

//       // Store the full response data in state
//       setData(page);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Fetch data on mount and whenever refetch is called
//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   // Function to get a specific section by its type
//   // const getHomeSectionByType = (type) => {
//   //   return data?.components?.find((c) => c.type === type)?.data || null;
//   // };

//   return { data, loading, error, refetch };
// }
