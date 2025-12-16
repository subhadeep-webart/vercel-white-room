"use client";

import AdminPageLoader from "@/components/common/AdminPageLoader";
import { useGetShopPage } from "@/hooks/useGetShopPage";
import { getComponentByType } from "@/utils/helper";
import dynamic from "next/dynamic";

// 🔁 Dynamically import ShopPageContentUpdateForm with SSR disabled
const ShopPageContentUpdateForm = dynamic(
  () => import("@/components/shop/ShopPageContentUpdateForm"),
  { ssr: false }
);

const Content = () => {
  const { data: shopPageData, loading: isShopPageLoading ,refetch} = useGetShopPage();

  const contents = getComponentByType(shopPageData, "contents");
  console.log("contents", contents);

  if (isShopPageLoading) {
    return <AdminPageLoader content={"Loading shop page content"} />;
  }
  return (
    <div className="p-3 bg-[#f0f3f8] min-h-screen">
      <div className="flex py-2 justify-between gap-2 items-center">
        <p className="text-black text-xl font-semibold my-4">
          Add Shop Page Content
        </p>
      </div>
      <ShopPageContentUpdateForm defaultValues={contents} refetch={refetch} />
    </div>
  );
};

export default Content;
