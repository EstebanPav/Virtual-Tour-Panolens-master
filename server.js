const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const compression = require('compression');
const Scene = require('./models/Scene');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(compression()); // Habilitar compresión para respuestas

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/icons', express.static(path.join(__dirname, 'icons')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));
app.use('/photos', express.static(path.join(__dirname, 'photos')));
app.use('/audios', express.static(path.join(__dirname, 'audios')));

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado a la base de datos MongoDB'))
  .catch((err) => console.error('Error conectando a MongoDB:', err));

// Endpoint para obtener datos
app.get('/api/data', async (req, res) => {
  try {
    const scenes = await Scene.find();
    res.json(scenes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

// Servir el archivo HTML principal
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
