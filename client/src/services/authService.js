import axios from "axios";

import { showAlert } from "../utils/alert";

const API_URL = "http://localhost:8080/api/v1/users";

class AuthService {
  login = async (email, password) => {
    try {
      const res = await axios({
        method: "POST",
        url: API_URL,
        data: {
          email,
          password,
        },
      });

      if (res.data.status === "success") {
        showAlert("success", "Logged in successfully!");
        window.setTimeout(() => {
          window.location.assign("/");
        }, 1500);
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };
}

const authService = new AuthService();
export default authService;
