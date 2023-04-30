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
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/refresh-token`, {
          withCredentials: true,
        })
      } catch (error) {
        console.error(error)
      }
    }
    // console.log('caindo no reject');
    return Promise.reject(error);
  }
);

export {
  apiClient
}