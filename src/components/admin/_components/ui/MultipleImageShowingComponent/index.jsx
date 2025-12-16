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
            <div className="grid grid-cols-5 gap-4 w-full">
                {
                    imagesData?.map((image, index) => (
                        <>
                            <ImageDisplayComponent image={image} key={`image-${index + 1}`} onDelete={handleImageDelete} />
                        </>
                    ))
                }
            </div>
        </div>


    )
}

export default MultipleImageShowingComponent;