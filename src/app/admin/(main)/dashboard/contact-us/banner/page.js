"use client"

import CommonBannerForm from "@/components/admin/_components/common/CommonBannerForm";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { useGetContactUsPageContent } from "@/hooks/useGetContactUsPageContent";
import useUpdateContactUsPageContent from "@/hooks/useUpdateContactUsPageContent";
import { toast } from "sonner";

const ContactusBannerPage = () => {
    const { data, loading: isBannerContentLoading } = useGetContactUsPageContent("banner")
    const { handleUpdateContactUsPageContent, loading: isBannerLoading, refetch } = useUpdateContactUsPageContent();
    const onBannerSubmit = async (data) => {
        const payload = {
            type: "banner",
            data,
        };

        await handleUpdateContactUsPageContent(payload, refetch);
        toast.success("Contact us page updated successfully.");
    };

    if (isBannerContentLoading) {
        return <AdminPageLoader content={"Loading Contact Us Page Banner Content"} />
    }
    return (
        <div className="p-3 bg-[#f0f3f8] min-h-screen">
            <div className="flex py-2 justify-between gap-2 items-center">
                <p className="text-black text-xl font-semibold my-4">Contact Us Page Banner Content</p>
            </div>
            <CommonBannerForm defaultValues={data ?? {}} onSubmitHandler={onBannerSubmit} isLoading={isBannerLoading} />
        </div>
    )
}

export default ContactusBannerPage;