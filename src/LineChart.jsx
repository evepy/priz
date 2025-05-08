import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const getInitialMonth = () => {
  const now = new Date();
  if (now.getFullYear() === 2025) {
    return now.getMonth();
  }
  return 0; // Si no es 2025, mostrar enero
};

const LineChart = () => {
  const [currentMonth, setCurrentMonth] = useState(getInitialMonth());
  const [dolarData, setDolarData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDolarData = async () => {
    try {
      const response = await fetch(`https://mindicador.cl/api/dolar/2025`);
      const data = await response.json();
      if (data.serie) {
        setDolarData(data.serie);
      }
    } catch (error) {
      console.error('Error fetching dolar data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDolarData();
  }, []);

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => Math.max(prev - 1, 0));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => Math.min(prev + 1, getMaxMonth()));
  };

  const getMaxMonth = () => {
    const now = new Date();
    if (now.getFullYear() === 2025) {
      return now.getMonth();
    }
    return 11;
  };

  const isFirstMonth = currentMonth === 0;
  const isLastMonth = currentMonth === getMaxMonth();

  const getMonthData = () => {
    return dolarData.filter(item => {
      const itemDate = new Date(item.fecha);
      return itemDate.getMonth() === currentMonth && 
             itemDate.getFullYear() === 2025;
    }).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  };

  const monthData = getMonthData();
  const chartData = {
    labels: monthData.map(item => new Date(item.fecha).getDate()),
    datasets: [
      {
        label: 'Precio Dólar (CLP)',
        data: monthData.map(item => item.valor),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Precio del Dólar - ${meses[currentMonth]} 2025`
      }
    }
  };

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        {!isFirstMonth && (
          <IconButton onClick={handlePreviousMonth}>
            <ArrowBackIosNewIcon />
          </IconButton>
        )}
        <h2 style={{ margin: '0 20px' }}>
          {meses[currentMonth]} 2025
        </h2>
        {!isLastMonth && (
          <IconButton onClick={handleNextMonth}>
            <ArrowForwardIosIcon />
          </IconButton>
        )}
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart; 