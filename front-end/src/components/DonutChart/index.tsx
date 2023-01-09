import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Employee } from '../../types/Employee.d';

interface DonutChartProps {
  employees: Employee[] | [];
}

function DonutChart({ employees }: DonutChartProps) {
  const [series, setSeries] = useState<number[]>(
    employees.map(tempEmployee => tempEmployee.participation),
  );
  const [labels, setLabels] = useState<string[]>();
  const options: ApexOptions = {
    series,
    labels,
    chart: {
      type: 'donut',
    },
    legend: {
      show: true,
      position: 'right',
      fontSize: '13px',
      markers: {
        width: 25,
        height: 25,
        radius: 5,
        offsetY: 8,
        offsetX: -8,
      },
      labels: {
        useSeriesColors: true,
      },
      offsetY: -19,
      itemMargin: {
        vertical: 10,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
          size: '52%',
        },
      },
    },
  };

  useEffect(() => {
    const newSeries = employees.map(tempEmployee => tempEmployee.participation);
    setSeries(newSeries);

    const newLabels = employees.map(
      tempEmployee => `${tempEmployee.firstName} ${tempEmployee.lastName}`,
    );
    setLabels(newLabels);
  }, [employees]);

  return <ReactApexChart options={options} series={series} type='donut' />;
}

export default DonutChart;
