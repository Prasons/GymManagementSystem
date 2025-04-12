import AdminLayout from "@layouts/AdminLayout";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const members = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gym.com",
    phone: "555-0101",
    joinDate: "2023-01-15",
    membership: "Premium",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@gym.com",
    phone: "555-0102",
    joinDate: "2023-02-20",
    membership: "Basic",
    status: "active",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@gym.com",
    phone: "555-0103",
    joinDate: "2023-03-10",
    membership: "Student",
    status: "inactive",
  },
];

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 180 },
  { field: "email", headerName: "Email", width: 220 },
  { field: "phone", headerName: "Phone", width: 130 },
  { field: "joinDate", headerName: "Join Date", width: 120 },
  { field: "membership", headerName: "Plan", width: 120 },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === "active" ? "success" : "error"}
        size="small"
      />
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    renderCell: () => (
      <Button size="small" variant="outlined">
        Edit
      </Button>
    ),
  },
];

export default function Members() {
  return (
    <AdminLayout title="Member Management">
      <div style={{ marginBottom: 16 }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>
          Add Member
        </Button>
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={members}
          columns={columns}
          pageSize={10}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection
        />
      </div>
    </AdminLayout>
  );
}
