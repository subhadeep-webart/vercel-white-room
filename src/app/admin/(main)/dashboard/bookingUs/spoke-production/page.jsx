"use client"
import dynamic from "next/dynamic";

const SpokeProductionForm = dynamic(
  () => import("@/components/admin/_components/book-us/SpokeProductionForm"),
  { ssr: false }
);
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { useGetBookingUsPageContent } from "@/hooks/useGetBookingUsPageContent";

const SpokeProductionPage = () => {
    const { data: spokeProductionContent, loading: isSpokeProductionContentLoading, refetch } = useGetBookingUsPageContent("spoke_production");


    if (isSpokeProductionContentLoading) {
        return <AdminPageLoader content={"Spoke Production Section Content Loading"} />
    }

    console.log("Spoke Production Content======>", spokeProductionContent);
    return (
        <>
            <div className="p-3 bg-[#f0f3f8] min-h-screen">
                <p className="text-black text-xl font-semibold my-4">Be Spoke Section Content</p>
                <SpokeProductionForm defaultValues={spokeProductionContent ?? {}} refetch={refetch} />
            </div>
        </>
    )
}

export default SpokeProductionPage;

