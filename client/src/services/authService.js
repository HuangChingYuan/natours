import axios from "axios";
const API_URL = "http://localhost:8080/api/v1/users";

class AuthService {
  isLoggedIn() {
    return axios({
      method: "GET",
      url: API_URL + "/isLoggedIn",
      withCredentials: true,
    }).then((response) => {
      return response;
    });
  }

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
      withCredentials: true,
    }).then((response) => {
      return response;
    });
  }

  updateSettings(data) {
    return axios({
      method: "PATCH",
      url: API_URL + "/updateMe",
      data,
      withCredentials: true,
    }).then((response) => {
      return response;
    });
  }

  updateMyPassword(data) {
    return axios({
      method: "PATCH",
      url: API_URL + "/updateMyPassword",
      data,
      withCredentials: true,
    }).then((response) => {
      return response;
    });
  }

  signup(name, email, password, passwordConfirm) {
    return axios({
      method: "POST",
      url: API_URL + "/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
      withCredentials: true,
    }).then((response) => {
      return response;
    });
  }
}

const authService = new AuthService();
export default authService;
