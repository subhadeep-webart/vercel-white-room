"use client"

import AddMediaForm from "@/components/admin/_components/media/AddMediaForm";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import useGetMediaById from "@/hooks/useGetMediaById";
import { useParams } from "next/navigation";

const EditMediaPage = () => {
    const params = useParams();
    const { id } = params;

    const { media, loading: isMediaContentLoading } = useGetMediaById(id);

    console.log("Data fetched======>", media);

    if (isMediaContentLoading) {
        return <AdminPageLoader content={"Loading media content"} />
    }

    return (
        <div className="p-3 bg-[#f0f3f8]">
            <div className="max-w-full p-6 rounded-md space-y-6">
                <AddMediaForm isEdited={true} defaultValues={media} />
            </div>
        </div>
    )
}

export default EditMediaPage;