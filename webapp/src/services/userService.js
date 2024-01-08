import axios from "axios";
import { BASE_URL, USER_LOGIN } from "../utils/endpoints";

export const login = async (credentials) => {
  try {
    const data = new URLSearchParams();
    data.append("username", credentials.username);
    data.append("password", credentials.password);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const response = await axios.post(`${BASE_URL}${USER_LOGIN}`, data, config);
    console.log('===================', response)
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    throw error;
  }
};
