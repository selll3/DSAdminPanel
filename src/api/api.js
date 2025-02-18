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



export const createMusteri = async (musteriData) => {
  console.log("Gönderilen Veri:", musteriData); // API'ye gönderilen veriyi kontrol et
  try {
    const response = await API.post("/musteri", musteriData);
    console.log("Müşteri başarıyla oluşturuldu:", response.data);
    return response.data;
  } catch (error) {
    console.error("Müşteri oluşturulurken bir hata oluştu:", error);

    if (error.response) {
      console.log("Hata Kodu:", error.response.status);
      console.log("Hata Detayı:", error.response.data);
    } else if (error.request) {
      console.log("Sunucudan yanıt alınamadı:", error.request);
    } else {
      console.log("İstek yapılamadı:", error.message);
    }
    throw error;
  }
}

export const getProducts = async (pageNumber = 1, pageSize = 50) => {
  const response = await API.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  return response.data;
};

// Yeni ürün ekle
export const addProduct = async (productData) => {
  try {
    const response = await API.post("/products", productData); // /products endpoint'ine yeni ürün gönderiyoruz
    return response.data; // Veriyi döndürüyoruz
  } catch (error) {
    console.error("Ürün eklerken bir hata oluştu:", error);
    throw error;
  }
};
export const searchProducts = async (query) => {
  try {
    const response = await API.get("/products/search", {  // Endpoint doğru mu?
      params: { searchTerm: query }  // Backend'in beklediği parametre adı 'searchTerm'
    });
    return response.data.products;  // API'den gelen ürünleri döndür
  } catch (error) {
    console.error("Arama hatası:", error);
    throw error;
  }
};



// Ürünü düzenle
export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await API.put(`/products/${productId}`, updatedData); // Ürün ID'sine göre güncelleme
    return response.data;
  } catch (error) {
    console.error("Ürün güncellenirken bir hata oluştu:", error);
    throw error;
  }
};

// Ürünü sil
export const deleteProduct = async (productId) => {
  try {
    const response = await API.delete(`/products/${productId}`); // Ürünü silme
    return response.data;
  } catch (error) {
    console.error("Ürün silinirken bir hata oluştu:", error);
    throw error;
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

