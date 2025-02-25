import React, { useState, useEffect } from "react";
import {
  getProducts,
  searchProducts,
  addProduct,
  deleteProduct,
  updateProduct
} from "../api/api";
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
  Typography,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import "./TableEditor.css";

const TableEditor = ({ isSidebarOpen }) => {
  const columnNames = [
    "Ürün_kodu", "İsim", "DVZ", "Birim_fiyat", "İSK", "Marka", "TESLİM", "MİKTAR",
    "Birim", "TEMİN", "Kutu_Miktarı", "Etiketler", "KDV", "Stok", "Ana_kategori",
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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false); // Yeni ürün ekleme için modal

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProducts(pageNumber, 50);
        setTableData(data.products);
        setFilteredData(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Ürünler alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageNumber]);

  const handleSearch = async (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    try {
      if (query === "") {
        const data = await getProducts(pageNumber, 50);
        setTableData(data.products);
        setFilteredData(data.products);
        setTotalPages(data.totalPages);
      } else {
        const searchResults = await searchProducts(query);
        console.log("Arama Sonuçları:", searchResults);
        setFilteredData(searchResults);
        setTotalPages(Math.ceil(searchResults.length / 50));
      }
    } catch (error) {
      console.error("Arama hatası:", error);
    }

    setPageNumber(1);
  };

  const handleAddRow = async () => {
    if (!newRow.Ürün_kodu || !newRow.İsim || !newRow.Birim_fiyat) {
      alert("Ürün Kodu, İsim ve Birim Fiyat alanları zorunludur!");
      return;
    }

    try {
      await addProduct(newRow);
      setPageNumber(1);
      const data = await getProducts(1, 50);
      setTableData(data.products);
      setFilteredData(data.products);
      setNewRow({});
      setOpenAddModal(false);
      alert("Ürün başarıyla eklendi!");
    } catch (error) {
      console.error("Yeni ürün eklenemedi:", error);
    }
  };

  const handleEditRow = (row) => {
    setEditingRow(row);
    setOpenModal(true);
  };

  const handleUpdateRow = async () => {
    if (!editingRow) return;

    try {
      await updateProduct(editingRow.urunid, editingRow);
      setPageNumber(1);
      const data = await getProducts(1, 50);
      setTableData(data.products);
      setFilteredData(data.products);
      setOpenModal(false);
    } catch (error) {
      console.error("Ürün güncellenemedi:", error);
    }
  };

  const handleDeleteRow = async () => {
    if (!rowToDelete) return;

    try {
      await deleteProduct(rowToDelete.urunid);
      const updatedData = tableData.filter((row) => row.urunid !== rowToDelete.urunid);
      setTableData(updatedData);
      setFilteredData(updatedData);
      setOpenDeleteDialog(false);
      alert("Ürün başarıyla silindi!");
    } catch (error) {
      console.error("Ürün silinemedi:", error);
      alert("Ürün silinemedi!");
    }
  };

  return (
    <div className={`table-container ${isSidebarOpen ? "open" : "closed"}`}>
      <h1>Tablo Düzenlemeleri</h1>
  
      <TextField 
        label="Ara..." 
        variant="outlined" 
        size="small" 
        value={searchQuery} 
        onChange={handleSearch} 
        style={{ marginBottom: "20px", width: "100%" }} 
      />
  
      <Button 
        variant="contained" 
        color="success" 
        onClick={() => setOpenAddModal(true)} 
        style={{ marginBottom: "10px" }}
      >
        Ürün Ekle
      </Button>
  
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columnNames.map((colName, index) => (
                <TableCell key={index}>{colName}</TableCell>
              ))}
              <TableCell>Aksiyon</TableCell> {/* Düzenleme ve Silme butonları için ayrı sütun */}
            </TableRow>
          </TableHead>
          <TableBody>
  {filteredData.map((row, index) => (
    <TableRow key={index}>
      {columnNames.map((colName, colIndex) => {
        // Büyük/küçük harf farklarını düzeltelim
        const key = Object.keys(row).find(
          (k) => k.toLowerCase() === colName.toLowerCase()
        );

        return (
          <TableCell key={colIndex}>
            {key ? row[key] ?? "-" : "-"} 
          </TableCell>
        );
      })}
      <TableCell>
        <div className="button-container">
          {/* Düzenleme Butonu */}
          <Button
            className="edit-button"
            variant="contained"
            color="warning"
            onClick={() => handleEditRow(row)}
            style={{ marginRight: "5px" }}
          >
            Düzenle
          </Button>

          {/* Silme Butonu */}
          <Button
            className="delete-button"
            variant="contained"
            color="error"
            onClick={() => {
              setRowToDelete(row);
              setOpenDeleteDialog(true);
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
  
      {/* Ürün Güncelleme Modalı */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="modal-content">
          <Typography variant="h6">Ürün Düzenle</Typography>
          {columnNames.map((colName, index) => (
            <TextField 
              key={index} 
              label={colName} 
              value={editingRow?.[colName] || ""} 
              onChange={(e) => setEditingRow({ ...editingRow, [colName]: e.target.value })} 
            />
          ))}
          <Button variant="contained" color="primary" onClick={handleUpdateRow}>Güncelle</Button>
        </div>
      </Modal>
  
      {/* Ürün Ekleme Modalı */}
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <div className="modal-content">
          <Typography variant="h6">Yeni Ürün Ekle</Typography>
          {columnNames.map((colName, index) => (
            <TextField 
              key={index} 
              label={colName} 
              value={newRow[colName] || ""} 
              onChange={(e) => setNewRow({ ...newRow, [colName]: e.target.value })} 
            />
          ))}
          <Button variant="contained" color="success" onClick={handleAddRow}>Ekle</Button>
        </div>
      </Modal>
  
      {/* Ürün Silme Onay Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Ürünü Sil</DialogTitle>
        <DialogContent>
          <Typography>
            <strong>{rowToDelete?.İsim}</strong> adlı ürünü silmek istediğinizden emin misiniz?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">Hayır</Button>
          <Button 
            onClick={async () => {
              if (!rowToDelete) return;
              try {
                await deleteProduct(rowToDelete.urunid);
                setTableData(tableData.filter(item => item.urunid !== rowToDelete.urunid));
                setFilteredData(filteredData.filter(item => item.urunid !== rowToDelete.urunid));
                setOpenDeleteDialog(false);
                alert("Ürün başarıyla silindi!");
              } catch (error) {
                console.error("Ürün silinemedi:", error);
                alert("Ürün silinemedi!");
              }
            }} 
            color="error"
          >
            Evet
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  
};

export default TableEditor;