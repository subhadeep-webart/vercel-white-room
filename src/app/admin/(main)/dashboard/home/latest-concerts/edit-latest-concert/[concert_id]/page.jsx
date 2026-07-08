"use client";

import LatestConcertForm from "@/components/admin/_components/home/LatestConcertForm";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import useGetConcertById from "@/hooks/useGetConcertById";
import { useParams } from "next/navigation";

const EditConcertPage = () => {
  const params = useParams();
  const { concert_id } = params;

  const { concert, loading: isConcertDetailsLoading } =
    useGetConcertById(concert_id);

  if (isConcertDetailsLoading) {
    return <AdminPageLoader content={"Loading the concert details"} />;
  }
  return (
    <div className="p-3 bg-[#f0f3f8]">
      <div className="max-w-full p-6 rounded-md space-y-6">
        <LatestConcertForm isEdited={true} defaultValues={concert || {}} />
      </div>
    </div>
  );
};

export default EditConcertPage;
