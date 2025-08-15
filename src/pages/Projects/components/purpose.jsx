import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Button, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions,
  Checkbox, styled, TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Delete } from "@mui/icons-material";
import { getPurposeData, savePurposeData } from "@/services/elements";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Custom styled Dialog
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

const Purpose = () => {
  const projectId = "hellow";
  const token = localStorage.getItem("token");

  const [dataElements, setDataElements] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Static category data
  const categoryData = {
    "Account Login Credentials": ["Username", "Password", "Security Question", "OTP"],
    "Additional": ["Notes", "Tags", "Reference ID"],
    "AI Use Case Forms": ["Input Data", "Training Dataset", "Output Samples"],
    "Alternative Data": ["Social Media", "Web Scraped Data", "External API Data"],
    "Assets": ["Images", "Videos", "Documents", "Source Code"],
    "Audience": ["Customers", "Employees", "Partners", "Vendors"],
  };

  // Fetch purpose data on mount
  useEffect(() => {
    (async () => {
        try {
        const data = await getPurposeData(projectId, token);

        let elementsArray = [];

        if (Array.isArray(data)) {
            elementsArray = data;
        } else if (data) {
            elementsArray = [data]; // Wrap single object into array
        }

        setDataElements(
            elementsArray.map((el) => ({
            id: el.elementId || el.id || `INV${Math.floor(Math.random() * 900 + 100)}`,
            category: el.category,
            elementName: el.elementName
            }))
        );
        } catch (error) {
        console.error("Failed to load purpose data:", error);
        }
    })();
    }, [projectId, token]);


  // Modal control
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setSelectedCategory(null);
    setSelectedItems({});
    setSearchTerm("");
    setOpenModal(false);
  };

  // Checkbox handling
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

  // Select all
  const handleSelectAll = (category) => {
    const allSelected =
      selectedItems[category]?.length === categoryData[category].length;
    setSelectedItems((prev) => ({
      ...prev,
      [category]: allSelected ? [] : [...categoryData[category]],
    }));
  };

  // Add & save each item individually
  const handleAdd = async () => {
    const newElements = Object.entries(selectedItems).flatMap(([category, items]) =>
      items.map((elementName) => ({
        id: `INV${Math.floor(Math.random() * 900 + 100)}`,
        category,
        elementName
      }))
    );

    // Update UI state
    setDataElements((prev) => [...prev, ...newElements]);

    // Save each item individually to backend
    try {
      for (const { category, elementName } of newElements) {
        await savePurposeData(projectId, category, elementName, token);
      }
      console.log("All purpose data saved successfully");
    } catch (error) {
      console.error("Failed to save some purpose data:", error);
    }

    handleClose();
  };

  const handleDelete = (id) => {
    setDataElements((prev) => prev.filter((item) => item.id !== id));
    // Optional: make API call here to remove it from backend
  };

  return (
    <div className="flex p-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col border rounded-2xl p-6 w-full shadow-md bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Data Elements</h1>
            <p className="text-gray-500 text-sm">
              Add additional data elements that you would like to associate with the business process.
            </p>
          </div>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{
              backgroundColor: "#2563eb",
              textTransform: "none",
              px: 2.5,
              borderRadius: "8px",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#1e4fd1" },
            }}
          >
            New Data Element
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">E-ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Element Name</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataElements.length > 0 ? (
                dataElements.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.elementName}</TableCell>
                    <TableCell className="text-right">
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          sx={{
                            color: "#dc2626",
                            "&:hover": { backgroundColor: "#fee2e2" },
                          }}
                          onClick={() => handleDelete(item.id)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                    No data elements found. Click "New Data Element" to add one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal */}
      <StyledDialog open={openModal} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
          Add New Data Element
        </DialogTitle>

        {/* Search bar */}
        <TextField
          fullWidth
          placeholder="Search..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 1 }}
        />

        <DialogContent dividers sx={{ paddingTop: 2 }}>
          <div className="flex gap-4">
            {/* Left: Categories */}
            <div className="w-1/2 flex flex-col gap-2">
              {Object.keys(categoryData).map((cat) => (
                <div
                  key={cat}
                  className={`p-4 rounded-md flex justify-between items-center cursor-pointer transition ${
                    selectedCategory === cat
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <span>{cat}</span>
                  <ArrowForwardIosIcon fontSize="small" />
                </div>
              ))}
            </div>

            {/* Right: Subcategories */}
            <div className="w-1/2">
              {selectedCategory ? (
                <div>
                  {/* Select All */}
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

                  {/* Filtered subcategories */}
                  {categoryData[selectedCategory]
                    .filter((item) =>
                      item.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((item) => (
                      <label
                        key={item}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-50"
                      >
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
          <Button onClick={handleClose} sx={{ textTransform: "none", color: "#6b7280" }}>
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            variant="contained"
            sx={{
              backgroundColor: "#2563eb",
              textTransform: "none",
              borderRadius: "8px",
              fontWeight: 600,
              px: 3,
              "&:hover": { backgroundColor: "#1e4fd1" },
            }}
          >
            Add
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

export default Purpose;
