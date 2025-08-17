import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Checkbox, styled, TextField, Button
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "20px",
    padding: theme.spacing(2),
    backgroundColor: "white",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
  },
  "& .MuiBackdrop-root": {
    backdropFilter: "blur(6px)",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
}));

export default function AddDataElementModal({
  open,
  onClose,
  onSave,
  loading,
  categoryData,
  selectedItems,      // Prop from parent
  setSelectedItems,   // Prop from parent
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Reset local state when the modal is closed
  useEffect(() => {
    if (!open) {
      setSelectedCategory(null);
      setSearchTerm("");
    }
  }, [open]);

  const handleCheckboxChange = (category, item) => {
    setSelectedItems((prev) => {
      const current = prev[category] || [];
      return {
        ...prev,
        [category]: current.includes(item)
          ? current.filter((i) => i !== item)
          : [...current, item],
      };
    });
  };

  const handleSelectAll = (category) => {
    const allSelected =
      selectedItems[category]?.length === categoryData[category].length;
    setSelectedItems((prev) => ({
      ...prev,
      [category]: allSelected ? [] : [...categoryData[category]],
    }));
  };

  const handleAdd = () => {
    // Just call onSave; the parent already has the updated state
    onSave();
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
        Add New Data Element
      </DialogTitle>

      <TextField
        fullWidth
        placeholder="Search..."
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 1, px: 2 }}
      />

      <DialogContent dividers sx={{ paddingTop: 2 }}>
        <div className="flex gap-4">
          <div className="w-1/2 flex flex-col gap-2">
            {Object.keys(categoryData).map((cat) => (
              <div
                key={cat}
                className={`p-4 rounded-md flex justify-between items-center cursor-pointer transition ${
                  selectedCategory === cat ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span>{cat}</span>
                <ArrowForwardIosIcon fontSize="small" />
              </div>
            ))}
          </div>

          <div className="w-1/2">
            {selectedCategory ? (
              <div>
                <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-50">
                  <Checkbox
                    checked={
                      categoryData[selectedCategory]?.length > 0 &&
                      selectedItems[selectedCategory]?.length === categoryData[selectedCategory].length
                    }
                    onChange={() => handleSelectAll(selectedCategory)}
                  />
                  Select All
                </div>

                {categoryData[selectedCategory]
                  .filter((item) =>
                    item.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item) => (
                    <label key={item} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50">
                      <Checkbox
                        checked={selectedItems[selectedCategory]?.includes(item) || false}
                        onChange={() => handleCheckboxChange(selectedCategory, item)}
                      />
                      {item}
                    </label>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500">Select a category to see items</p>
            )}
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ padding: "16px 24px" }}>
        <Button onClick={onClose} sx={{ textTransform: "none", color: "#6b7280" }}>
          Cancel
        </Button>
        <Button onClick={handleAdd} variant="contained" disabled={loading} sx={{ textTransform: "none", borderRadius: "8px", fontWeight: 600, px: 3 }}>
          {loading ? "Saving..." : "Add"}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}