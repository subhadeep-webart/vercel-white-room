import TickerWrapper from "@/components/common/TickerWrapper";
import InstagramMasonaryLayout from "./InstagramMasonaryLayout";
import InstagramFeed from "./InstagramFeed";

const InstagramFeedSection = ({ instagramMediaData }) => {
    console.log("Instagram Media Data=====>", instagramMediaData);
    return (
        <section className="w-full relative bg-[#0F1116] commonBg">
            <div className="py-8">
                <div className="mb-[-40px]">
                    <TickerWrapper isRight={false}>
                        <h3 className="outline_text text-4xl md:text-[150px] text-center">
                            {/* Follow Us on Instagram */}
                            Instagram Feed
                        </h3>
                    </TickerWrapper>
                </div>
            </div>
            <div className="px-2 !py-12">
                {/* <InstagramMasonaryLayout instagramPosts={instagramMediaData?.data} /> */}
                <InstagramFeed instagramPosts={instagramMediaData?.data}/>
            </div>
        </section>

    )
}

export default InstagramFeedSection