import AdminNoDataFound from "../AdminNoDataFound";
import ImageDisplayComponent from "./ImageDisplayComponent";

const MultipleImageShowingComponent = ({ imagesData, handleImageDelete }) => {
    console.log("Images Data=======>", imagesData);

    if (imagesData && imagesData.length < 0) {
        return (
            <AdminNoDataFound noDataContent={"No images have been uploaded yet."} />
        )
    }
    return (
        <div className="py-4 bg-white shadow-2xl rounded-md px-2">
            <p className="text-black py-2 text-lg font-semibold px-2">Section Images</p>
            {/* <div className="grid grid-cols-5 gap-4 w-full">
                {
                    imagesData?.map((image, index) => (
                        <>
                            <ImageDisplayComponent image={image} key={`image-${index + 1}`} onDelete={handleImageDelete} />
                        </>
                    ))
                }
            </div> */}
            <div className="w-full">
                {imagesData?.length === 0 ? (
                    <div className="flex items-center justify-center max-h-[300px] h-[300px] w-full border border-dashed rounded-lg text-gray-500">
                        <p className="text-sm">No images added yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-5 gap-4 w-full">
                        {imagesData.map((image, index) => (
                            <ImageDisplayComponent
                                key={`image-${index + 1}`}
                                image={image}
                                onDelete={handleImageDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>


    )
}

export default MultipleImageShowingComponent;