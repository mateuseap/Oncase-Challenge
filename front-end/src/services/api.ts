import axios from 'axios';

const apiBack = axios.create({ baseURL: process.env.REACT_APP_URL_BACK });

export default apiBack;
