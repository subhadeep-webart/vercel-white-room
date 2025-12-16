import useDeleteArtist from "@/hooks/useDeleteArtist";
import ArtistNameDisplayComponent from "./ArtistNameDisplayComponent";

const ArtistNamesComponent = ({ artists = [], refetch }) => {
    console.log("Artists=====>", artists)
    const { handleDeleteArtist, loading: isDeleteLoading } = useDeleteArtist(refetch);
    return (
        <div className="bg-white shadow-lg px-4 py-2 rounded-md mt-2.5">
            <p className="text-black py-2 text-lg font-semibold px-2">Artists Name</p>
            <div className="flex flex-wrap justify-start gap-2">
                {
                    artists?.map((artist) => (<ArtistNameDisplayComponent key={artist?._id} artist={artist} handleDeleteArtist={handleDeleteArtist} />))
                }
            </div>
        </div>
    )
}

export default ArtistNamesComponent;