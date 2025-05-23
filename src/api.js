// import axios from "axios";

// const API = axios.create({
//  baseURL: "http://localhost:5000",
// });

// export default API;


import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
});

export default API;
