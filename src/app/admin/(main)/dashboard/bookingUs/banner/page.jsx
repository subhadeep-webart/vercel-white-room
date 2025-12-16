"use client"

import CommonBannerForm from "@/components/admin/_components/common/CommonBannerForm";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { useGetBookingUsPageContent } from "@/hooks/useGetBookingUsPageContent";
import useUpdateBookingPageComponent from "@/hooks/useUpdateBookingPageComponent";
import { toast } from "sonner";

const BannerPage = () => {
    const { data, loading: isBannerContentLoading } = useGetBookingUsPageContent("banner")
    const { handleUpdateBookingPageComponent, loading: isBannerLoading, refetch } = useUpdateBookingPageComponent();
    const onBannerSubmit = async (data) => {
        const payload = {
            type: "banner",
            data,
        };

        await handleUpdateBookingPageComponent(payload, refetch);
        toast.success("Booking process updated successfully.");
    };

    if (isBannerContentLoading) {
        return <AdminPageLoader content={"Loading Booking Us Banner Content"} />
    }
    return (
        <div className="p-3 bg-[#f0f3f8] min-h-screen">
            <div className="flex py-2 justify-between gap-2 items-center">
                <p className="text-black text-xl font-semibold my-4">Booking Us Page Banner Content</p>
            </div>
            <CommonBannerForm defaultValues={data ?? {}} onSubmitHandler={onBannerSubmit} isLoading={isBannerLoading}/>
        </div>
    )
}

export default BannerPage;