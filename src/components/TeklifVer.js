import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, TextField, Button, MenuItem } from "@mui/material";
import "./TeklifVer.css"; // Stil dosyası

const TeklifVer = ({ isSidebarOpen }) => {
  const [musteriler, setMusteriler] = useState([]); // Müşteri listesi
  const [urunler, setUrunler] = useState([]); // Ürün listesi
  const [secilenMusteri, setSecilenMusteri] = useState("");
  const [secilenUrun, setSecilenUrun] = useState("");
  const [adet, setAdet] = useState("");
  const [fiyat, setFiyat] = useState("");

  // Örnek müşteri ve ürün verilerini yükleme
  useEffect(() => {
    setMusteriler([
      { id: 1, adSoyad: "Ahmet Yılmaz" },
      { id: 2, adSoyad: "Mehmet Kaya" },
    ]);

    setUrunler([
      { id: 101, ad: "Laptop", fiyat: 15000, stok: 5 },
      { id: 102, ad: "Telefon", fiyat: 8000, stok: 10 },
    ]);
  }, []);

  // Fiyat hesaplama fonksiyonu
  const handleFiyatHesapla = () => {
    const urun = urunler.find((u) => u.id === parseInt(secilenUrun));
    if (urun) {
      if (parseInt(adet) > urun.stok) {
        alert("Yetersiz stok!");
      } else {
        setFiyat(urun.fiyat * parseInt(adet));
      }
    }
  };

  // Teklif oluşturma fonksiyonu
  const handleTeklifVer = () => {
    if (!secilenMusteri || !secilenUrun || !adet || !fiyat) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
    alert(`Teklif Oluşturuldu! Müşteri: ${secilenMusteri}, Ürün: ${secilenUrun}, Adet: ${adet}, Fiyat: ${fiyat}`);
  };

  return (
    <div className={`teklif-container ${isSidebarOpen ? "open" : "closed"}`}>
      <h1>Teklif Ver</h1>

      <Card style={{ padding: "20px", background: "#f8f9fa" }}>
        <CardContent>
          <Typography variant="h6">Teklif Bilgileri</Typography>

          {/* Müşteri Seçimi */}
          <TextField
            select
            label="Müşteri Seç"
            fullWidth
            variant="outlined"
            size="small"
            value={secilenMusteri}
            onChange={(e) => setSecilenMusteri(e.target.value)}
            style={{ marginBottom: "10px" }}
          >
            {musteriler.map((musteri) => (
              <MenuItem key={musteri.id} value={musteri.id}>
                {musteri.adSoyad}
              </MenuItem>
            ))}
          </TextField>

          {/* Ürün Seçimi */}
          <TextField
            select
            label="Ürün kodu"
            fullWidth
            variant="outlined"
            size="small"
            value={secilenUrun}
            onChange={(e) => setSecilenUrun(e.target.value)}
            style={{ marginBottom: "10px" }}
          >
            {urunler.map((urun) => (
              <MenuItem key={urun.id} value={urun.id}>
                {urun.id}
              </MenuItem>
            ))}
          </TextField>

          {/* Adet Girişi */}
          <TextField
            label="Adet"
            fullWidth
            variant="outlined"
            size="small"
            type="number"
            value={adet}
            onChange={(e) => setAdet(e.target.value)}
            style={{ marginBottom: "10px" }}
          />

          {/* Fiyat Alanı */}
          <TextField
            label="Fiyat"
            fullWidth
            variant="outlined"
            size="small"
            value={fiyat}
            disabled
            style={{ marginBottom: "20px" }}
          />

          {/* Butonlar */}
          <div className="button-container">
            <Button variant="contained" color="primary" onClick={handleFiyatHesapla}>
              Fiyat Hesapla
            </Button>

            <Button variant="contained" style={{ backgroundColor: "orange", color: "white" }} onClick={handleTeklifVer}>
              Teklif Ver
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeklifVer;
