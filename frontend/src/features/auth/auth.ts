import axios from "axios";

const API_URL = "http://localhost:3000/auth/login";

export async function login(username: string, password: string) {
  const response = await axios.post(`${API_URL}`, {
    username,
    password,
  });
  return response.data;
}
