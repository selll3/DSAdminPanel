import axios from "axios";


// Axios instance konfigürasyonu
const API = axios.create({
  baseURL: "http://localhost:5285/api", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Admin Giriş İsteği
export const loginAdmin = async (username, password) => {
  try {
    const response = await API.post("/admin/login", { username, password });
    return response.data; // Response verisini döndürüyoruz
  } catch (error) {
    // Hata durumunda
    throw error.response ? error.response.data : { message: "Unexpected error" };
  }
};

// İleride eklenebilecek diğer API işlemleri için yer bırak
// Örneğin:
// export const getAdminDetails = async (token) => {
//   const response = await API.get("/admin/details", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

