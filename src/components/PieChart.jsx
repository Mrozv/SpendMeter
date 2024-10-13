import { useRef, useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function PieChart({ transactions, categories }) {
  const [categoriesObject, setCategories] = useState(
    Object.fromEntries(categories.map((item) => [item, 0]))
  );

  useEffect(() => {
    const updatedCategories = { ...categoriesObject };

    transactions.forEach((transaction) => {
      if (
        Object.prototype.hasOwnProperty.call(
          updatedCategories,
          transaction.category
        )
      ) {
        const amount = parseFloat(transaction.amount);
        updatedCategories[transaction.category] += Math.abs(amount);
      }
    });

    const filteredCategories = Object.fromEntries(
      Object.entries(updatedCategories).filter(([_, value]) => value !== 0)
    );

    setCategories(filteredCategories);
  }, [transactions]);

  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const chartInstance = new Chart(ctx, {
      type: "pie",
      data: {
        labels: Object.keys(categoriesObject),
        datasets: [
          {
            data: Object.values(categoriesObject),
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {},
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [categoriesObject]);

  return <canvas ref={canvasRef}></canvas>;
}
