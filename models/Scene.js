const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  type: { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    z: { type: Number, required: true },
  },
  target: { type: String, default: null }, // Para hotspots
  contentType: { type: String, default: null }, // Para infospots
  content: { type: mongoose.Schema.Types.Mixed, default: null }, // Puede ser string o array
  size: { type: Number, default: 50 },
  label: { type: String, default: null },
  icon: { type: String, default: '/icons/default.png' },
});

const sceneSchema = new mongoose.Schema({
  id: { type: String, required: true },
  src: { type: String, required: true },
  spots: [spotSchema],
});

const Scene = mongoose.model('Scene', sceneSchema);

module.exports = Scene;
