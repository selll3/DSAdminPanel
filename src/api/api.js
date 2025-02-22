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
    const response = await API.post("/products", productData); // API'ye yeni ürün ekleme
    return response.data; // API'nin döndürdüğü yeni ürünü geri döndür
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



export const updateProduct = async (urunid, updatedProduct) => {
  try {
    const response = await API.put(`/products/${urunid}`, updatedProduct); // DÜZELTİLDİ
    return response.data;
  } catch (error) {
    console.error("Ürün güncellenirken bir hata oluştu:", error);
    throw error;
  }
};

export const deleteProduct = async (urunid) => {
  if (!urunid) {
    throw new Error("Ürün ID'si geçersiz!");
  }

  try {
    const response = await API.delete(`/products/${urunid}`); // Ürünü silme isteği
    return response.data; // Başarılıysa geri döndür
  } catch (error) {
    console.error(`Ürün (ID: ${urunid}) silinirken bir hata oluştu:`, error);
    throw error; // Hatanın üst katmana ulaşmasını sağlar
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

// Müşterileri getir
export const getMusteriler = async () => {
  const response = await API.get("/musteri");
  return response.data;
};

export const getUrunler = async (search, pageNumber = 1, pageSize = 10) => {
  if (!search || search.length < 4) {
    console.warn("Arama terimi en az 4 karakter olmalıdır.");
    return { products: [], totalItems: 0, totalPages: 0 };
  }

  try {
    console.log("API'ye istek yapılıyor:", search);
    const response = await API.get("/products/urun", { // ✅ Endpoint `/products/urun`
      params: { search, page: pageNumber, pageSize }, // ✅ `searchTerm` yerine `search`
    });

    console.log("API Yanıtı:", response.data);
    return response.data; // API'den dönen veriyi döndür
  } catch (error) {
    console.error("Ürünleri çekerken hata oluştu:", error.response?.data || error.message);
    return { products: [], totalItems: 0, totalPages: 0 };
  }
};






export const postTeklif = async (teklif) => {
  const response = await API.post("/teklif", teklif);
  return response.data; // Buradan teklif_id gelecek
};

export const postTeklifUrunleri = async (teklifUrunleri) => {
  const response = await API.post("/teklifurunleri", teklifUrunleri);
  return response.data;
};