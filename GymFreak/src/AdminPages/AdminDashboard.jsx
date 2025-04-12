import AdminLayout from "@layouts/AdminLayout";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { BarChart, Timeline } from "@mui/icons-material";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Members",
      value: "1,284",
      change: "+12%",
      icon: <PeopleIcon fontSize="large" />,
    },
    {
      title: "Active Workouts",
      value: "86",
      change: "+5%",
      icon: <FitnessCenterIcon fontSize="large" />,
    },
    {
      title: "Revenue",
      value: "$24,560",
      change: "+18%",
      icon: <PaymentIcon fontSize="large" />,
    },
    {
      title: "New Signups",
      value: "34",
      change: "+7%",
      icon: <Timeline fontSize="large" />,
    },
  ];

  return (
    <AdminLayout title="Dashboard Overview">
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: "100%", boxShadow: 3 }}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    bgcolor: "#E8F5E9",
                    p: 2,
                    mr: 3,
                    borderRadius: "50%",
                    color: "#2E7D32",
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h6" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    {stat.change} this month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Charts Section */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2, height: "400px", boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              Membership Growth
            </Typography>
            {/* Placeholder for chart */}
            <Box
              sx={{
                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f5f5f5",
                borderRadius: 2,
              }}
            >
              <BarChart sx={{ fontSize: 100, color: "#2E7D32" }} />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, height: "400px", boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            {/* Activity list would go here */}
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
