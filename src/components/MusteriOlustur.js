import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Yönlendirme için kullanıyoruz
import "./MusteriOlustur.css"; // Stil dosyası

const MusteriOlustur = ({ isSidebarOpen }) => {
  const navigate = useNavigate(); // Yönlendirme için useNavigate hook'u

  const [adSoyad, setAdSoyad] = useState(""); // Ad-Soyad
  const [telefon, setTelefon] = useState(""); // Telefon numarası
  const [email, setEmail] = useState(""); // Email adresi
  const [adres, setAdres] = useState(""); // Adres

  // Formu göndermek için gerekli fonksiyon
  const handleMusteriOlustur = () => {
    if (!adSoyad || !telefon || !email || !adres) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    // Burada veritabanına kaydetme işlemi yapılabilir.
    alert(`Müşteri oluşturuldu! ${adSoyad} - ${telefon} - ${email} - ${adres}`);
    
    // Başka bir sayfaya yönlendirme
    navigate("/dashboard");
  };

  return (
    <div className={`musteri-olustur-container ${isSidebarOpen ? "open" : "closed"}`}>
      

      <Card style={{ maxWidth: "600px", margin: "auto", padding: "20px", background: "#f8f9fa" }}>
        <CardContent>
          <Typography variant="h6">Müşteri Bilgilerini Girin</Typography>

          {/* Ad-Soyad */}
          <TextField
            label="Ad,Soyad veya firma"
            fullWidth
            variant="outlined"
            size="small"
            value={adSoyad}
            onChange={(e) => setAdSoyad(e.target.value)}
            style={{ marginBottom: "10px" }}
          />

          {/* Telefon */}
          <TextField
            label="Telefon Numarası"
            fullWidth
            variant="outlined"
            size="small"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
            style={{ marginBottom: "10px" }}
          />

          {/* Email */}
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "10px" }}
          />

          {/* Adres */}
          <TextField
            label="Adres"
            fullWidth
            variant="outlined"
            size="small"
            value={adres}
            onChange={(e) => setAdres(e.target.value)}
            style={{ marginBottom: "20px" }}
          />

          {/* Müşteri Oluştur Butonu */}
          <Button
            variant="contained"
            style={{ backgroundColor: "orange", color: "white", marginTop: "20px" }}
            fullWidth
            onClick={handleMusteriOlustur}
          >
            Müşteri Oluştur
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MusteriOlustur;
