import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import "./TableEditor.css"; // Stil dosyası

const TableEditor = ({ isSidebarOpen }) => {
  // 19 sütun ismini buradan ayarlayabilirsiniz
  const columnNames = [
    "Ürün Kodu", "İsim", "DVZ", "Birim Fiyat", "İSK", "Marka", "Teslim", "Miktar", "Birim", 
    "Temin", "Birim Maliyet", "Kutu Miktarı", "Etiketler", "KDV", "Stok", "Ana kategori", 
    "Stok kullanır", "Kritik stok miktarı", "Açıklama"
  ];

  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newRow, setNewRow] = useState({}); // Yeni kayıt için state
  const [editingRow, setEditingRow] = useState(null); // Düzenlenen satırın ID'si

  useEffect(() => {
    // 19 sütunlu örnek veri
    const fetchData = async () => {
      const data = [
        { col1: "95040", col2: "REL 60V DC SLIM TIP 6A/250VAC", col3: "EUR", col4: "10,58", col5: "", col6: "KLEMSAN", col7: "", col8: "", col9: "Ad", col10: "01-A Grubu", col11: "", col12: "10", col13: "", col14: "10", col15: "", col16: "20", col17: "", col18: "", col19: "" },
        { col1: "95041", col2: "REL 24V DC SLIM TIP 6A/250VAC", col3: "EUR", col4: "10,58", col5: "", col6: "KLEMSAN", col7: "", col8: "", col9: "Ad", col10: "01-A Grubu", col11: "", col12: "10", col13: "", col14: "10", col15: "", col16: "20", col17: "", col18: "", col19: "Pazarlama stratejisi oluşturdu." },
      ];
      setTableData(data);
      setFilteredData(data);
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
  const handleAddRow = () => {
    if (!newRow.col1) return; // Boş eklemeyi engelle
    const newData = [...tableData, { ...newRow }];
    setTableData(newData);
    setFilteredData(newData);
    setNewRow({});
  };

  // Satır düzenleme
  const handleEditRow = (id) => {
    setEditingRow(id);
    const rowToEdit = tableData.find((row) => row.id === id);
    setNewRow(rowToEdit); // Düzenlenecek satırın mevcut verilerini getir
  };

  const handleSaveRow = (id) => {
    const updatedData = tableData.map((row) =>
      row.id === id ? { ...row, ...newRow } : row
    );
    setTableData(updatedData);
    setFilteredData(updatedData);
    setEditingRow(null);
    setNewRow({});
  };

  // Satır silme
  const handleDeleteRow = (id) => {
    const updatedData = tableData.filter((row) => row.id !== id);
    setTableData(updatedData);
    setFilteredData(updatedData);
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
                  <TableCell key={i}>
                    {editingRow === index ? (
                      <TextField
                        variant="outlined"
                        size="small"
                        value={newRow[`col${i + 1}`] || ""}
                        onChange={(e) => setNewRow({ ...newRow, [`col${i + 1}`]: e.target.value })}
                        multiline
                        minRows={1}
                        maxRows={4}
                        style={{
                          width: "100%",
                          resize: "both",
                          overflow: "auto",
                        }}
                      />
                    ) : (
                      row[`col${i + 1}`]
                    )}
                  </TableCell>
                ))}
                <TableCell>
  <div style={{ display: "flex", gap: "5px" }}>
    {editingRow === row.id ? (
      <Button variant="contained" color="success" onClick={() => handleSaveRow(row.id)}>
        Kaydet
      </Button>
    ) : (
      <Button variant="contained" color="warning" onClick={() => handleEditRow(row.id)}>
        Düzenle
      </Button>
    )}
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

            {/* Yeni Kayıt Eklemek İçin Alan */}
            <TableRow>
  {Array.from({ length: 19 }, (_, i) => (
    <TableCell key={i}>
      <TextField
        variant="outlined"
        size="small"
        value={newRow[`col${i + 1}`] || ""}
        onChange={(e) => setNewRow({ ...newRow, [`col${i + 1}`]: e.target.value })}
        multiline
        minRows={1}
        maxRows={4} // Kullanıcı 4 satıra kadar yazabilir
        style={{
          width: "100%",
          resize: "both", // Boyutlandırılabilir
          overflow: "auto",
        }}
      />
    </TableCell>
  ))}
  <TableCell>
    <Button variant="contained" color="primary" onClick={handleAddRow}>
      Ekle
    </Button>
  </TableCell>
</TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableEditor;
