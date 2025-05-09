import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, TextField, Typography, Paper, IconButton, Button, CircularProgress, Alert, Avatar, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const getTodayString = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

function generateAtencionId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums = Math.floor(100000 + Math.random() * 900000).toString();
  const letters = chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)];
  return nums + letters;
}

const defaultBankData = { nombre: '', banco: '', tipo: '', cuenta: '' };

// Ejemplo de cuenta para depósito
const cuentaEjemplo = {
  nombre: 'Empresa SPA',
  banco: 'Banco Ejemplo',
  tipo: 'Cuenta Corriente',
  cuenta: '123456789',
  rut: '12.345.678-9'
};

const TradeWizard = ({ tipo, onClose, onFinish }) => {
  const [step, setStep] = useState(1);
  const [bankData, setBankData] = useState(defaultBankData);
  const [loading, setLoading] = useState(false);
  const [atencionId] = useState(generateAtencionId());
  const [chat, setChat] = useState([]);
  const [userMsg, setUserMsg] = useState('');
  const [confirmEnabled, setConfirmEnabled] = useState(false);
  const [timer, setTimer] = useState(900); // 15 minutos en segundos
  const [showReceipt, setShowReceipt] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [review, setReview] = useState('');

  // Mensajes automáticos según tipo
  const botMsgs = {
    compra: [
      `Por favor realiza la transferencia a la siguiente cuenta:`,
      `Banco: ${cuentaEjemplo.banco}\nNombre: ${cuentaEjemplo.nombre}\nTipo: ${cuentaEjemplo.tipo}\nN°: ${cuentaEjemplo.cuenta}\nRUT: ${cuentaEjemplo.rut}`,
      'Recuerda adjuntar el comprobante para agilizar el proceso.',
      'Te avisaremos cuando el pago sea verificado.'
    ],
    venta: [
      '¡Hola! Recibimos tus datos bancarios. En breve te indicaremos el estado de tu depósito.',
      'Recibirás el pago en cuanto confirmemos la recepción de tus fondos.',
      '¿Tienes alguna duda? Estoy aquí para ayudarte.'
    ]
  };

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  useEffect(() => {
    if (step === 2) {
      // Mensajes del bot al iniciar el paso 2
      setChat(botMsgs[tipo].map(msg => ({ from: 'bot', text: msg })));
      setTimeout(() => setConfirmEnabled(true), 2000);
    }
  }, [step, tipo]);

  const handleBankChange = e => {
    setBankData({ ...bankData, [e.target.name]: e.target.value });
  };

  const handleBankSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1200);
  };

  const handleSendMsg = () => {
    if (userMsg.trim()) {
      setChat(prev => [...prev, { from: 'user', text: userMsg }]);
      setUserMsg('');
      setTimeout(() => {
        setChat(prev => [...prev, { from: 'bot', text: tipo === 'compra' ? 'Gracias por tu mensaje, pronto te responderemos.' : 'Mensaje recibido, en breve te contactamos.' }]);
      }, 1000);
    }
  };

  const handleConfirm = () => {
    setConfirmEnabled(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      setShowReceipt(true);
    }, 1200);
  };

  const min = String(Math.floor(timer / 60)).padStart(2, '0');
  const sec = String(timer % 60).padStart(2, '0');

  // Manejo de reseña
  const handleReviewSubmit = () => {
    if (review.trim()) {
      onFinish({
        id: atencionId,
        review,
        date: new Date().toISOString(),
        wallet: generateWalletName(),
        avatar: getRandomAvatar(),
        tipo,
      });
      setShowReview(false);
      onClose();
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, margin: '0 auto', background: '#fff', color: '#ff7a00', minHeight: 420, borderRadius: 3, boxShadow: '0 2px 8px #ffb36622' }}>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ff7a00' }}>{tipo === 'compra' ? 'Compra' : 'Venta'} {step}/3</Typography>
        {step > 1 && <Typography variant="subtitle2" sx={{ color: '#b85c00' }}>Nº de atención: {atencionId}</Typography>}
      </Box>
      {step === 1 && (
        <form onSubmit={handleBankSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Typography sx={{ mb: 2, color: '#b85c00' }}>Completar datos bancarios</Typography>
          <TextField name="nombre" label="Nombre" value={bankData.nombre} onChange={handleBankChange} required sx={{ input: { color: '#ff7a00' } }} />
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="banco-label">Banco</InputLabel>
            <Select
              labelId="banco-label"
              name="banco"
              value={bankData.banco}
              label="Banco"
              onChange={handleBankChange}
              required
            >
              <MenuItem value="Banco Estado">Banco Estado</MenuItem>
              <MenuItem value="Banco de Chile">Banco de Chile</MenuItem>
              <MenuItem value="Otro Banco">Otro Banco</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="tipo-cuenta-label">Tipo de cuenta</InputLabel>
            <Select
              labelId="tipo-cuenta-label"
              name="tipo"
              value={bankData.tipo}
              label="Tipo de cuenta"
              onChange={handleBankChange}
              required
            >
              <MenuItem value="Ahorro">Ahorro</MenuItem>
              <MenuItem value="Corriente">Corriente</MenuItem>
            </Select>
          </FormControl>
          <TextField name="cuenta" label="Número de cuenta" value={bankData.cuenta} onChange={handleBankChange} required sx={{ input: { color: '#ff7a00' } }} />
          <Button type="submit" variant="contained" sx={{ background: 'linear-gradient(90deg, #ffb366 0%, #ff7a00 100%)', color: '#fff', fontWeight: 'bold', mt: 2, borderRadius: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Continuar'}
          </Button>
        </form>
      )}
      {step === 2 && (
        <Box>
          <Box sx={{ mb: 2, minHeight: 100, background: '#fff7f0', borderRadius: 2, p: 2, maxHeight: 120, overflowY: 'auto' }}>
            {chat.map((msg, i) => (
              <Box key={i} sx={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', mb: 1 }}>
                <Typography align={msg.from === 'user' ? 'right' : 'left'} sx={{ color: msg.from === 'user' ? '#ff7a00' : '#b85c00', fontSize: 15, background: msg.from === 'user' ? 'rgba(255,122,0,0.08)' : 'rgba(255,179,102,0.08)', borderRadius: 2, px: 1.5, py: 0.5, maxWidth: '80%' }}>
                  {msg.text.split('\n').map((line, idx) => <span key={idx}>{line}<br /></span>)}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              value={userMsg}
              onChange={e => setUserMsg(e.target.value)}
              placeholder="Escribir mensaje"
              sx={{ input: { color: '#ff7a00' } }}
            />
            <Button variant="contained" onClick={handleSendMsg} sx={{ background: '#ffb366', color: '#fff', fontWeight: 'bold', borderRadius: 2 }}>Enviar</Button>
          </Box>
          <Button
            fullWidth
            variant="contained"
            sx={{ background: 'linear-gradient(90deg, #ffb366 0%, #ff7a00 100%)', color: '#fff', fontWeight: 'bold', mt: 2, borderRadius: 2 }}
            disabled={!confirmEnabled || loading}
            onClick={handleConfirm}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Confirmar depósito'}
          </Button>
          <Typography sx={{ mt: 2, color: '#b85c00', fontSize: 14 }}>Tiempo restante: {min}:{sec}</Typography>
        </Box>
      )}
      {step === 3 && showReceipt && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Alert severity="success" sx={{ mb: 2, background: '#fff7f0', color: '#ff7a00', border: 'none' }}>¡Operación completada!</Alert>
          <Typography variant="subtitle1" sx={{ mb: 2, color: '#ff7a00' }}>Comprobante de pago</Typography>
          <Box sx={{ background: '#fff7f0', borderRadius: 2, p: 3, mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#b85c00' }}>Nº de atención: {atencionId}</Typography>
            <Typography variant="body2" sx={{ color: '#b85c00' }}>Nombre: {bankData.nombre}</Typography>
            <Typography variant="body2" sx={{ color: '#b85c00' }}>Banco: {bankData.banco}</Typography>
            <Typography variant="body2" sx={{ color: '#b85c00' }}>Tipo de cuenta: {bankData.tipo}</Typography>
            <Typography variant="body2" sx={{ color: '#b85c00' }}>N° de cuenta: {bankData.cuenta}</Typography>
            <Typography variant="body2" sx={{ mt: 2, color: '#b85c00' }}>¡Gracias por operar con nosotros!</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            {!showReview ? (
              <Button variant="contained" sx={{ background: '#ffb366', color: '#fff', fontWeight: 'bold', borderRadius: 2 }} onClick={() => setShowReview(true)}>Dejar reseña</Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  value={review}
                  onChange={e => setReview(e.target.value)}
                  placeholder="Escribe tu reseña..."
                  sx={{ mb: 2, input: { color: '#ff7a00' }, textarea: { color: '#ff7a00' } }}
                />
                <Button variant="contained" sx={{ background: '#ffb366', color: '#fff', fontWeight: 'bold', borderRadius: 2 }} onClick={handleReviewSubmit}>Enviar reseña</Button>
              </Box>
            )}
            <Button variant="text" sx={{ color: '#ff7a00' }} onClick={onClose}>Volver</Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

// Generar nombre tipo wallet
function generateWalletName() {
  const chars = 'ABCDEF0123456789';
  let wallet = '0x';
  for (let i = 0; i < 4; i++) wallet += chars[Math.floor(Math.random() * chars.length)];
  wallet += '...';
  for (let i = 0; i < 4; i++) wallet += chars[Math.floor(Math.random() * chars.length)];
  return wallet;
}
// Imagen avatar aleatoria
function getRandomAvatar() {
  const n = Math.floor(Math.random() * 70) + 1;
  return `https://i.pravatar.cc/150?img=${n}`;
}

const TradeBox = ({ onNewReview }) => {
  const [tab, setTab] = useState(0); // 0: Compra, 1: Venta
  const [inputValue, setInputValue] = useState("");
  const [dolarValue, setDolarValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputCurrency, setInputCurrency] = useState({ compra: 'USD', venta: 'CLP' });
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    const fetchDolar = async () => {
      setLoading(true);
      try {
        const today = getTodayString();
        const response = await fetch(`https://mindicador.cl/api/dolar/${today}`);
        const data = await response.json();
        if (data.serie && data.serie.length > 0) {
          setDolarValue(data.serie[0].valor);
        }
      } catch (e) {
        setDolarValue(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDolar();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (/^\d*\.?\d*$/.test(val)) {
      setInputValue(val);
    }
  };

  // Alternar divisa de entrada para cada tab
  const handleSwapCurrency = () => {
    setInputCurrency(prev => ({
      compra: prev.compra === 'USD' ? 'CLP' : 'USD',
      venta: prev.venta === 'CLP' ? 'USD' : 'CLP',
    }));
    setInputValue("");
  };

  let result = "";
  if (inputValue && dolarValue) {
    if (tab === 0) {
      // Compra
      if (inputCurrency.compra === 'USD') {
        result = (parseFloat(inputValue) * dolarValue).toFixed(2); // USD a CLP
      } else {
        result = (parseFloat(inputValue) / dolarValue).toFixed(6); // CLP a USD
      }
    } else {
      // Venta
      if (inputCurrency.venta === 'CLP') {
        result = (parseFloat(inputValue) / dolarValue).toFixed(6); // CLP a USD
      } else {
        result = (parseFloat(inputValue) * dolarValue).toFixed(2); // USD a CLP
      }
    }
  }

  // Etiquetas dinámicas
  const getLabels = () => {
    if (tab === 0) {
      return {
        input: `Compras (${inputCurrency.compra})`,
        output: `Gastas (${inputCurrency.compra === 'USD' ? 'CLP' : 'USD'})`,
        inputPlaceholder: inputCurrency.compra,
        outputPlaceholder: inputCurrency.compra === 'USD' ? 'CLP' : 'USD',
        action: inputCurrency.compra === 'USD' ? 'Comprar USD' : 'Comprar CLP',
      };
    } else {
      return {
        input: `Ventas (${inputCurrency.venta})`,
        output: `Gastas (${inputCurrency.venta === 'CLP' ? 'USD' : 'CLP'})`,
        inputPlaceholder: inputCurrency.venta,
        outputPlaceholder: inputCurrency.venta === 'CLP' ? 'USD' : 'CLP',
        action: inputCurrency.venta === 'CLP' ? 'Vender CLP' : 'Vender USD',
      };
    }
  };
  const labels = getLabels();

  if (showWizard) {
    return <TradeWizard tipo={tab === 0 ? 'compra' : 'venta'} onClose={() => setShowWizard(false)} onFinish={onNewReview} />;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 350, margin: '0 auto', background: '#fff', color: '#ff7a00', borderRadius: 3, boxShadow: '0 2px 8px #ffb36622' }}>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          mb: 2,
          '& .MuiTab-root': {
            fontWeight: 700,
            fontSize: 16,
            color: '#b85c00',
            textTransform: 'none',
            minHeight: 48,
            transition: 'color 0.2s',
          },
          '& .Mui-selected': {
            color: '#ff7a00',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#ff7a00',
            height: 3,
          },
        }}
      >
        <Tab label="Comprar" />
        <Tab label="Vender" />
      </Tabs>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center', mb: 2 }}>
        <Box sx={{ width: '100%' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#ff' }}>
            {labels.input}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={labels.inputPlaceholder}
            sx={{ mt: 1, input: { color: '#ff7a00' } }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', my: 1, justifyContent: 'center' }}>
          <Box sx={{ flex: 1, height: 1, borderBottom: '1px dashed #ffb366' }} />
          <IconButton
            onClick={handleSwapCurrency}
            sx={{ mx: 2, background: '#fff7f0', color: '#ff7a00', border: '2px solid #ffb366', boxShadow: 2 }}
          >
            <SwapHorizIcon />
          </IconButton>
          <Box sx={{ flex: 1, height: 1, borderBottom: '1px dashed #ffb366' }} />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#ff7a00' }}>
            {labels.output}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={result}
            InputProps={{ readOnly: true }}
            placeholder={labels.outputPlaceholder}
            sx={{ mt: 1, input: { color: '#ff7a00' } }}
          />
        </Box>
      </Box>
      <Button
        fullWidth
        sx={{ mt: 2, background: 'linear-gradient(90deg, #ffb366 0%, #ff7a00 100%)', color: '#fff !important', fontWeight: 'bold', fontSize: 18, py: 1.5, borderRadius: 2, '&:hover': { background: '#ff7a00' } }}
        onClick={() => setShowWizard(true)}
        disabled={!inputValue || parseFloat(inputValue) <= 0}
      >
        {labels.action}
      </Button>
      <Typography variant="body2" sx={{ color: '#b85c00', mt: 2 }}>
        {loading ? 'Cargando valor del dólar...' : dolarValue ? `1 USD ≈ $${dolarValue.toLocaleString('es-CL', { minimumFractionDigits: 2 })} CLP` : 'No disponible'}
      </Typography>
    </Paper>
  );
};

export default TradeBox; 