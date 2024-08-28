import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import "./Movie.css";

const apiKeyTwo = "api_key=db95773a7fb212ba790d71f6adac0e7e";
const imgPath = "https://image.tmdb.org/t/p/w500";

const Movie = () => {
  const { id } = useParams();
  console.log(id);
  const [movie, setMovie] = useState([]);

  if (!id) {
    return <div>Movie not found</div>;
  }

  const getMovie = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?${apiKeyTwo}`
      );

      const data = res.data;
      console.log(data);
      setMovie(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className="content-wrapper">
      <Navbar />
      <div className="movieCard">
        <span>
          <h1 className="singleMovieTitle">Movie Details</h1>
        </span>
        {<img src={imgPath + movie.poster_path} alt={movie.title} />}
        <div className="movieInfo">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p> <span className="releaseData">
          Release Date:
            </span> {movie.release_date}</p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
