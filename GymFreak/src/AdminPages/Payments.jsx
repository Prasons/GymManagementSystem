import AdminLayout from "@layouts/AdminLayout";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "member", headerName: "Member", width: 200 },
  { field: "amount", headerName: "Amount", width: 120 },
  { field: "date", headerName: "Date", width: 150 },
  { field: "status", headerName: "Status", width: 150 },
];

const rows = [
  {
    id: 1,
    member: "John Doe",
    amount: "$99.00",
    date: "2023-05-01",
    status: "Paid",
  },
  {
    id: 2,
    member: "Jane Smith",
    amount: "$79.00",
    date: "2023-05-15",
    status: "Paid",
  },
];

export default function Payments() {
  return (
    <AdminLayout title="Payment Records">
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
        />
      </div>
    </AdminLayout>
  );
}
