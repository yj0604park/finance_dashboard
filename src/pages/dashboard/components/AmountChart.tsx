import { useGetAmountSnapshotQuery } from '../../../generated/graphql';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { subMonths } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Scale,
  CoreScaleOptions,
  Filler,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { ko } from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: '자산 변동 추이',
      font: {
        size: 14,
        weight: 'bold' as const
      }
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const value = context.raw.y;
          if (context.dataset.yAxisID === 'y') {
            return `KRW: ${(value / 10000).toLocaleString()}만원`;
          }
          return `USD: $${value.toLocaleString()}`;
        }
      }
    }
  },
  scales: {
    x: {
      type: 'time' as const,
      time: {
        unit: 'month' as const
      },
      adapters: {
        date: {
          locale: ko
        }
      }
    },
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      title: {
        display: true,
        text: 'KRW (만원)',
      },
      ticks: {
        callback(this: Scale<CoreScaleOptions>, tickValue: number | string) {
          const value = Number(tickValue);
          return `${(value / 10000).toLocaleString()}만`;
        }
      }
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      title: {
        display: true,
        text: 'USD',
      },
      ticks: {
        callback(this: Scale<CoreScaleOptions>, tickValue: number | string) {
          const value = Number(tickValue);
          return `$${value.toLocaleString()}`;
        }
      },
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export const AmountChart = () => {
  const startDate = subMonths(new Date(), 12);
  const { data, loading, error } = useGetAmountSnapshotQuery({
    variables: {
      startDate: startDate.toISOString().split('T')[0],
    },
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        에러가 발생했습니다: {error.message}
      </Typography>
    );
  }

  const krwData = data?.krwSnapshot?.edges.map(edge => ({
    x: new Date(edge.node.date),
    y: Number(edge.node.amount)
  })) || [];

  const usdData = data?.usdSnapshot?.edges.map(edge => ({
    x: new Date(edge.node.date),
    y: Number(edge.node.amount)
  })) || [];

  const chartData = {
    datasets: [
      {
        label: 'KRW',
        data: krwData,
        borderColor: 'rgb(75, 192, 192)',
        yAxisID: 'y',
        tension: 0.2
      },
      {
        label: 'USD',
        data: usdData,
        borderColor: 'rgb(255, 99, 132)',
        yAxisID: 'y1',
        tension: 0.2
      }
    ]
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ width: '100%', height: 400 }}>
          <Line data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
}; 