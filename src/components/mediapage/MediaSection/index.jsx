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
   * Tailwind-safe responsive col-span classes
   */
  const getColSpanClass = (isTwoCol, index) => {
    if (!isTwoCol) {
      return "col-span-12 sm:col-span-4 md:col-span-4";
    }

    return index === 0
      ? "col-span-12 sm:col-span-8 md:col-span-8"
      : "col-span-12 sm:col-span-4 md:col-span-4";
  };

  /**
   * Render image / video
   */
  const renderMedia = (media) => {
    const commonClasses =
      "sm:object-cover object-contain w-full h-full img_border";

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
    <section className="pt-20 pb-20 bg-black relative overflow-hidden">
      <NoiseComponent />

      <div className="container px-10">
        {groupedMedias.map((group, groupIndex) => {
          const isTwoCol = group.length === 2;

          return (
            <div key={groupIndex} className="mb-12">
              {/* MEDIA GRID */}
              <div className="grid grid-cols-12 gap-y-6 gap-x-4 md:gap-10">
                {group.map((media, index) => (
                  <div
                    key={media._id}
                    className={`relative w-full ${getColSpanClass(
                      isTwoCol,
                      index
                    )}`}
                  >
                    {/* MEDIA */}
                    <div className="relative h-[180px] md:h-[350px]">
                      {renderMedia(media)}
                    </div>

                    {/* TITLE */}
                    <p className="mt-2 font-bold text-sm md:text-2xl text-white">
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
