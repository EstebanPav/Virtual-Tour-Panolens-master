const mongoose = require('mongoose');
const Scene = require('./models/Scene'); // Importa tu modelo
const data = require('./json/map.json'); // Importa el archivo JSON

mongoose
  .connect('mongodb://127.0.0.1:27017/virtual-tour', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Conectado a MongoDB para migración');

    // Limpia la colección para evitar duplicados
    await Scene.deleteMany({});
    console.log('Datos anteriores eliminados');

    // Inserta los datos del JSON
    const formattedData = data.map((scene) => ({
      id: scene.id,
      src: scene.src,
      spots: scene.spots.map((spot) => ({
        type: spot.type,
        position: spot.position,
        target: spot.target || null, // Sólo para hotspots
        contentType: spot.contentType || null, // Sólo para infospots
        content: spot.content || null,
        size: spot.size || 50, // Valor por defecto
        label: spot.label || null,
        icon: spot.icon || '/icons/default.png', // Valor por defecto
      })),
    }));

    await Scene.insertMany(formattedData);
    console.log('Datos migrados exitosamente');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err);
  });
