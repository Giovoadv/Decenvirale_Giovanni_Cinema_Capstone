import React from "react";
import "../Components/Carousel.css";
import deadpool from "../assets/MoviesImages/Deadpool&Wolverine.jpg";
import alien from "../assets/MoviesImages/romulus-1080x36040.webp";
import terror from "../assets/MoviesImages/Terror.jpg";
import itEnds from "../assets/MoviesImages/iewu_1080x360_er_banners_v2_aug.webp";
import beetle from "../assets/MoviesImages/btlbtl_cinemark_dated_1080x360.jpg";
import villa from "../assets/MoviesImages/MiVillano.jpg";
import Carousel from "react-material-ui-carousel";

const Carousels = () => {
  const carouselImgs = [
    <img src={deadpool} />,
    <img src={alien} />,
    <img src={terror} />,
    <img src={itEnds} />,
    <img src={beetle} />,
    <img src={villa} />,
  ];

  return (
    <div className="carousel">
      <Carousel>
        {carouselImgs.map((img, i) => (
          <div key={i}>{img}</div>
        ))}
      </Carousel>
    </div>

    // <div
    //   id="carouselExampleSlidesOnly"
    //   className="carousel slide"
    //   data-bs-ride="carousel"
    // >
    //   <div className="carousel-inner" id="carouselId">
    //     <div className="carousel-item active">
    //       <img src={deadpool} className="d-block w-100" alt="..." />
    //     </div>
    //     <div className="carousel-item">
    //       <img src={alien} className="d-block w-100" alt="..." />
    //     </div>
    //     <div className="carousel-item">
    //       <img src={terror} className="d-block w-100" alt="..." />
    //     </div>
    //     <div className="carousel-item">
    //       <img src={itEnds} className="d-block w-100" alt="..." />
    //     </div>
    //     <div className="carousel-item">
    //       <img src={beetle} className="d-block w-100" alt="..." />
    //     </div>
    //     <div className="carousel-item">
    //       <img src={villa} className="d-block w-100" alt="..." />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Carousels;
