import NoiseComponent from "@/components/common/NoiseComponent";
import Image from "next/image";

const MediaSection = ({mediaAssets}) => {
  const medias=mediaAssets?.media_assets || [];
  console.log("medias",medias)

  // Helper to group medias in alternating patterns: [2,3,2,3,...]
  const groupMedias = (items) => {
    const result = [];
    let i = 0;
    let toggle = true; // true for 2-cols, false for 3-cols

    while (i < items.length) {
      if (toggle) {
        result.push(items.slice(i, i + 2));
        i += 2;
      } else {
        result.push(items.slice(i, i + 3));
        i += 3;
      }
      toggle = !toggle;
    }
    return result;
  };

  const groupedMedias = groupMedias(medias);

  // Render media (image or video)
  const renderMedia = (media) => {
    const commonClasses = "object-cover w-full h-full img_border";

    if (media.file_type === "image") {
      return (
        <Image
          src={media.file_url}
          alt={media.title || "Media image"}
          fill
          className={commonClasses}
        />
      );
    }

    if (media.file_type === "video") {
      return (
        <video
          src={media.file_url}
          className={commonClasses}
          controls
          muted
          playsInline
        />
      );
    }

    // Fallback
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-800 text-white">
        Unsupported media type
      </div>
    );
  };

  return (
    <>
      <section className="pt-20 pb-20 bg-[#0F1116] relative overflow-hidden">
        <NoiseComponent/>
        <div className="container px-10">

          {groupedMedias?.map((group, idx) => {
          const isTwoCol = group.length === 2;

          return (
            <div
              key={idx}
              className="mb-10 h-[257px] md:h-[476px]"
            >
              <div className={`grid grid-cols-12 gap-4 md:gap-10`}>
                {group.map((media, i) => {
                  const colSpan = isTwoCol ? (i === 0 ? 8 : 4) : 4;

                  return (
                    <div
                      key={media._id}
                      className={`col-span-${colSpan} relative h-[180px] md:h-[350px] w-full overflow-hidden`}
                    >
                      {renderMedia(media)}
                    </div>
                  );
                })}
              </div>

              <div className={`grid grid-cols-12 gap-4 md:gap-10 mt-4`}>
                {group.map((media, i) => {
                  const colSpan = isTwoCol ? (i === 0 ? 8 : 4) : 4;

                  return (
                    <div
                      key={`text-${media._id}`}
                      className={`col-span-${colSpan}`}
                    >
                      <p className="font-bold text-sm md:text-2xl text-white">
                        {media.title || "Untitled"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        </div>
      </section>
    </>
  );
};

export default MediaSection;