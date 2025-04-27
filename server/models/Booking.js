const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  groundType: {
    type: String,
    enum: ['football', 'volleyball', 'lawn'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: Number,
    required: true,
    min: 8,
    max: 18
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Compound index to ensure unique bookings for same ground, date, and time slot
bookingSchema.index({ groundType: 1, date: 1, timeSlot: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking; 