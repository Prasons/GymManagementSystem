import { Card, CardContent, Typography, Grid } from "@mui/material";
import AdminLayout from "@layouts/AdminLayout";
const workoutPlans = [
  { id: 1, name: "Beginner Program", duration: "8 weeks", difficulty: "Easy" },
  {
    id: 2,
    name: "Strength Builder",
    duration: "12 weeks",
    difficulty: "Medium",
  },
  {
    id: 3,
    name: "Advanced Bodybuilding",
    duration: "16 weeks",
    difficulty: "Hard",
  },
];

export default function Workouts() {
  return (
    <AdminLayout title="Workout Programs">
      <Grid container spacing={3}>
        {workoutPlans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card sx={{ height: "100%", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {plan.name}
                </Typography>
                <Typography>Duration: {plan.duration}</Typography>
                <Typography>Difficulty: {plan.difficulty}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </AdminLayout>
  );
}
