import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: String, required: true },
});

export default mongoose.model("Appointments", AppointmentSchema);