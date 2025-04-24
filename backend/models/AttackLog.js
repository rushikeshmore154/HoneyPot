import mongoose from 'mongoose';

const AttackLogSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  method: String,
  endpoint: String,
  payload: Object,
  attackType: String,
  timestamp: { type: Date, default: Date.now },
  location: {
    country: String,
    city: String,
    latitude: Number,
    longitude: Number
  }
});

const AttackLog = mongoose.model('AttackLog', AttackLogSchema);

export default AttackLog;
