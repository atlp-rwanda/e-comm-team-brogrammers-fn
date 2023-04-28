import ax from 'axios';

const axios = ax.create({
  baseURL: process.env.REACT_APP_SERVER_URL, // || 'http://localhost:5000',
});
// axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
//   'token'
// )}`;

export default axios;
