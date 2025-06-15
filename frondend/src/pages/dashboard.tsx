import { Box } from "@mui/material";
import Navbar from "../layout/navbar";
import { BarChart } from "@mui/x-charts/BarChart";

export default function Dashboard() {
  function addLabels(arg0: { dataKey: string; stack: string }[]) {
    throw new Error("Function not implemented.");
  }

  return (
    <Box>
      <Navbar role="admin" />
      <Box sx={{ m: "auto", width: "80%",pt:20,bgcolor:'gray',borderRadius:'20px' }}>
        <BarChart
          xAxis={[
            { scaleType: "band", data: ["group A", "group B", "group C"] },
          ]}
          series={[
            { data: [4, 3, 5] },
            { data: [1, 6, 3] },
            { data: [2, 5, 6] },
          ]}
          width={700}
          height={600}
        />
      </Box>
    </Box>
  );
}
