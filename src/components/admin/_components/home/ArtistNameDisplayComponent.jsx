import DeleteArtistAlertBox from "@/components/admin/_components/home/DeleteArtistAlertBox";

const ArtistNameDisplayComponent = ({ artist, handleDeleteArtist }) => {
  return (
    <div
      className="px-4 py-2 border-2 border-secondary w-fit rounded-md bg-amber-50 shadow-md relative"
      key={artist?._id}
    >
      {artist?.artist_name}
      <DeleteArtistAlertBox onDelete={handleDeleteArtist} />
    </div>
  );
};

export default ArtistNameDisplayComponent;
