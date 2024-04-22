'use client'

import {useEffect, useRef} from "react";
import {Chart} from "chart.js/auto";

export default function LineChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      // Extract labels and data from the prop
      const labels = data.map(item => item.year);
      const chartData = data.map(item => item.us_average);

      chartRef.current.chart = new Chart(context, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Info",
              data: chartData,
              backgroundColor: ["rgb(255, 99, 132, 0.2)"],
              borderColor: ["rgb(255, 99, 132)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "linear",
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data]); // Add data as a dependency to the useEffect hook

  return (
      <div style={{ position: "relative", width: "90vw", height: "80vh" }}>
        <canvas ref={chartRef} />
      </div>
  );
}