"use client"
import CommonBannerForm from "@/components/admin/_components/common/CommonBannerForm";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { useGetTestimonialPageContent } from "@/hooks/useGetTestimonialPageContent";
import useUpdateTestimonialPage from "@/hooks/useUpdateTestimonialPage";

const BannerPage = () => {
    const { data: testimonialContent, loading: isTestimonialContentLoading, refetch } = useGetTestimonialPageContent("banner");

    console.log("Testimonial Content======>", testimonialContent);

    const { handleUpdateTestimonialPage, loading: isUpdatingTestimonialPage } = useUpdateTestimonialPage(refetch);

    const onBannerSubmit = async (data) => {
        const payload = {
            type: "banner",
            data,
        };

        await handleUpdateTestimonialPage(payload, refetch);
    };

    if (isTestimonialContentLoading) {
        return <AdminPageLoader content={"Loading Testimonial Banner Content"} />
    }
    return (
        <div className="p-3 bg-[#f0f3f8] min-h-screen">
            <div className="flex py-2 justify-between gap-2 items-center">
                <p className="text-black text-xl font-semibold my-4">Testimonial Page Banner Content</p>
            </div>
            <CommonBannerForm defaultValues={testimonialContent} isLoading={isUpdatingTestimonialPage} onSubmitHandler={onBannerSubmit} />
        </div>
    )
}

export default BannerPage;