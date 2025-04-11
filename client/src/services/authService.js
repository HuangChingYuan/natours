import axios from "axios";
const API_URL = "http://localhost:8080/api/v1/users";

class AuthService {
  login(email, password) {
    return axios({
      method: "POST",
      url: API_URL + "/login",
      data: {
        email,
        password,
      },
      withCredentials: true,
    }).then((response) => {
      return response;
    });
  }

  logout() {
    return axios({
      method: "GET",
      url: API_URL + "/logout",
    }).then((response) => {
      return response;
    });
  }

  updateSettings(name, email) {
    return axios({
      method: "PATCH",
      url: API_URL + "/updateMe",
      data: {
        name,
        email,
      },
      withCredentials: true,
    }).then((response) => {
      return response;
    });
  }
}

const authService = new AuthService();
export default authService;
