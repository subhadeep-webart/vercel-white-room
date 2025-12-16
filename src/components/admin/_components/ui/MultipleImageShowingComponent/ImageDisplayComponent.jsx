import { Trash, X } from "lucide-react";
import Image from "next/image";
import ImageDeleteAlertBox from "./ImageDeleteAlertBox";
const ImageDisplayComponent = ({ image, onDelete }) => {
    return (
        <div className="relative w-full h-40 rounded overflow-hidden shadow-lg bg-transparent px-4 py-2">
            <div className="relative w-full h-full rounded overflow-hidden px-2 py-2 z-0">
                <Image
                    src={image}
                    alt={`Work For Image`}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover rounded"
                />
            </div>
            <ImageDeleteAlertBox onDelete={() => onDelete(image)} />
        </div>
    )
}

export default ImageDisplayComponent;