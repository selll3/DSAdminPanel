import React, { useState, useEffect } from "react";
import {getProducts } from "../api/api";
import { addProduct } from "../api/api";
import {  deleteProduct } from "../api/api";
import {  updateProduct } from "../api/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import "./TableEditor.css"; // Stil dosyası

const TableEditor = ({ isSidebarOpen }) => {
  const  columnNames = [
    "Ürün Kodu", "İsim", "DVZ", "Birim Fiyat", "İSK", "Marka", "Teslim", "Miktar", "Birim", 
    "Temin", "Birim Maliyet", "Kutu Miktarı", "Etiketler", "KDV", "Stok", "Ana kategori", 
    "Stok kullanır", "Kritik stok miktarı"
  ];

  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newRow, setNewRow] = useState({}); // Yeni kayıt için state
  const [editingRow, setEditingRow] = useState(null); 
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);// Düzenlenen satırın ID'si

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts(); // Backend'den verileri alıyoruz
        setTableData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Ürünler alınamadı:", error);
      }
    };
  
    fetchData();
  }, []);
  

  // Arama işlemi
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredData(
      tableData.filter((item) =>
        Object.values(item).some((value) => value.toString().toLowerCase().includes(query))
      )
    );
  };

  // Yeni satır ekleme
  const handleAddRow = async () => {
    if (!newRow.col1) return;
    try {
      const newProduct = await addProduct(newRow); // Backend'e yeni ürün ekliyoruz
      setTableData([...tableData, newProduct]); // Tabloya yeni ürün ekliyoruz
      setFilteredData([...filteredData, newProduct]); // Filtrelenmiş verilere ekliyoruz
      setNewRow({}); // Formu sıfırlıyoruz
    } catch (error) {
      console.error("Yeni ürün eklenemedi:", error);
    }
  };
  
  const handleEditRow = async (id, updatedRow) => {
    try {
      const updatedProduct = await updateProduct(id, updatedRow); // Ürün güncelleniyor
      const updatedData = tableData.map((row) =>
        row.id === id ? updatedProduct : row
      );
      setTableData(updatedData); // Tabloyu güncelliyoruz
      setFilteredData(updatedData); // Filtrelenmiş verileri güncelliyoruz
    } catch (error) {
      console.error("Ürün düzenlenemedi:", error);
    }
  };
  
  // Satır silme
  const handleDeleteRow = async (id) => {
    try {
      await deleteProduct(id); // Ürün siliniyor
      const updatedData = tableData.filter((row) => row.id !== id); // Tabloyu güncelliyoruz
      setTableData(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.error("Ürün silinemedi:", error);
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
          label={colName} // Dinamik olarak sütun başlığını alıyor
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
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                {columnNames.map((_, i) => (
                  <TableCell key={i}>{row[`col${i + 1}`] || "-"}</TableCell>
                ))}
                <TableCell>
                  <div style={{ display: "flex", gap: "5px" }}>
                  <Button
            variant="contained"
            color="warning"
            onClick={() => handleEditRow(row.id, row)} // Düzenleme butonu
          >
                      Düzenle
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteRow(row.id)}
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
    </div>
  );
};

export default TableEditor;



/*const columnNames = [
    "Ürün Kodu", "İsim", "DVZ", "Birim Fiyat", "İSK", "Marka", "Teslim", "Miktar", "Birim", 
    "Temin", "Birim Maliyet", "Kutu Miktarı", "Etiketler", "KDV", "Stok", "Ana kategori", 
    "Stok kullanır", "Kritik stok miktarı", "Açıklama"
  ];
  */


  /*const data = [
        { col1: "95040", col2: "REL 60V DC SLIM TIP 6A/250VAC", col3: "EUR", col4: "10,58", col5: "", col6: "KLEMSAN", col7: "", col8: "", col9: "Ad", col10: "01-A Grubu", col11: "", col12: "10", col13: "", col14: "10", col15: "", col16: "20", col17: "", col18: "", col19: "" },
        { col1: "95041", col2: "REL 24V DC SLIM TIP 6A/250VAC", col3: "EUR", col4: "10,58", col5: "", col6: "KLEMSAN", col7: "", col8: "", col9: "Ad", col10: "01-A Grubu", col11: "", col12: "10", col13: "", col14: "10", col15: "", col16: "20", col17: "", col18: "", col19: "Pazarlama stratejisi oluşturdu." },
      ];
      */