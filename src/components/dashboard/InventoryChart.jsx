// src/components/dashboard/InventoryChart.jsx
'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const chartOptions = {
  chart: {
    type: 'bar',
    toolbar: { show: false },
    fontFamily: 'Inter, sans-serif'
  },
  colors: ['green'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: '55%'
    }
  },
  dataLabels: { enabled: false },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Paracetamol', 'Amoxicillin', 'Vitamin C', 'Ibuprofen', 'Cetirizine'],
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: { title: { text: 'Quantity' } },
  fill: { opacity: 1 },
  tooltip: {
    y: { formatter: (val) => `${val} units` }
  },
  grid: { show: false }
};

const chartSeries = [{
  name: 'Current Stock',
  data: [120, 85, 65, 45, 30]
}];

const Chart = dynamic(
  () => import('react-apexcharts'),
  { 
    ssr: false,
    loading: () => <div className="h-80 flex items-center justify-center">Loading chart...</div>
  }
);

export default function InventoryChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-80">
      {mounted && (
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height="100%"
          width="100%"
        />
      )}
    </div>
  );
}