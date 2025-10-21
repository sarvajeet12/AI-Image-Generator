import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function UsageChart({ items = [] }) {
  // Prepare data: count items per day for last 7 days
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const labels = days.map((d) => d.toLocaleDateString());

  const counts = days.map((d) => {
    const dayStart = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate()
    ).getTime();
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;
    return items.filter((it) => {
      const t = new Date(it.createdAt).getTime();
      return t >= dayStart && t < dayEnd;
    }).length;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Generations",
        data: counts,
        borderColor: "#7c3aed",
        backgroundColor: "rgba(124,58,237,0.15)",
        fill: true,
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { ticks: { stepSize: 1 }, beginAtZero: true },
    },
  };

  return (
    <div className="h-40">
      <Line data={data} options={options} />
    </div>
  );
}
