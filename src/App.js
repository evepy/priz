import React from 'react';
import CurrencyPricePage from './CurrencyPricePage';
import { AppBar, Toolbar, Typography, Box, useMediaQuery } from '@mui/material';

function App() {
  const isMobile = useMediaQuery('(max-width:900px)');

  return (
    <Box sx={{ minHeight: '100vh', background: '#181A20', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" sx={{ background: '#222', mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
            Currency App
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CurrencyPricePage />
      </Box>
      <Box sx={{ textAlign: 'center', py: 2, background: '#23242b', color: '#fff', mt: 'auto' }}>
        creado por ...
      </Box>
    </Box>
  );
}

export default App; 