/* eslint-disable react/display-name */
import { useRef, forwardRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(zoomPlugin);
Chart.register(...registerables);

const LineChart = forwardRef(({ transactions }, ref) => {
  const canvasRef = useRef(null);

  const processChartData = (transactions) => {
    const cumulativeData = [];
    const dateMap = new Map();
    let currentBalance = 0;

    const sortedTransactions = transactions.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    sortedTransactions.forEach((transaction) => {
      const { date, amount } = transaction;
      const transactionDate = new Date(date).getTime();

      if (dateMap.has(transactionDate)) {
        dateMap.set(
          transactionDate,
          dateMap.get(transactionDate) + parseFloat(amount)
        );
      } else {
        dateMap.set(transactionDate, parseFloat(amount));
      }
    });

    dateMap.forEach((amount, date) => {
      currentBalance += amount;
      cumulativeData.push({ x: new Date(date), y: currentBalance });
    });

    const up = (ctx, value) =>
      ctx.p0.parsed.y < ctx.p1.parsed.y ? value : undefined;
    const down = (ctx, value) =>
      ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

    return {
      datasets: [
        {
          label: "Account Balance",
          data: cumulativeData,
          borderColor: "white",

          segment: {
            borderColor: (ctx) =>
              up(ctx, "rgba(100 210 80 / 100%)") ||
              down(ctx, "rgba(240 50 50 / 100%)"),
          },
        },
      ],
    };
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const chartInstance = new Chart(ctx, {
      type: "line",
      data: processChartData(transactions),
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              title: function (context) {
                const date = context[0].label.split(",");
                return `${date[0]} ${date[1]}`;
              },
              label: function (context) {
                return `Stan konta: ${context.formattedValue} zł`;
              },
            },
          },
          zoom: {
            pan: {
              enabled: true,
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: "xy",
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
            },
            title: {
              display: true,
              text: "Data",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Stan konta",
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
      },
    });

    ref.current = chartInstance;

    return () => {
      chartInstance.destroy();
    };
  }, [ref, transactions]);

  return <canvas ref={canvasRef}></canvas>;
});

export default LineChart;
