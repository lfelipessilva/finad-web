import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ROUTE,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401 && error.config.url !== '/auth') {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/refresh-token`, {
          withCredentials: true,
        })
        .catch((err) => {
          return Promise.reject(err);
        });
      return axios(error.config);
    } else {
      return error
    }
  }
);

export {
  apiClient
}