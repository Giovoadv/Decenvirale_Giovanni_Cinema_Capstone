import React from "react";
import { useSelector } from "react-redux";

const AddFavourite = ({ addFavoriteMovie, removeFavoriteMovie, movie }) => {
  const favoriteMovies = useSelector(
    (state) => state.favoriteMoviesSlice.favoriteMovies
  );

  // Check if the movie is already in the favorites list
  const isFavorite = favoriteMovies.some((favMovie) => favMovie.id === movie.id);

  // Handler to toggle the favorite status
  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteMovie(movie);
    } else {
      addFavoriteMovie(movie);
    }
  };

  return (
    <div>
      <span className="mr-2">Add to watch list</span>

      <svg
        onClick={handleToggleFavorite}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill={isFavorite ? "red" : "white"}  // Conditional fill color
        className={`bi bi-heart${isFavorite ? "-fill" : ""}`}
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
        />
      </svg>
    </div>
  );
};

export default AddFavourite;
