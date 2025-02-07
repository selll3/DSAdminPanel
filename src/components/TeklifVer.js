import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, TextField, Button, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import "./TeklifVer.css"; 

const TeklifVer = ({ isSidebarOpen }) => {
  const [musteriler, setMusteriler] = useState([]);
  const [urunler, setUrunler] = useState([]);
  const [secilenMusteri, setSecilenMusteri] = useState("");
  const [secilenUrun, setSecilenUrun] = useState("");
  const [adet, setAdet] = useState("");
  const [fiyat, setFiyat] = useState("");
  const [musteriSearch, setMusteriSearch] = useState("");
  const [urunSearch, setUrunSearch] = useState("");
  const [eskiFiyat, setEskiFiyat] = useState("");
  const [yeniFiyat, setYeniFiyat] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [tempYeniFiyat, setTempYeniFiyat] = useState("");

  useEffect(() => {
    setMusteriler([
      { id: 1, adSoyad: "Ahmet Yılmaz" },
      { id: 2, adSoyad: "Mehmet Kaya" },
      { id: 3, adSoyad: "Mehmet Demir" },
      { id: 4, adSoyad: "Ahmet Çelik" }
    ]);

    setUrunler([
      { id: 101, ad: "Laptop", fiyat: 15000, stok: 5 },
      { id: 102, ad: "Telefon", fiyat: 8000, stok: 10 },
      { id: 103, ad: "Tablet", fiyat: 6000, stok: 7 }
    ]);
  }, []);

  const filteredMusteriler = musteriSearch
    ? musteriler.filter((musteri) =>
        musteri.adSoyad.toLowerCase().includes(musteriSearch.toLowerCase())
      )
    : musteriler;

  const filteredUrunler = urunSearch
    ? urunler.filter((urun) => urun.id.toString().includes(urunSearch))
    : urunler;

  useEffect(() => {
    if (secilenUrun) {
      const urun = urunler.find((u) => u.id === parseInt(secilenUrun));
      if (urun) {
        setEskiFiyat(urun.fiyat);
        setYeniFiyat(""); 
      }
    }
  }, [secilenUrun]);

  const handleFiyatDegistir = () => {
    if (!secilenUrun) {
      alert("Lütfen önce bir ürün seçin!");
      return;
    }
    setOpenDialog(true);
  };

  const handleDialogClose = (confirm) => {
    if (confirm) {
      setYeniFiyat(tempYeniFiyat);
    }
    setTempYeniFiyat("");
    setOpenDialog(false);
  };

  const handleFiyatHesapla = () => {
    const urun = urunler.find((u) => u.id === parseInt(secilenUrun));
    if (urun) {
      const fiyatKaynak = yeniFiyat ? parseInt(yeniFiyat) : urun.fiyat;
      if (parseInt(adet) > urun.stok) {
        alert("Yetersiz stok!");
      } else {
        setFiyat(fiyatKaynak * parseInt(adet));
      }
    }
  };

  const handleTeklifVer = () => {
    if (!secilenMusteri || !secilenUrun || !adet || !fiyat) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
    alert(`Teklif Oluşturuldu! 
    Müşteri: ${secilenMusteri}, 
    Ürün: ${secilenUrun}, 
    Adet: ${adet}, 
    Birim Fiyat: ${yeniFiyat || eskiFiyat}, 
    Toplam Fiyat: ${fiyat}`);
  };

  return (
    <div className={`teklif-container ${isSidebarOpen ? "open" : "closed"}`}>
      <h1>Teklif Ver</h1>

      <Card style={{ padding: "20px", background: "#f8f9fa" }}>
        <CardContent>
          <Typography variant="h6">Teklif Bilgileri</Typography>

          <TextField
            label="Müşteri Ara"
            fullWidth
            variant="outlined"
            size="small"
            value={musteriSearch}
            onChange={(e) => setMusteriSearch(e.target.value)}
            style={{ marginBottom: "10px" }}
          />

          <TextField
            select
            label="Müşteri Seç"
            fullWidth
            variant="outlined"
            size="small"
            value={secilenMusteri}
            onChange={(e) => setSecilenMusteri(e.target.value)}
            style={{ marginBottom: "20px" }}
          >
            {filteredMusteriler.map((musteri) => (
              <MenuItem key={musteri.id} value={musteri.id}>
                {musteri.adSoyad}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Ürün Ara (Ürün Kodu)"
            fullWidth
            variant="outlined"
            size="small"
            value={urunSearch}
            onChange={(e) => setUrunSearch(e.target.value)}
            style={{ marginBottom: "10px" }}
          />

          <TextField
            select
            label="Ürün Seç"
            fullWidth
            variant="outlined"
            size="small"
            value={secilenUrun}
            onChange={(e) => setSecilenUrun(e.target.value)}
            style={{ marginBottom: "10px" }}
          >
            {filteredUrunler.map((urun) => (
              <MenuItem key={urun.id} value={urun.id}>
                {urun.id} - {urun.ad}
              </MenuItem>
            ))}
          </TextField>

          {secilenUrun && (
            <div style={{ marginBottom: "20px" }}>
              <Typography variant="body1">Eski Fiyat: {eskiFiyat}₺</Typography>
              <Typography variant="body1">Yeni Fiyat: {yeniFiyat || "Değiştirilmedi"}</Typography>
              <Button variant="outlined" onClick={handleFiyatDegistir}>
                Birim Fiyatı Değiştir
              </Button>
            </div>
          )}

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

          <TextField
            label="Fiyat"
            fullWidth
            variant="outlined"
            size="small"
            value={fiyat}
            disabled
            style={{ marginBottom: "20px" }}
          />

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

      <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
        <DialogTitle>Fiyatı Değiştir</DialogTitle>
        <DialogContent>
          <DialogContentText>Yeni birim fiyatı girin:</DialogContentText>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            type="number"
            value={tempYeniFiyat}
            onChange={(e) => setTempYeniFiyat(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)}>Vazgeç</Button>
          <Button onClick={() => handleDialogClose(true)} color="primary">Evet</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeklifVer;
