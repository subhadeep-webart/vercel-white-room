import useDeleteArtist from "@/hooks/useDeleteArtist";
import ArtistNameDisplayComponent from "./ArtistNameDisplayComponent";
import AddArtistDialog from "./AddArtistDialog";
import { Button } from "@/components/ui/button";
import { IoMdAddCircle } from "react-icons/io";

const ArtistNamesComponent = ({ headerName = "", artists = [], refetch, handleArtistAdd, section }) => {
    const { handleDeleteArtist, loading: isDeleteLoading } = useDeleteArtist(refetch);
    return (
        <div className="bg-white shadow-lg px-4 py-2 rounded-md mt-2.5">
            <div className="w-full flex justify-between items-center">
                <p className="text-black py-2 text-lg font-semibold px-2">{headerName}</p>
                <Button
                    onClick={handleArtistAdd}
                    type="button"
                    className="relative inline-flex items-center gap-2 bg-white text-[#0F1116] font-bold text-sm w-32 py-2 px-4 mb-4 mt-4 
                               border-2 border-black overflow-hidden transition-all duration-300 hover:text-white whitespace-nowrap text-center rounded-lg cursor-pointer"
                >
                    <IoMdAddCircle size={20} />
                    <span>Add Artist</span>
                </Button>
            </div>
            <div className="flex flex-wrap justify-start gap-2">
                {
                    artists?.map((artist) => (<ArtistNameDisplayComponent key={artist?._id} artist={artist} handleDeleteArtist={() => handleDeleteArtist({ section, _id: artist?._id })} />))
                }
            </div>
        </div>
    )
}

export default ArtistNamesComponent;