"use client"
import BannerShop from "@/components/shopuspage/BannerShop";
import ExploreBrand from "@/components/shopuspage/ExploreBrand";
import { useGetShopPage } from "@/hooks/useGetShopPage";
import { getComponentByType } from "@/utils/helper";

const ShopUs = () => {
  const { data: shopPage, loading: isShopPageLoading } = useGetShopPage();
  const shopBanner = getComponentByType(shopPage,"banner");
  const shopContent = getComponentByType(shopPage,"contents");
  console.log("Shop Banner===>",shopPage);
  return (
    <>
      <BannerShop shopBanner={shopPage}/>
      <ExploreBrand shopContent={shopContent}/>
    </>
  )
};

export default ShopUs;