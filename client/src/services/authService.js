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
}

const authService = new AuthService();
export default authService;
