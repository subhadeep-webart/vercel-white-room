import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaPlay } from "react-icons/fa";

const InstagramFeed = ({ instagramPosts = [] }) => {
  console.log("Instagram Posts=====>", instagramPosts);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
      {instagramPosts.slice(0, 6).map((post) => (
        <Link
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="!mb-4 !relative overflow-hidden group hover:scale-95 hover:opacity-90 transition-all delay-200  h-[250px] sm:h-[320px]"
          key={post.id}
        >
          {/* { ? (
            <video
              src={post.thumbnail_url}
              className="w-full h-[200px] lg:h-[320px] object-cover"
            />
          ) : ( */}
          <Image
            src={
              post?.media_type == "VIDEO" ? post.thumbnail_url : post.media_url
            }
            // src={post.thumbnail_url}
            alt={post.caption || "Instagram Post"}
            fill
            className="object-cover"
            // sizes="(max-width: 640px) 40vw,
            //            (max-width: 1024px) 33vw,
            //            (max-width: 1280px) 25vw,
            //            16vw "
          />

          {/* )} */}

          <div className="absolute top-2 right-2 bg-white w-6 h-6 flex justify-center items-center rounded-full text-white">
            {post?.media_type?.toLowerCase() === "video" ? (
              <FaPlay size={10} color="black" />
            ) : (
              <FaInstagram size={18} color="black" />
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default InstagramFeed;
