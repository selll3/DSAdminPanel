import React, { useState } from "react";
import Select from "react-select";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./TeklifVer.css";

// Mevcut müşteri ve ürün verileri
const Musteriler = [
  { label: "Ahmet Yılmaz", value: "Ahmet Yılmaz" },
  { label: "Mehmet Kaya", value: "Mehmet Kaya" },
  { label: "Ayşe Demir", value: "Ayşe Demir" },
  // Diğer müşteriler...
];

const Urunler = [
  { kod: "UR001", cins: "Demir Boru", dvz: "TL", fiyat: 150, isk: 10, marka: "X", teslim: "7 Gün" },
  { kod: "UR002", cins: "Bakır Tel", dvz: "USD", fiyat: 200, isk: 5, marka: "Y", teslim: "10 Gün" },
  // Diğer ürünler...
];

const TeklifVer = () => {
  const [musteri, setMusteri] = useState(null); // Müşteri
  const [urun, setUrun] = useState(null); // Seçilen ürün
  const [miktar, setMiktar] = useState(1); // Miktar
  const [birimFiyat, setBirimFiyat] = useState(0); // Birim fiyat
  const [urunlerTablo, setUrunlerTablo] = useState([]); // Ürün tablosu
  const [teklifTarihi, setTeklifTarihi] = useState(new Date().toISOString().split("T")[0]); // Teklif tarihi
  const [gecerlilikTarihi, setGecerlilikTarihi] = useState(new Date().toISOString().split("T")[0]); // Geçerlilik tarihi
  const [teklifSaati, setTeklifSaati] = useState("12:00"); // Teklif saati
  const [kdvOrani, setKdvOrani] = useState(18); // KDV oranı

  // Müşteri seçimi
  const musteriSec = (selectedOption) => {
    setMusteri(selectedOption);
  };

  // Ürün seçimi
  const urunSec = (selectedOption) => {
    if (selectedOption) {
      const secilenUrun = Urunler.find((u) => u.kod === selectedOption.value);
      setUrun(secilenUrun);
      setBirimFiyat(secilenUrun ? secilenUrun.fiyat : 0);
    } else {
      setUrun(null);
      setBirimFiyat(0);
    }
  };

  // Ürün ekleme
  const urunEkle = () => {
    if (!urun) return;
    const yeniUrun = {
      kod: urun.kod,
      cins: urun.cins,
      dvz: urun.dvz,
      fiyat: urun.fiyat,
      isk: urun.isk,
      marka: urun.marka,
      teslim: urun.teslim,
      miktar: miktar,
      birimFiyat: birimFiyat,
      tutar: miktar * birimFiyat
    };
    setUrunlerTablo([...urunlerTablo, yeniUrun]);
  };

  // Toplam hesaplaması
  const calculateTotals = () => {
    let toplamTL = 0;
    let toplamUSD = 0;
    let toplamEURO = 0;

    urunlerTablo.forEach((item) => {
      if (item.dvz === "TL") {
        toplamTL += item.tutar;
      } else if (item.dvz === "USD") {
        toplamUSD += item.tutar;
      } else if (item.dvz === "EURO") {
        toplamEURO += item.tutar;
      }
    });

    const kdv = (toplamTL * kdvOrani) / 100;
    const genelToplam = toplamTL + kdv;

    return {
      toplamTL,
      toplamUSD,
      toplamEURO,
      kdv,
      genelToplam,
    };
  };

  const handleGeneratePDF = () => {
    if (urunlerTablo.length === 0) {
      alert("Tablo verisi bulunamadı! Lütfen önce ürün ekleyin.");
      return;
    }
    generatePDF(urunlerTablo);
  };

  const generatePDF = (tableData) => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    doc.setFont('Arial');

    // Şirket Bilgileri
    doc.setFontSize(10);
    doc.text("Şirket Adı", 15, 15);
    doc.text("Şirket Adı Devamı", 15, 20);
    doc.text("Açık Adres", 15, 25);
    doc.text("Gebze / Kocaeli", 15, 30);
    doc.text("Telefon Numarası", 15, 35);
    doc.text(`FİRMA: ${musteri.label}`, 15, 40);
    doc.text("SN:", 15, 45);

    // Sol Üstte Logo
    doc.addImage("Demse_Ymza_Logo.png", "PNG", 85, 10, 40, 15);

    // Teklifimizdir Yazısı
    doc.setFontSize(14);
    doc.text("Teklifimizdir", 105, 50, { align: "center" });

    // Teklif Bilgileri (Tarih vs.)
    doc.setFontSize(10);
    doc.addImage("Demse_Ymza_Logo.png", "PNG", 150, 10, 40, 15);
    doc.text(`Teklif Tarihi: ${new Date(teklifTarihi).toLocaleDateString()} `, 150, 30);
    doc.text(`Geçerlilik Tarihi: ${new Date(gecerlilikTarihi).toLocaleDateString()}`, 150, 35);

    // Ürün Tablosu
    const columns = [
      "Sıra No", "Stok Kodu", "Malzeme Cinsi", "DVZ", "Liste Fiyatı",
      "ISK", "Marka", "Teslim", "MİK", "BR", "Birim Fiyat", "Tutar"
    ];

    const rows = tableData.map((item, index) => [
      index + 1,
      item.kod,
      item.cins,
      item.dvz,
      item.fiyat,
      item.isk,
      item.marka,
      item.teslim,
      item.miktar,
      "-",
      item.birimFiyat,
      item.tutar
    ]);

    doc.autoTable({
      startY: 60,
      head: [columns],
      body: rows,
      theme: "grid",
      styles: { font: "Lora", fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [200, 200, 200] },
    });

    // Toplamlar
    const totals = calculateTotals();
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Toplam TL: ${totals.toplamTL.toFixed(2)} TL`, 150, finalY);
    doc.text(`Toplam USD: ${totals.toplamUSD.toFixed(2)} USD`, 150, finalY + 5);
    doc.text(`Toplam EURO: ${totals.toplamEURO.toFixed(2)} EURO`, 150, finalY + 10);
    doc.text(`KDV (${kdvOrani}%): ${totals.kdv.toFixed(2)} TL`, 150, finalY + 20);
    doc.text(`GENEL TOPLAM: ${totals.genelToplam.toFixed(2)} TL`, 150, finalY + 30);

    // PDF İndirme
    doc.save("Teklif.pdf");
  };

  return (
    <div className="teklif-container">
      <h2>Teklif Ver</h2>

      {/* Müşteri Seçimi */}
      <div className="dropdown-container">
        <label>Müşteri Seç:</label>
        <Select
          value={musteri}
          onChange={musteriSec}
          options={Musteriler}
          getOptionLabel={(e) => e.label}
          getOptionValue={(e) => e.value}
          isClearable={true}
          placeholder="Müşteri arayın..."
        />
      </div>

      {/* Ürün Seçimi */}
      <div className="dropdown-container">
        <label>Ürün Seç:</label>
        <Select
          options={Urunler.map((urun) => ({ value: urun.kod, label: urun.kod + " - " + urun.cins }))} 
          onChange={urunSec} 
          value={urun ? { value: urun.kod, label: urun.kod + " - " + urun.cins } : null} 
        />
      </div>
 {/* Teklif Tarihi ve Geçerlilik Tarihi Seçimi */}
 <div className="dropdown-container">
        <label>Teklif Tarihi:</label>
        <input
          type="date"
          value={teklifTarihi}
          onChange={(e) => setTeklifTarihi(e.target.value)}
          min={new Date().toISOString().split("T")[0]} // Bugünden önceki tarihleri engelle
        />
      </div>

      <div className="dropdown-container">
        <label>Geçerlilik Tarihi:</label>
        <input
          type="date"
          value={gecerlilikTarihi}
          onChange={(e) => setGecerlilikTarihi(e.target.value)}
          min={new Date().toISOString().split("T")[0]} // Bugünden önceki tarihleri engelle
        />
      </div>
      {/* Ürün ve Miktar Ekleme */}
      {urun && (
        <div className="urun-bilgileri">
          <p><strong>Malzeme:</strong> {urun.cins}</p>
          <p><strong>Döviz:</strong> {urun.dvz}</p>
          <p><strong>Birim Fiyat:</strong> {urun.fiyat} TL</p>
          <p><strong>İskonto:</strong> {urun.isk}%</p>
          <p><strong>Marka:</strong> {urun.marka}</p>
          <p><strong>Teslimat Süresi:</strong> {urun.teslim}</p>
        </div>
      )}

      {/* Ürün Miktarı ve Birim Fiyatı */}
      <div className="urun-miktar-birim-fiyat">
        <label>Miktar:</label>
        <input type="number" value={miktar} onChange={(e) => setMiktar(e.target.value)} min="1" />
        <label>Birim Fiyat:</label>
        <input
          type="number"
          value={birimFiyat}
          onChange={(e) => setBirimFiyat(e.target.value)}
          min="0"
        />
      </div>

      {/* Ürün Ekleme Butonu */}
      <button onClick={urunEkle}>Ürün Ekle</button>

      {/* Ürünler Tablosu */}
      <div className="urun-tablosu">
        <h3>Ürünler Tablosu</h3>
        <table>
          <thead>
            <tr>
              <th>Sıra No</th>
              <th>Stok Kodu</th>
              <th>Malzeme Cinsi</th>
              <th>DVZ</th>
              <th>Liste Fiyatı</th>
              <th>İskonto</th>
              <th>Marka</th>
              <th>Teslim</th>
              <th>Miktar</th>
              <th>Birim Fiyat</th>
              <th>Tutar</th>
            </tr>
          </thead>
          <tbody>
            {urunlerTablo.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.kod}</td>
                <td>{item.cins}</td>
                <td>{item.dvz}</td>
                <td>{item.fiyat}</td>
                <td>{item.isk}</td>
                <td>{item.marka}</td>
                <td>{item.teslim}</td>
                <td>{item.miktar}</td>
                <td>{item.birimFiyat}</td>
                <td>{item.tutar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toplamlar ve PDF Üret */}
      <div className="button-container">
        <p><strong>Toplam TL:</strong> {calculateTotals().toplamTL.toFixed(2)} TL</p>
        <p><strong>Toplam USD:</strong> {calculateTotals().toplamUSD.toFixed(2)} USD</p>
        <p><strong>Toplam EURO:</strong> {calculateTotals().toplamEURO.toFixed(2)} EURO</p>
        <p><strong>KDV:</strong> {calculateTotals().kdv.toFixed(2)} TL</p>
        <p><strong>GENEL TOPLAM:</strong> {calculateTotals().genelToplam.toFixed(2)} TL</p>
        <button onClick={handleGeneratePDF}>Teklifi PDF'e Dönüştür</button>
      </div>
    </div>
  );
};

export default TeklifVer;
