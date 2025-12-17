import MovingStar from "./MovingStar";

const FiveStar = ({ rating }) => {
  const safeRating = Math.max(0, Math.min(5, Math.round(rating)));

  const sizePattern = [20, 30, 40, 30, 20];

  return (
    <>
      {[...Array(safeRating)].map((_, i) => (
        <MovingStar key={i} size={sizePattern[i]} />
      ))}
    </>
  );
};

export default FiveStar;
