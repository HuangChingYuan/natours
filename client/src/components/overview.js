import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import tourService from "../services/tourService";

const Overview = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    tourService
      .getAllTours()
      .then((data) => {
        setTours(data.data);
      })
      .catch((error) => {
        console.error("獲取旅遊行程時出錯:", error);
      });
  }, []);
  return (
    <main className="main">
      <div className="card-container">
        {tours.length > 0 ? (
          tours.map((tour) => (
            <div className="card" key={tour.id}>
              <div className="card__header">
                <div className="card__picture">
                  <div className="card__picture-overlay">&nbsp;</div>
                  <img
                    src={`img/tours/${tour.imageCover}`}
                    alt={tour.name}
                    className="card__picture-img"
                  />
                </div>

                <h3 className="heading-tertirary">
                  <span>{tour.name}</span>
                </h3>
              </div>

              <div className="card__details">
                <h4 className="card__sub-heading">
                  {tour.difficulty} {tour.duration}-day tour
                </h4>
                <p className="card__text">{tour.summary}</p>
                <div className="card__data">
                  <svg className="card__icon">
                    <use href="img/icons.svg#icon-map-pin"></use>
                  </svg>
                  <span>{tour.startLocation.description}</span>
                </div>
                <div className="card__data">
                  <svg className="card__icon">
                    <use href="img/icons.svg#icon-calendar"></use>
                  </svg>
                  <span>
                    {tour.startDates[0].toLocaleString("en-us", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="card__data">
                  <svg className="card__icon">
                    <use href="img/icons.svg#icon-flag"></use>
                  </svg>
                  <span>{tour.locations.length} stops</span>
                </div>
                <div className="card__data">
                  <svg className="card__icon">
                    <use href="img/icons.svg#icon-user"></use>
                  </svg>
                  <span>{tour.maxGroupSize} people</span>
                </div>
              </div>

              <div className="card__footer">
                <p>
                  <span className="card__footer-value">${tour.price}</span>
                  <span className="card__footer-text">per person</span>
                </p>
                <p className="card__ratings">
                  <span className="card__footer-value">
                    {tour.ratingsAverage}
                  </span>
                  <span className="card__footer-text">
                    rating ({tour.ratingsQuantity})
                  </span>
                </p>
                <Link
                  to={`/tour/${tour.slug}`}
                  className="btn btn--green btn--small"
                >
                  Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>載入中...</p>
        )}
      </div>
    </main>
  );
};

export default Overview;
