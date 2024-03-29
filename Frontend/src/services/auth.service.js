import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {

  login(email, password) {
    return axios.post(API_URL + "signin", {
        email,
        password
      })
      
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();