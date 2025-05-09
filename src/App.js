import React, { useState } from 'react';
import CurrencyPricePage from './CurrencyPricePage';
import { AppBar, Toolbar, Typography, Box, useMediaQuery, Button, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const isMobile = useMediaQuery('(max-width:900px)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuOptions = [
    { label: 'Cotizar' },
    { label: 'Noticias' },
    { label: 'Empresa' },
    { label: 'Iniciar sesión' },
    { label: 'Registrarse', isPrimary: true },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #fff 0%, #ffe5d0 100%)', display: 'flex', flexDirection: 'column', p: 0, m: 0, boxSizing: 'border-box' }}>
      <AppBar position="static" elevation={0} sx={{ background: '#131313', color: '#ff7a00', boxShadow: '0 2px 8px #ffb36622', mb: 0 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: isMobile ? 1 : 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 84, height: 54, background: 'linear-gradient(135deg, #ffb366 0%, #ff7a00 100%)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #ffb36655' }}>
              <Typography variant="h5" sx={{ fontWeight: 900, color: '#fff', letterSpacing: 2, fontFamily: 'Montserrat, sans-serif' }}>PRIZ</Typography>
            </Box>
            {!isMobile && (
              <>
                <Button sx={{ color: '#ffffff', fontWeight: 600, fontSize: 16, textTransform: 'none' }}>Cotizar</Button>
                <Button sx={{ color: '#ffffff', fontWeight: 600, fontSize: 16, textTransform: 'none' }}>Noticias</Button>
                <Button sx={{ color: '#ffffff', fontWeight: 600, fontSize: 16, textTransform: 'none' }}>Empresa</Button>
              </>
            )}
          </Box>
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" sx={{ borderColor: '#ffffff', color: '#ffffff', fontWeight: 600, borderRadius: 2, px: 3, mr: 1, background: 'rgba(255,255,255,0.03)' }}>Iniciar sesión</Button>
              <Button variant="contained" sx={{ background: 'linear-gradient(90deg, #ffb366 0%, #ff7a00 100%)', color: '#fff', fontWeight: 700, borderRadius: 2, px: 3, boxShadow: '0 2px 8px #ffb36655' }}>Registrarse</Button>
            </Box>
          )}
          {isMobile && (
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ fontSize: 36 }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, pt: 2 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {menuOptions.map((option, idx) => (
              <ListItem button key={option.label} sx={option.isPrimary ? { mt: 2 } : {}}>
                <ListItemText primary={option.label} primaryTypographyProps={{ fontWeight: option.isPrimary ? 700 : 500, color: option.isPrimary ? '#ff7a00' : '#222', fontSize: option.isPrimary ? 18 : 16 }} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CurrencyPricePage />
      </Box>
      
    </Box>
  );
}

export default App; 