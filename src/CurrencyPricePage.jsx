import React, { useState } from "react";
import LineChart from "./LineChart";
import TradeBox from "./TradeBox";
import { Box, useMediaQuery, Typography, Paper, Avatar } from '@mui/material';
import GooglePlay from './assets/google-play-badge.png';
import AppStore from './assets/app-store-badge.png';

const initialReviews = [
  {
    id: '1',
    review: 'Excelente servicio, rápido y confiable. Muy recomendable para cambiar dólares a pesos chilenos.',
    date: new Date().toISOString(),
    wallet: 'Lora Smith',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    review: 'La atención al cliente fue muy buena y la plataforma es fácil de usar.',
    date: new Date().toISOString(),
    wallet: 'Carlos Pérez',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '3',
    review: 'Me gustó la rapidez de la transacción y la transparencia en el tipo de cambio.',
    date: new Date().toISOString(),
    wallet: 'Ana Torres',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: '4',
    review: 'Muy buena experiencia, volveré a usar la app para futuras conversiones.',
    date: new Date().toISOString(),
    wallet: 'Javier Soto',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    id: '5',
    review: 'Plataforma segura y confiable, el soporte respondió todas mis dudas.',
    date: new Date().toISOString(),
    wallet: 'María López',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
];

const InfoSection = () => (
  <Paper sx={{ p: 3, background: '#fff7f0', color: '#ff7a00', mb: 2, height: '100%', borderRadius: 3, boxShadow: '0 2px 8px #ffb36622' }}>
    <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: '#ff7a00' }}>Información sobre monedas</Typography>
    <Typography variant="body2" sx={{ color: '#b85c00' }}>
      El dólar estadounidense (USD) es la moneda de referencia internacional y el peso chileno (CLP) es la moneda oficial de Chile. Puedes comprar o vender dólares fácilmente y ver la evolución del tipo de cambio en tiempo real. Recuerda siempre revisar la información antes de realizar cualquier transacción.
    </Typography>
  </Paper>
);

const ReviewsSection = ({ reviews }) => (
  <Paper sx={{ p: 3, background: '#fff7f0', color: '#ff7a00', height: '100%', borderRadius: 3, boxShadow: '0 2px 8px #ffb36622' }}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#ff7a00' }}>Reseñas de usuarios</Typography>
    <Box>
      {reviews.length === 0 && <Typography variant="body2" sx={{ color: '#b85c00' }}>Aún no hay reseñas.</Typography>}
      {reviews.map((r, idx) => (
        <Box key={r.id + idx} sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'flex-start' }}>
          <Avatar src={r.avatar} alt="avatar" sx={{ width: 48, height: 48, border: '2px solid #ffb366' }} />
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#ff7a00' }}>{r.wallet}</Typography>
            <Typography variant="caption" sx={{ color: '#b85c00' }}>{new Date(r.date).toLocaleString('es-CL')}</Typography>
            <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line', color: '#ffffff' }}>{r.review}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Paper>
);

const InfoKeySection = () => (
  <Box sx={{
    width: '100%',
    fontFamily: 'Montserrat, Arial, sans-serif',
    p: { xs: 2, sm: 4, md: 4 },
    pt: { xs: 2, sm: 4, md: 4 },
    pl: { xs: 2, sm: 2, md: 2},
    m: 0,
    background: 'none',
  }}>
    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, fontFamily: 'Montserrat, Arial, sans-serif', fontSize: { xs: 26, md: 32 } }}>Información clave</Typography>
    <Typography variant="body1" sx={{ mb: 1, fontWeight: 500, fontFamily: 'Montserrat, Arial, sans-serif', fontSize: 18, pl: { xs: 1, sm: 2, md: 4 }, pt: { xs: 1, sm: 2 } }}>
      Relación entre el USD y el CLP (Tipo de Cambio)
    </Typography>
    <Typography variant="body2" sx={{ mb: 1, fontFamily: 'Montserrat, Arial, sans-serif', fontSize: 16, pl: { xs: 1, sm: 2, md: 4 } }}>
      El tipo de cambio entre el dólar estadounidense y el peso chileno (USD/CLP) es altamente volátil y está influenciado por una compleja interacción de los factores mencionados anteriormente para ambas monedas.
    </Typography>
    <ul style={{ margin: 0, paddingLeft: 32, color: '#222', fontSize: 16, fontFamily: 'Montserrat, Arial, sans-serif' }}>
      <li>Fluctuaciones: El tipo de cambio puede fluctuar significativamente en cortos períodos de tiempo debido a eventos económicos, políticos o incluso expectativas del mercado.</li>
      <li>Importancia para Chile: El tipo de cambio USD/CLP es crucial para la economía chilena, ya que afecta el costo de las importaciones, el valor de las exportaciones (especialmente el cobre), la inflación y la deuda externa denominada en dólares.</li>
      <li>Intervención del Banco Central: En ocasiones, el Banco Central de Chile puede intervenir en el mercado cambiario para tratar de estabilizar el tipo de cambio o influir en su dirección, aunque generalmente prefiere un tipo de cambio flotante.</li>
    </ul>
  </Box>
);

const DownloadAppSection = () => (
  <Box sx={{
    width: '100%',
    textAlign: 'center',
    mt: 8,
    mb: 0,
    p: 0,
    m: 0,
    background: 'none',
    fontFamily: 'Montserrat, Arial, sans-serif',
  }}>
    <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, fontFamily: 'Montserrat, Arial, sans-serif', fontSize: { xs: 20, sm: 26, md: 32 } }}>Descarga nuestra app!</Typography>
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 1, sm: 3 }, mb: 2 }}>
      <a href="#" target="_blank" rel="noopener noreferrer"><img src={GooglePlay} alt="Google Play" style={{ height: '40px', maxWidth: '140px', width: '100%' }} /></a>
      <a href="#" target="_blank" rel="noopener noreferrer"><img src={AppStore} alt="App Store" style={{ height: '40px', maxWidth: '140px', width: '100%' }} /></a>
    </Box>
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 3, width: '100%' }}>
      <Typography variant="body2" sx={{ color: '#222', textAlign: 'center', fontFamily: 'Montserrat, Arial, sans-serif', fontSize: { xs: 13, sm: 15, md: 16 } }}>
        Al utilizar esta aplicación, aceptas los siguientes términos y condiciones: <br /><br />
        1. El usuario es responsable de la veracidad de los datos ingresados y de las transacciones realizadas.<br />
        2. La plataforma se reserva el derecho de modificar las tasas de cambio y condiciones de uso sin previo aviso.<br />
        3. Los datos personales serán tratados conforme a la legislación vigente y no serán compartidos con terceros sin consentimiento.<br />
        4. La empresa no se responsabiliza por demoras o inconvenientes causados por entidades bancarias externas.<br />
        5. El uso indebido de la plataforma puede resultar en la suspensión o cancelación de la cuenta.<br />
        6. Para más información, contacta a nuestro soporte o revisa la política de privacidad.<br /><br />
        Última actualización: {new Date().toLocaleDateString('es-CL')}
      </Typography>
    </Box>
  </Box>
);

const Footer = () => (
  <Box sx={{ width: '100%', background: '#131313', color: '#fff', textAlign: 'center', py: 3, mt: 6, fontFamily: 'Montserrat, Arial, sans-serif' }}>
    <Typography variant="body1">&copy; {new Date().getFullYear()} PRIZ. Todos los derechos reservados.</Typography>
  </Box>
);

const CurrencyPricePage = () => {
  const isMobile = useMediaQuery('(max-width:900px)');
  const [reviews, setReviews] = useState(initialReviews);

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
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 6,
          width: '100%',
          mt: 6,
          mb: 2,
          m: 0,
          p: 0,
        }}
      >
        <Box sx={{ flex: 2, minWidth: 0 }}>
          <InfoKeySection />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0, pr: isMobile ? 0 : 4 }}>
          <Paper sx={{ p: 3, background: '#fff', color: '#222', borderRadius: 3, boxShadow: '0 2px 8px #ffb36622' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Reseñas</Typography>
            <Box>
              {reviews.length === 0 && <Typography variant="body2">Aún no hay reseñas.</Typography>}
              {reviews.map((r, idx) => (
                <Box key={r.id + idx} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Avatar src={r.avatar} alt="avatar" sx={{ width: 56, height: 56, border: '2px solid #ff7a00' }} />
                  <Box sx={{ borderLeft: '3px solid #ff7a00', pl: 2 }}>
                    <Typography variant="body2" sx={{ color: '#222', mb: 1 }}>{r.review}</Typography>
                    <Typography variant="subtitle2" sx={{ color: '#888', fontWeight: 600 }}>{r.wallet}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>
      <DownloadAppSection />
      <Footer />
    </>
  );
};

export default CurrencyPricePage; 