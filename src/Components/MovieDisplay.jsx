import React, { useState } from "react";
import "./MovieDisplay.css";
import AddFavourite from "./AddFavourite";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { favorite } from "../Slices/favoriteMoviesSlice";

const imgPath = "https://image.tmdb.org/t/p/w500";
const apiKeyTwo = "api_key=db95773a7fb212ba790d71f6adac0e7e";
const apiUrl = import.meta.env.VITE_API_URL;

const MovieDisplay = ({ movies, titleChange, handleClick }) => {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector(
    (state) => state.favoriteMoviesSlice.favoriteMovies
  );
  const userData = useSelector((state) => state.user.user);
  const user = userData?.user;
  const [limit, setLimit] = useState(15);
  const addFavoriteMovie = (movie) => {
    axios
      .post(
        `${apiUrl}/favourite`,
        { movie },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("addFavoriteMovie RESP", response.data);
        const favoriteMovie = response.data;
        fetchSingleFavoriteMovie(favoriteMovie);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert("Movie already added to favorites");
        }
        console.error("Error adding favorite:", error);
      });
  };

  const removeFavoriteMovie = async (movie) => {
    await axios
      .delete(`${apiUrl}/deleteFavorite/${movie.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("removeFavoriteMovie RESP", response.data);
        fetchFavoriteMovies();
      })
      .catch((error) => {
        console.error("Error removing favorite:", error);
      });
  };

  const fetchSingleFavoriteMovie = async (favoriteMovie) => {
    const movieRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${favoriteMovie.movieId}?${apiKeyTwo}`
    );
    dispatch(favorite([movieRes.data, ...favoriteMovies]));
  };

  const fetchFavoriteMovies = async () => {
    try {
      const res = await axios.get(`${apiUrl}/favourite`, {
        withCredentials: true,
      });
      const favoriteMoviesData = await Promise.all(
        res.data.map(async (movieID) => {
          const movieRes = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieID}?${apiKeyTwo}`
          );
          return movieRes.data;
        })
      );
      dispatch(favorite(favoriteMoviesData));
    } catch (error) {
      console.error("Error fetching favorite movies:", error);
    }
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
                  removeFavoriteMovie={removeFavoriteMovie}
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
