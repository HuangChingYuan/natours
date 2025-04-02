import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import tourService from "../services/tourService";

const Tour = () => {
  const { slug } = useParams(); // 取得 URL 參數
  const [tour, setTour] = useState([]);

  useEffect(() => {
    tourService
      .getTour(slug)
      .then((data) => {
        setTour(data);
      })
      .catch((error) => {
        console.error("獲取旅遊行程時出錯:", error);
      });
  }, [slug]);
  return console.log(tour);
};

export default Tour;
