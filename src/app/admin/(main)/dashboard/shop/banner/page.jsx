"use client"

import CommonBannerForm from "@/components/admin/_components/common/CommonBannerForm";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { useGetShopPage } from "@/hooks/useGetShopPage";
import { useUpdateShopComponent } from "@/hooks/useUpdateShopComponent";

const BannerPage = () => {
    const { data: bannerData, loading: isLoading, refetch } = useGetShopPage("banner");
    const { handleUpdateShopComponent, loading: isUpdateShopComponent } = useUpdateShopComponent(refetch);

    const onBannerSubmit = async (data) => {
        const payload = {
            type: "banner",
            data,
        };

        await handleUpdateShopComponent(payload, refetch);
    };

    if(isLoading){
        return <AdminPageLoader content={"Loading Shop Banner Content"}/>
    }
    return (
        <div className="p-3 bg-[#f0f3f8] min-h-screen">
            <div className="flex py-2 justify-between gap-2 items-center">
                <p className="text-black text-xl font-semibold my-4">Shop Page Banner Content</p>
            </div>
            <CommonBannerForm defaultValues={bannerData} isLoading={isUpdateShopComponent} onSubmitHandler={onBannerSubmit}/>
        </div>
    )
}

export default BannerPage;