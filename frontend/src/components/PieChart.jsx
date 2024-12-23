import { useRef, useEffect, useMemo } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function PieChart({ transactions, categories, blocksStyles }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const categoriesObject = useMemo(() => {
    const initialCategories = Object.fromEntries(
      categories.map((item) => [item, 0])
    );

    transactions.forEach(({ category, amount }) => {
      if (Object.prototype.hasOwnProperty.call(initialCategories, category)) {
        initialCategories[category] += Math.abs(parseFloat(amount));
      }
    });

    return Object.fromEntries(
      Object.entries(initialCategories).filter(([_, value]) => value !== 0)
    );
  }, [transactions, categories]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    const chartInstance = new Chart(ctx, {
      type: "pie",
      data: {
        labels: Object.keys(categoriesObject),
        datasets: [
          {
            data: Object.values(categoriesObject),
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });

    chartRef.current = chartInstance;

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [categoriesObject]);

  return (
    <div className={`${blocksStyles} max-md:col-span-4`}>
      <span>Wydatki według kategorii</span>
      <div className="h-[calc(100%-24px)] flex justify-center items-center">
        {transactions.length > 0 ? (
          <canvas ref={canvasRef}></canvas>
        ) : (
          <div>Brak transakcji...</div>
        )}
      </div>
    </div>
  );
}
