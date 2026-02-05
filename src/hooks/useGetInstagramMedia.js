"use client";

import { getInstagramMedia } from "@/server/getInstagramMedia";
import { useState, useEffect } from "react";

export function useGetInstagramMedia() {
  const [instagramMediaData, setInstagramMediaData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInstagramMedia = async () => {
      setLoading(true);
      try {
        const res = await getInstagramMedia();
        setInstagramMediaData(res);
      } catch (err) {
        console.error("Error fetching states", err);
        setInstagramMediaData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramMedia();
  }, []);

  return { instagramMediaData, loading };
}
