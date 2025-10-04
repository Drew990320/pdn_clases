import axios from "axios";

const API_URL = "http://localhost:8080/auth/authenticate"; // tu endpoint

export const loginRequest = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password,
    });
    return response.data; // debe contener el token
  } catch (error) {
    throw error.response?.data || "Error en la conexión";
  }
};
