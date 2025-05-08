import React, { useState } from "react";
import LineChart from "./LineChart";
import TradeBox from "./TradeBox";
import { Box, useMediaQuery, Typography, Paper, Avatar } from '@mui/material';

const InfoSection = () => (
  <Paper sx={{ p: 3, background: '#23242b', color: '#fff', mb: 2, height: '100%' }}>
    <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>Información sobre monedas</Typography>
    <Typography variant="body2">
      El dólar estadounidense (USD) es la moneda de referencia internacional y el peso chileno (CLP) es la moneda oficial de Chile. Puedes comprar o vender dólares fácilmente y ver la evolución del tipo de cambio en tiempo real. Recuerda siempre revisar la información antes de realizar cualquier transacción.
    </Typography>
  </Paper>
);

const ReviewsSection = ({ reviews }) => (
  <Paper sx={{ p: 3, background: '#23242b', color: '#fff', height: '100%' }}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Reseñas de usuarios</Typography>
    <Box>
      {reviews.length === 0 && <Typography variant="body2">Aún no hay reseñas.</Typography>}
      {reviews.map((r, idx) => (
        <Box key={r.id + idx} sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'flex-start' }}>
          <Avatar src={r.avatar} alt="avatar" sx={{ width: 48, height: 48 }} />
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{r.wallet}</Typography>
            <Typography variant="caption" sx={{ color: '#aaa' }}>{new Date(r.date).toLocaleString('es-CL')}</Typography>
            <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>{r.review}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Paper>
);

const CurrencyPricePage = () => {
  const isMobile = useMediaQuery('(max-width:900px)');
  const [reviews, setReviews] = useState([]);

  const handleNewReview = (reviewObj) => {
    setReviews(prev => [reviewObj, ...prev]);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 4,
          width: '100%',
          justifyContent: 'center',
          alignItems: isMobile ? 'stretch' : 'flex-start',
          m: 0,
          p: 0,
        }}
      >
        <Box sx={{ flex: 1, mb: isMobile ? 4 : 0 }}>
          <TradeBox onNewReview={handleNewReview} />
        </Box>
        <Box sx={{ flex: 2 }}>
          <LineChart />
        </Box>
      </Box>
      <Box
        sx={{
          display: isMobile ? 'block' : 'flex',
          gap: 4,
          width: '100%',
          mt: 2,
          mb: 6,
          m: 0,
          p: 0,
        }}
      >
        <Box sx={{ flex: 2, minWidth: 0 }}>
          <InfoSection />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <ReviewsSection reviews={reviews} />
        </Box>
      </Box>
    </>
  );
};

export default CurrencyPricePage; 