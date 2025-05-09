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
import { IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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
  const [view, setView] = useState('grafica');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        
        data: monthData.map(item => item.valor),
        borderColor: '#ff7a00',
        backgroundColor: 'rgba(255,179,102,0.2)',
        pointBackgroundColor: '#ff7a00',
        pointBorderColor: '#fff',
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      
      
      tooltip: {
        backgroundColor: '#fff7f0',
        titleColor: '#ff7a00',
        bodyColor: '#b85c00',
        borderColor: '#ffb366',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: { color: '#b85c00', font: { weight: 'bold' } },
        grid: { color: 'rgba(255,179,102,0.15)' }
      },
      y: {
        ticks: { color: '#b85c00', font: { weight: 'bold' } },
        grid: { color: 'rgba(255,179,102,0.10)' }
      }
    }
  };

  // Selector de mes reutilizable
  const MonthSelector = () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
      marginTop: 8,
      width: '100%',
    }}>
      {!isFirstMonth && (
        <IconButton onClick={handlePreviousMonth} sx={{ color: '#ff7a00', fontSize: 32 }}>
          <ArrowBackIosNewIcon sx={{ fontSize: 32 }} />
        </IconButton>
      )}
      <span style={{
        margin: '0 20px',
        color: '#ff7a00',
        fontWeight: 600,
        letterSpacing: 1,
        textAlign: 'center',
        fontSize: 36,
        fontFamily: 'serif',
      }}>
        {meses[currentMonth]} 2025
      </span>
      {!isLastMonth && (
        <IconButton onClick={handleNextMonth} sx={{ color: '#ff7a00', fontSize: 32 }}>
          <ArrowForwardIosIcon sx={{ fontSize: 32 }} />
        </IconButton>
      )}
    </div>
  );

  // Tarjetas para la vista 'tarjetas'
  const CardGrid = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 24,
      justifyContent: 'center',
      alignItems: 'stretch',
      marginTop: 8,
      marginBottom: 32,
      maxWidth: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      {monthData.map(item => (
        <div key={item.fecha} style={{
          background: '#fff7f0',
          borderRadius: 12,
          boxShadow: '0 2px 8px #ffb36622',
          padding: 20,
          minWidth: 0,
          maxWidth: 220,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{ color: '#ff7a00', fontWeight: 700, fontSize: 22, marginBottom: 8 }}>
            ${item.valor.toLocaleString('es-CL', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ color: '#b85c00', fontSize: 15, fontWeight: 500 }}>
            {new Date(item.fecha).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: '2-digit' })}
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return <div style={{ color: '#ff7a00', textAlign: 'center', padding: 32 }}>Cargando datos...</div>;
  }

  return (
    <div
      style={{
        width: '100%',
        background: 'transparent',
        borderRadius: 16,
        boxShadow: '0 2px 8px #ffb36622',
        padding: isMobile ? 8 : 16,
        maxWidth: isMobile ? '100vw' : 700,
        margin: '0 auto',
        overflowX: 'auto',
        minWidth: 0,
      }}
    >
      {/* Dropdown de vista arriba y centrado */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
        <FormControl size="small" sx={{ minWidth: 140, background: '#fff7f0', borderRadius: 2, boxShadow: '0 1px 4px #ffb36622' }}>
          <Select
            value={view}
            onChange={e => setView(e.target.value)}
            displayEmpty
            sx={{ color: '#ff7a00', fontWeight: 700, fontSize: 16, '.MuiSelect-icon': { color: '#ff7a00' } }}
            inputProps={{ 'aria-label': 'Vista' }}
          >
            <MenuItem value="grafica">Gráfica</MenuItem>
            <MenuItem value="tarjetas">Tarjetas</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, position: 'relative' }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h1 style={{ color: '#ff7a00', fontWeight: 900, fontSize: 28, margin: 0, letterSpacing: 1 }}>Precio del dólar</h1>
        </div>
      </div>
      <MonthSelector />
      {view === 'grafica' ? (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflowX: 'auto' }}>
          <div style={{ width: '100%', minWidth: 0 }}>
            <Line data={chartData} options={options} />
          </div>
        </div>
      ) : <CardGrid />}
    </div>
  );
};

export default LineChart; 