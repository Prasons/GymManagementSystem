import AdminLayout from "@layouts/AdminLayout";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Settings() {
  return (
    <AdminLayout title="System Settings">
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <SettingsIcon sx={{ mr: 1 }} /> Gym Information
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Gym Name"
            defaultValue="GymFreak"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Business Hours"
            defaultValue="6:00 AM - 10:00 PM"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contact Email"
            defaultValue="contact@gymfreak.com"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            defaultValue="(555) 123-4567"
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary">
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            System Configuration
          </Typography>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Enable online payments"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Send email notifications"
          />
          <FormControlLabel control={<Switch />} label="Maintenance mode" />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary">
              Update Settings
            </Button>
          </Box>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
