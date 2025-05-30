// import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import tourService from "../services/tourService";

const Overview = () => {
  const resData = useLoaderData();
  const tours = resData.data;
  // const [tours, setTours] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   tourService
  //     .getAllTours()
  //     .then((data) => {
  //       setTours(data.data);
  //       document.title = "Natours | All Tours";
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     });
  // }, []);

  // if (error) {
  //   return <ErrorPage error={error} />;
  // }

  return (
    <main className="main">
      <div className="card-container">
        {tours.length > 0 ? (
          tours.map((tour) => {
            const date = new Date(tour.startDates[0]).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
              }
            );
            return (
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
                      <use xlinkHref="img/icons.svg#icon-map-pin"></use>
                    </svg>
                    <span>{tour.startLocation.description}</span>
                  </div>
                  <div className="card__data">
                    <svg className="card__icon">
                      <use xlinkHref="img/icons.svg#icon-calendar"></use>
                    </svg>
                    <span>{date}</span>
                  </div>
                  <div className="card__data">
                    <svg className="card__icon">
                      <use xlinkHref="img/icons.svg#icon-flag"></use>
                    </svg>
                    <span>{tour.locations.length} stops</span>
                  </div>
                  <div className="card__data">
                    <svg className="card__icon">
                      <use xlinkHref="img/icons.svg#icon-user"></use>
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
            );
          })
        ) : (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Overview;

export async function loader() {
  const response = await tourService.getAllTours();
  return response;
}
