import React, { useEffect, useState } from "react";
import "./MovieDisplay.css";
import AddFavourite from "./AddFavourite";
import RemoveFavoutite from "./RemoveFavoutite";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { favorite } from "../Slices/favoriteMoviesSlice";
import { set } from "mongoose";
import { get } from "jquery";

const imgPath = "https://image.tmdb.org/t/p/w500";
const apiKeyTwo = "api_key=db95773a7fb212ba790d71f6adac0e7e";

const MovieDisplay = ({ movies, titleChange, handleClick }) => {
  // Dispatch fn
  const dispatch = useDispatch();
  // Logged User
  const userData = useSelector((state) => state.user.user);
  const user = userData?.user;
  // Fav movies
  const favoriteMovies = useSelector(
    (state) => state.favoriteMoviesSlice.favoriteMovies
  );

  const [limit, setLimit] = useState(10);

  const fetchSingleFavoriteMovie = async (favoriteMovie) => {
    const movieRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${favoriteMovie.movieId}?${apiKeyTwo}`
    );

    dispatch(favorite([movieRes, ...favoriteMovies]));
  };

  const addFavoriteMovie = (movie) => {
    axios
      .post(
        "http://localhost:3002/favourite",
        { movie },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("addFavoriteMovie RESP", response.data);

        const favoriteMovie = response.data;
        fetchSingleFavoriteMovie(favoriteMovie);
      })
      .catch((error) => {
        console.error("Error adding favorite:", error);
      });
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
          <div key={movie.id}>
            <Link className="img-wrapper" to={`/movie/${movie.id}`}>
              <img src={imgPath + movie.poster_path} alt={movie.title} />
            </Link>
            <div className="img-wrapper">
              {user ? (
                <AddFavourite
                  addFavoriteMovie={addFavoriteMovie}
                  movie={movie}
                />
              ) : (
                <p className="movie-overview">{movie.title}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDisplay;
