import axios from "axios";

//création d'une nouvelle instance d'Axios
const API = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_LOCAL_HOST,
  withCredentials: true,
});

API.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "access_token"
)}`;

//ajout d'un intercepteur de réponse
API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // manipulation des données de l'erreur
    if (error.response) {
      console.error(
        "Erreur API : ",
        error.response.status,
        error.response.data
      );
      return Promise.reject(error);
    } else if (error.request) {
      console.error("Aucune réponse reçue du backend");
      return Promise.reject({ message: "Backend inaccessible" });
    } else {
      console.error("Erreur lors de la requête", error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export default API;
