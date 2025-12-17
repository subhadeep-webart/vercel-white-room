import NoiseComponent from "@/components/common/NoiseComponent";
import Image from "next/image";

const MediaSection = ({ mediaAssets }) => {
  const medias = mediaAssets?.media_assets || [];

  /**
   * Group medias in alternating pattern:
   * [2 items, 3 items, 2 items, 3 items...]
   */
  const groupMedias = (items) => {
    const result = [];
    let index = 0;
    let twoCol = true;

    while (index < items.length) {
      const count = twoCol ? 2 : 3;
      result.push(items.slice(index, index + count));
      index += count;
      twoCol = !twoCol;
    }

    return result;
  };

  const groupedMedias = groupMedias(medias);

  /**
   * Return Tailwind-safe col-span classes
   */
  const getColSpanClass = (isTwoCol, index) => {
    if (!isTwoCol) return "col-span-4";
    return index === 0 ? "col-span-8" : "col-span-4";
  };

  /**
   * Render image / video
   */
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

    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-800 text-white">
        Unsupported media type
      </div>
    );
  };

  return (
    <section className="pt-20 pb-20 bg-[#0F1116] relative overflow-hidden">
      <NoiseComponent />

      <div className="container px-10">
        {groupedMedias.map((group, groupIndex) => {
          const isTwoCol = group.length === 2;

          return (
            <div key={groupIndex} className="mb-10">
              {/* MEDIA GRID */}
              <div className="grid grid-cols-12 gap-4 md:gap-10 h-[257px] md:h-[476px]">
                {group.map((media, index) => (
                  <div
                    key={media._id}
                    className={`relative h-[180px] md:h-[350px] w-full ${getColSpanClass(
                      isTwoCol,
                      index
                    )}`}
                  >
                    {renderMedia(media)}
                  </div>
                ))}
              </div>

              {/* TITLE GRID */}
              <div className="grid grid-cols-12 gap-4 md:gap-10 mt-4">
                {group.map((media, index) => (
                  <div
                    key={`title-${media._id}`}
                    className={getColSpanClass(isTwoCol, index)}
                  >
                    <p className="font-bold text-sm md:text-2xl text-white">
                      {media.title || "Untitled"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MediaSection;
