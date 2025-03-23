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





// Ürün Güncelleme API Çağrısı
export const updateProduct = async (urunid, updatedProduct) => {
  try {
    console.log("GÖNDERİLEN VERİ:", updatedProduct);

    const response = await API.put(
      `/products/${urunid}`,
      { ...updatedProduct }, // Nesneyi doğru formatta gönderiyoruz
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Yanıtı:", response);
    return response.data; // RETURN yapısını bozmadan geri döndürüyoruz.
  } catch (error) {
    console.error("Ürün güncellenirken bir hata oluştu:", error.response?.data || error.message);
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
export const getMusteriler = async (search, pageNumber = 1, pageSize = 10) => {
  if (!search || search.length < 3) {
    console.warn("Müşteri arama terimi en az 3 karakter olmalıdır.");
    return { musteriler: [], totalItems: 0, totalPages: 0 };
  }

  try {
    console.log("Müşteri API'ye istek yapılıyor:", search);
    const response = await API.get("/musteri", {
      params: { search, page: pageNumber, pageSize },
    });

    console.log("API Yanıtı:", response.data);
    return response.data;
  } catch (error) {
    console.error("Müşterileri çekerken hata oluştu:", error.response?.data || error.message);
    return { musteriler: [], totalItems: 0, totalPages: 0 };
  }
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






 // API bağlantılarını yöneten dosyan

 // API nesnesini içe aktar



// Teklif oluşturma
// Teklif kaydetme API çağrısı
export const createTeklif = async (teklifData) => {
  try {
    const response = await API.post(`/teklif`, teklifData);
 
      return response.data; // Backend'den dönen { message, teklifId } nesnesini döndür

  } catch (error) {
    console.error("Teklif oluşturulurken hata oluştu:", error.response?.data || error.message);
    throw error;
  }
};

// **Teklif ürünlerini ekleme API'si**
export const createTeklifUrunleri = async (urunlerData) => {
  try {
    const response = await API.post(`/teklifurunleri`, urunlerData);
    return response.data;
  } catch (error) {
    console.error("Teklif ürünleri eklenirken hata oluştu:", error.response?.data || error.message);
    throw error;
  }
};



// Teklifleri listeleme
export const getTeklifler = async () => {
  try {
    const response = await API.get(`/teklif`);
    return response.data;
  } catch (error) {
    console.error("Teklifler alınırken hata oluştu:", error);
    throw error;
  }
};

// Teklif detayını alma
export const getTeklifById = async (id) => {
  try {
    const response = await API.get(`/teklif/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Teklif ${id} alınırken hata oluştu:`, error);
    throw error;
  }
};

// Teklif ürünü ekleme
export const createTeklifUrun = async (urunData) => {
  try {
    const response = await API.post(`/teklifurunleri`, urunData);
    return response.data;
  } catch (error) {
    console.error("Teklif ürünü eklenirken hata oluştu:", error);
    throw error;
  }
};

 