import axios from "axios";
const API_URL = "http://localhost:8080/api/v1/tours";

class TourService {
  getAllTours() {
    return axios.get(API_URL).then((response) => {
      return response.data.data;
    });
  }

  getTour(slug) {
    return axios.get(API_URL + "/tour/" + slug).then((response) => {
      return response.data.data;
    });
  }
}

const tourService = new TourService();
export default tourService;
