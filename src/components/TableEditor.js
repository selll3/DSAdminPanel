import React, { useState, useEffect } from "react";
import { getProducts, searchProducts } from "../api/api";
import { addProduct, deleteProduct, updateProduct } from "../api/api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Card, CardContent, Typography, Modal, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import "./TableEditor.css"; // Stil dosyası

const TableEditor = ({ isSidebarOpen }) => {
  const columnNames = [
    "Ürün_kodu", "İsim", "DVZ", "Birim_ fiyat", "İSK", "Marka", "TESLİM", "MİKTAR", "Birim", 
    "TEMİN", "Kutu_Miktarı", "Etiketler", "KDV", "Stok", "Ana_kategori", 
    "Stok_kullanır", "Kritik_stok_miktarı"
  ];

  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newRow, setNewRow] = useState({});
  const [editingRow, setEditingRow] = useState(null); 
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Silme onayı için state
  const [rowToDelete, setRowToDelete] = useState(null); // Silinecek satır

  // Tüm veriyi alıyoruz
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProducts(pageNumber, 50); // API'den ürünler al
        setTableData(data.products);
        setFilteredData(data.products); // Filtreleme işlemi için veri
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Ürünler alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageNumber]);

  // Arama işlemi
  const handleSearch = async (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  
    try {
      if (query === "") {
        // Arama kutusu boşsa tüm veriyi getir
        const data = await getProducts(pageNumber, 50);
        setTableData(data.products);
        setFilteredData(data.products);
        setTotalPages(data.totalPages);
      } else {
        // Arama fonksiyonunu çağır
        const searchResults = await searchProducts(query);
        console.log("Arama Sonuçları:", searchResults);
        setFilteredData(searchResults); // Filtrelenmiş ürünleri güncelle
        setTotalPages(Math.ceil(searchResults.length / 50)); // Sayfa sayısını hesapla
      }
    } catch (error) {
      console.error("Arama hatası:", error);
    }
  
    setPageNumber(1); // Sayfa numarasını sıfırla
  };

  // Yeni satır ekleme
  const handleAddRow = async () => {
    if (!newRow["Ürün_kodu"] || !newRow["İsim"] || !newRow["Birim_ fiyat"]) {
      alert("Ürün Kodu, İsim ve Birim Fiyat alanları boş bırakılamaz!");
      return;
    }
  
    try {
      const newProduct = await addProduct(newRow);
      setTableData([...tableData, newProduct]);
      setFilteredData([...filteredData, newProduct]);
      setNewRow({});
    } catch (error) {
      console.error("Yeni ürün eklenemedi:", error);
    }
  };

  // Satır düzenleme
  const handleEditRow = (row) => {
    setEditingRow(row);
    setOpenModal(true); // Modal'ı aç
  };

  // Satır güncelleme
 // Satır güncelleme
 const handleUpdateRow = async () => {
  if (!editingRow) return;

  try {
    // Ürün güncelleniyor
    await updateProduct(editingRow.urunid, editingRow);

    // Sayfa numarasını sıfırlayıp yeni veriyi alıyoruz
    setPageNumber(1);  // Sayfa numarasını sıfırlıyoruz
    const data = await getProducts(1, 50);  // 1. sayfayı yeniden al
    setTableData(data.products);  // Yeni veriyi tabloya set ediyoruz
    setFilteredData(data.products);  // Filtreli veriyi de güncelliyoruz

    // Modal'ı kapat
    setOpenModal(false);

  } catch (error) {
    console.error("Ürün güncellenemedi:", error);
  }
};



  // Silme işlemi onayı
  const handleDeleteRow = async () => {
    try {
      await deleteProduct(rowToDelete.urunid);
      const updatedData = tableData.filter((row) => row.urunid !== rowToDelete.urunid);
      setTableData(updatedData);
      setFilteredData(updatedData);
      setOpenDeleteDialog(false); // Dialog'ı kapat
    } catch (error) {
      console.error("Ürün silinemedi:", error);
    }
  };
  

  // Sayfa değişimi
  const handlePageChange = (newPageNumber) => {
    if (newPageNumber > 0 && newPageNumber <= totalPages) {
      setPageNumber(newPageNumber);
    }
  };

  return (
    <div className={`table-container ${isSidebarOpen ? "open" : "closed"}`}>
      <h1>Tablo Düzenlemeleri</h1>

      {/* Arama Kutusu */}
      <TextField
        label="Ara..."
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: "20px", width: "100%" }}
      />

      {/* Yeni Kayıt Ekleme Alanı */}
      <Card style={{ marginBottom: "20px", padding: "15px", background: "#f8f9fa" }}>
        <CardContent>
          <Typography variant="h6">Yeni Kayıt Ekle</Typography>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {columnNames.map((colName, index) => (
              <TextField
                key={index}
                variant="outlined"
                size="small"
                label={colName}
                value={newRow[`col${index + 1}`] || ""}
                onChange={(e) => setNewRow({ ...newRow, [`col${index + 1}`]: e.target.value })}
                style={{ flex: "1 1 150px", minWidth: "120px" }}
              />
            ))}
            <Button variant="contained" color="primary" onClick={handleAddRow}>
              Ekle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal Düzenleme Formu */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="modal-content" style={{
          padding: "20px", 
          background: "#fff", 
          width: "400px", 
          margin: "100px auto", 
          maxHeight: "80vh", 
          overflowY: "auto"
        }}>
          <Typography variant="h6">Ürün Düzenle</Typography>
          {editingRow && columnNames.map((colName, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <TextField
                label={colName}
                value={editingRow[colName.toLowerCase().replace(/\s+/g, '')] || ""}
                onChange={(e) =>
                  setEditingRow({ ...editingRow, [colName.toLowerCase().replace(/\s+/g, '')]: e.target.value })
                }
                variant="outlined"
                size="small"
                fullWidth
              />
            </div>
          ))}
          <Button variant="contained" color="primary" onClick={handleUpdateRow}>
            Güncelle
          </Button>
        </div>
      </Modal>

      {/* Silme Onay Dialog'u */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Silmek İstediğinizden Emin Misiniz?</DialogTitle>
        <DialogContent>
          <Typography>Bu ürün silinecektir. Devam etmek istiyor musunuz?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Hayır
          </Button>
          <Button onClick={handleDeleteRow} color="secondary">
            Evet
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tablo */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columnNames.map((colName, index) => (
                <TableCell key={index}>{colName}</TableCell>
              ))}
              <TableCell>Aksiyon</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice((pageNumber - 1) * 50, pageNumber * 50).map((row, index) => (
              <TableRow key={index}>
                {columnNames.map((colName, colIndex) => (
                  <TableCell key={colIndex}>{row[colName.toLowerCase().replace(/\s+/g, '')] || "-"}</TableCell>
                ))}
                <TableCell>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <Button variant="contained" color="warning" onClick={() => handleEditRow(row)}>
                      Düzenle
                    </Button>
                    <Button 
                      variant="contained" 
                      color="error" 
                      onClick={() => {
                        setRowToDelete(row);  // Silinecek satırı ayarla
                        setOpenDeleteDialog(true); // Dialog'u aç
                      }}
                    >
                      Sil
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Sayfa Numarası */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
        <Button disabled={pageNumber <= 1} onClick={() => handlePageChange(pageNumber - 1)}>
          Önceki
        </Button>
        <span style={{ margin: "0 10px" }}>
          Sayfa {pageNumber} / {totalPages}
        </span>
        <Button disabled={pageNumber >= totalPages} onClick={() => handlePageChange(pageNumber + 1)}>
          Sonraki
        </Button>
      </div>
    </div>
  );
};

export default TableEditor;
