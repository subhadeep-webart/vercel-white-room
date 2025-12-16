import MovingStar from "./MovingStar";

const FiveStarTestimonial = ({ rating }) => {
 

  return (
    <>
     <div style={{ display: "flex", gap: "4px" }}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill={i < rating ? "#007BFF" : "#e0e0e0"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
        </svg>
      ))}
    </div>
    </>
  );
};

export default FiveStarTestimonial;
