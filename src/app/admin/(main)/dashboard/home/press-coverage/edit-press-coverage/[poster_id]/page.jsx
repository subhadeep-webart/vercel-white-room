"use client";

import AddPressCoverageForm from "@/components/admin/_components/home/AddPressCoverageForm";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import useGetCoverageById from "@/hooks/useGetCoverageById";
import { useParams } from "next/navigation";

const EditPressCoverage = () => {
  const params = useParams();
  const { poster_id } = params;

  const { coverage, loading: isCoverageDetailsLoaeding } =
    useGetCoverageById(poster_id);

  if (isCoverageDetailsLoaeding) {
    return <AdminPageLoader content={"Loading Coverage Details"} />;
  }
  return (
    <div className="p-3 bg-[#f0f3f8]">
      <div className="max-w-full p-6 rounded-md space-y-6">
        <AddPressCoverageForm isEdited={true} defaultValues={coverage || {}} />
      </div>
    </div>
  );
};

export default EditPressCoverage;
