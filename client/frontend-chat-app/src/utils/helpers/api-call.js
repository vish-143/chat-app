import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL

export const postRequest = async ({ apiEndpoint, data = {}, params = {}, headers = {} }) => {
  const accessToken = localStorage.getItem("token");
  headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  return axios
    .post(BASE_URL + apiEndpoint, data, { params, headers })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getRequest = async ({ apiEndpoint, params = {}, headers = {} }) => {
  const accessToken = localStorage.getItem("token");
  headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  return axios
    .get(BASE_URL + apiEndpoint, { params, headers })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
}
