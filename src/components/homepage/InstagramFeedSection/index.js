import TickerWrapper from "@/components/common/TickerWrapper";
import InstagramMasonaryLayout from "./InstagramMasonaryLayout";
import InstagramFeed from "./InstagramFeed";
import { poppins } from "@/lib/font";

const InstagramFeedSection = ({ instagramMediaData ,instagramFeedData}) => {
    console.log("Instagram Media Data=====>", instagramMediaData);

    return (
        <section className="w-full relative bg-[#0F1116] commonBg flex flex-col gap-20">
            <div className="py-8">
                <div className="mb-[50px] md:mb-[100px] mt-[100px] md:mt-[200px]">
                    <TickerWrapper isRight={false}>
                        <h3 className={`${poppins.className} outline_text text-4xl md:text-[150px] text-center uppercase`}>
                            {/* Follow Us on Instagram */}
                            {instagramFeedData?.title}  &nbsp;  {instagramFeedData?.title}  &nbsp;  {instagramFeedData?.title}  &nbsp;  {instagramFeedData?.title}  &nbsp;  {instagramFeedData?.title}  &nbsp;  {instagramFeedData?.title}
                        </h3>
                    </TickerWrapper>
                </div>
            </div>
            <div className="px-2">
                {/* <InstagramMasonaryLayout instagramPosts={instagramMediaData?.data} /> */}
                <InstagramFeed instagramPosts={instagramMediaData?.data}/>
            </div>
        </section>

    )
}

export default InstagramFeedSection