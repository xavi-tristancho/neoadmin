import { Box, Grid, Paper, Stack, styled, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import CountUp from "react-countup";
import { Header } from "@neoco/neoco-backoffice";

import { postsData } from "./fixtures/postsData";

const months = postsData.viewsPerMonth.map((d) => d.month);
const views = postsData.viewsPerMonth.map((d) => d.views);

const chartData = {
  labels: months,
  datasets: [
    {
      label: "Views per month",
      data: views,
      backgroundColor: "#2575fc",
      borderColor: "#f6f3ff",
      borderWidth: 1,
    },
  ],
};

const headers: Header = {
  type: "Page",
  options: {
    name: "Dashboard",
    route: {
      path: "/dashboard",
      unAuth: false,
      auth: true,
      exact: true,
      component: () => {
        Chart.register(CategoryScale);

        return (
          <>
            <Stack direction="column" spacing={2} padding={4}>
              <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
                  <StyledPaper variant="outlined" elevation={3}>
                    <Typography variant="h2" fontWeight="bold">
                      <CountUp end={postsData.posts} duration={2} />
                    </Typography>
                    <Typography variant="h6">Total posts</Typography>
                  </StyledPaper>
                </Grid>
                <Grid item sm={12} md={6}>
                  <StyledPaper variant="outlined" elevation={3}>
                    <Typography variant="h2" fontWeight="bold">
                      <CountUp end={postsData.views} duration={3} />
                    </Typography>
                    <Typography variant="h6">Views in a year</Typography>
                  </StyledPaper>
                </Grid>
                <Grid item sm={12} md={2}></Grid>
              </Grid>
              <ChartContainer>
                <Typography variant="h6" fontWeight="bold" color="#002b74">
                  Posts views per month
                </Typography>
                <Bar
                  data={chartData}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </ChartContainer>
            </Stack>
          </>
        );
      },
    },
  },
};

export default headers;

const StyledPaper = styled(Paper)({
  background: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  borderRadius: "16px",
});

const ChartContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  background: "#cce5ff",
  padding: theme.spacing(4),
  borderRadius: "16px",
  margin: "16px 0",
}));
