import { MASONARY_BREAKPOINT } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";
const InstagramMasonaryLayout = ({ instagramPosts = [] }) => {
  console.log("Instagram Posts=====>", instagramPosts);
  return (
    <Masonry
      breakpointCols={MASONARY_BREAKPOINT}
      className="my-masonry-grid !gap-4"
      // columnClassName="my-masonry-grid_column"
      columnClassName="masonry-column" // each column
    >
      {instagramPosts.map((post) => (
        <div
          className="!mb-4 !relative rounded-lg overflow-hidden aspect-w-4 aspect-h-5"
          key={post.id}
        >
          {post?.media_type?.toLowerCase() === "video" ? (
            <video
              src={post.media_url}
              // controls
              className="w-full h-[400px] object-cover"
            />
          ) : (
            <Image
              src={post.media_url}
              alt={post.caption || "Instagram Post"}
              className="w-full h-auto object-cover"
              height={400}
              width={250}
            />
          )}

          {/* <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-semibold">
                            {post.likes} ❤️
                        </div> */}
        </div>
      ))}
    </Masonry>
  );
};

export default InstagramMasonaryLayout;
