"use client"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export function TemperatureChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.time || item.date),
    datasets: [
      {
        label: "Suhu (°C)",
        data: data.map((item) => item.temp),
        borderColor: "rgb(14, 116, 144)",
        backgroundColor: "rgba(14, 116, 144, 0.5)",
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Suhu: ${context.parsed.y}°C`,
        },
      },
    },
    scales: {
      y: {
        min: -25,
        max: 5,
        ticks: {
          callback: (value) => value + "°C",
        },
        title: {
          display: true,
          text: "Suhu (°C)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Tahap",
        },
      },
    },
  }

  return <Line data={chartData} options={options} />
}

// Add default export
export default TemperatureChart
