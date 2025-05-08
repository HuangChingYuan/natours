import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import tourService from "../services/tourService";
import ErrorPage from "./error";
import { useAuth } from "../contexts/AuthContext";

const Tour = () => {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    tourService
      .getTour(slug)
      .then((data) => {
        setTour(data.data);
        document.title = `${data.data.name}`;
      })
      .catch((error) => {
        setError(error);
      });
  }, [slug]);

  const date =
    tour &&
    tour.startDates &&
    tour.startDates.length > 0 &&
    new Date(tour.startDates[0]).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });

  const overviewBox = (label, text, icon) => {
    return (
      <div className="overview-box__detail">
        <svg className="overview-box__icon">
          <use xlinkHref={`/img/icons.svg#icon-${icon}`}></use>
        </svg>
        <span className="overview-box__label">{label}</span>
        <span className="overview-box__text">{text}</span>
      </div>
    );
  };

  const reviewCard = (review) => {
    return (
      <div className="reviews__card" key={review._id}>
        <div className="reviews__avatar">
          <img
            src={`/img/users/${review.user.photo}`}
            alt={review.user.name}
            className="reviews__avatar-img"
          />
          <h6 className="reviews__user">{review.user.name}</h6>
        </div>
        <p className="reviews__text">{review.review}</p>
        <div className="reviews__rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`reviews__star reviews__star--${
                review.rating >= star ? "active" : "inactive"
              }`}
            >
              <use xlinkHref="/img/icons.svg#icon-star" />
            </svg>
          ))}
        </div>
      </div>
    );
  };

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!tour) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <main className="main">
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img
            className="header__hero-img"
            src={`/img/tours/${tour.imageCover}`}
            alt={tour.name}
          />
        </div>
        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{tour.name}</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-clock"></use>
              </svg>
              <span className="heading-box__text">{tour.duration} days</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
              </svg>
              <span className="heading-box__text">
                {tour.startLocation.description}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
              {overviewBox("Next date", date, "calendar")}
              {overviewBox("Difficulty", tour.difficulty, "trending-up")}
              {overviewBox(
                "Participants",
                `${tour.maxGroupSize} people`,
                "user"
              )}
              {overviewBox("Rating", `${tour.ratingsAverage} / 5`, "star")}
            </div>

            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
              {tour.guides.map((guide) => {
                return (
                  <div className="overview-box__detail" key={guide._id}>
                    <img
                      src={`/img/users/${guide.photo}`}
                      alt={guide.name}
                      className="overview-box__img"
                    />
                    {guide.role === "lead-guide" && (
                      <span className="overview-box__label">Lead guide</span>
                    )}
                    {guide.role === "guide" && (
                      <span className="overview-box__label">Tour guide</span>
                    )}
                    <span className="overview-box__text">{guide.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">
            About the park camper tour
          </h2>
          {tour.description.split("\n").map((p) => {
            return (
              <p
                className="description__text"
                key={tour.description.split("\n").indexOf(p)}
              >
                {p}
              </p>
            );
          })}
        </div>
      </section>

      <section className="section-pictures">
        {tour.images.map((img, i) => (
          <div className="picture-box" key={i}>
            <img
              className={`picture-box__img picture-box__img--${i + 1}`}
              src={`/img/tours/${img}`}
              alt={`Tourimg ${i + 1}`}
            />
          </div>
        ))}
      </section>

      <section className="section-reviews">
        <div className="reviews">
          {tour &&
            tour.reviews &&
            tour.reviews.length > 0 &&
            tour.reviews.map((review) => {
              return reviewCard(review);
            })}
        </div>
      </section>

      <section className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo">
            <img src="/img/logo-white.png" alt="Natours logo" className="" />
          </div>
          <img
            src={`/img/tours/${tour.images[1]}`}
            alt=""
            className="cta__img cta__img--1"
          />
          <img
            src={`/img/tours/${tour.images[2]}`}
            alt=""
            className="cta__img cta__img--2"
          />

          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">
              {tour.duration} days. 1 adventure. Infinite memories. Make it
              yours today!
            </p>
            <button className="btn btn--green span-all-rows">
              {user ? "Book tour now!" : "Log in to book tour"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Tour;
