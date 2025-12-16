"use client"

import CommonBannerForm from "@/components/admin/_components/common/CommonBannerForm";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { useGetAboutPageContent } from "@/hooks/useGetAboutPageContent";
import { useUpdateAboutBanner } from "@/hooks/useUpdateAboutBanner";
import { useUpdateAboutUsPage } from "@/hooks/useUpdateAboutUsPage";
import useUpdateBookingPageComponent from "@/hooks/useUpdateBookingPageComponent";
import { getComponentByType } from "@/utils/helper";
import { toast } from "sonner";

const BannerPage = () => {
    const { data, loading: isBannerContentLoading } = useGetAboutPageContent()

    const bannerContent = getComponentByType(data, "banner");

    console.log("Banner Content=====>", bannerContent);

    const { handleAboutBanner, loading: isAboutBannerLoading, refetch } = useUpdateAboutBanner();
    const onBannerSubmit = async (data) => {
        const payload = {
            type: "banner",
            data,
        };

        await handleAboutBanner(payload, refetch);
    };

    if (isBannerContentLoading) {
        return <AdminPageLoader content={"Loading About Us Banner Content"} />
    }
    return (
        <div className="p-3 bg-[#f0f3f8] min-h-screen">
            <div className="flex py-2 justify-between gap-2 items-center">
                <p className="text-black text-xl font-semibold my-4">About Us Page Banner Content</p>
            </div>
            <CommonBannerForm defaultValues={bannerContent ?? {}} onSubmitHandler={onBannerSubmit} isLoading={isAboutBannerLoading} />
        </div>
    )
}

export default BannerPage;