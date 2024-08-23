import React, { useState } from "react";
import "./MovieDisplay.css";
import AddFavourite from "./AddFavourite";
const imgPath = "https://image.tmdb.org/t/p/w500";

const MovieDisplay = ({ movies, titleChange, handleClick }) => {
  const [limit, setLimit] = useState(10);
  const [isFavourite, setIsFavourite] = useState([]);

  const addFavoriteMovie = (movie) => {
    console.log(isFavourite);
    setIsFavourite([...isFavourite, movie]);
  };

  if (!movies || movies.length === 0) return <p>No movies available.</p>;

  return (
    <div>
      <section className="buttonSection">
        <button
          onClick={(e) => handleClick(e, "now_playing")}
          className="movieTypeButton"
        >
          Now Playing
        </button>
        <button
          onClick={(e) => handleClick(e, "popular")}
          className="movieTypeButton"
        >
          Popular
        </button>
        <button
          onClick={(e) => handleClick(e, "top_rated")}
          className="movieTypeButton"
        >
          Top Rate
        </button>
        <button
          onClick={(e) => handleClick(e, "upcoming")}
          className="movieTypeButton"
        >
          Upcoming
        </button>
      </section>
      <p className="featuredMovies">{titleChange}</p>
      <div className="movie-poster">
        {movies.slice(0, limit).map((movie) => (
          <div className="img-wrapper" key={movie.id}>
            <img src={imgPath + movie.poster_path} alt={movie.title} />
            <h2 className="movie-title">{movie.title}</h2>
            <AddFavourite addFavoriteMovie={addFavoriteMovie} movie={movie} />
            {/* <p className="movie-overview">{movie.overview}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDisplay;
