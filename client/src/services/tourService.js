import axios from "axios";
const API_URL = "http://localhost:8080/api/v1/tours";

class TourService {
  getAllTours() {
    return axios({
      method: "GET",
      url: API_URL,
      withCredentials: true,
    }).then((response) => {
      return response.data.data;
    });
  }

  getTour(slug) {
    return axios({
      method: "GET",
      url: API_URL + "/tour/" + slug,
      withCredentials: true,
    }).then((response) => {
      return response.data.data;
    });
  }
}

const tourService = new TourService();
export default tourService;
