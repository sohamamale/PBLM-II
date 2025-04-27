const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    // Only CRs can create bookings
    if (req.user.role !== 'CR') {
      return res.status(403).json({ error: 'Only CRs can create bookings' });
    }

    const booking = new Booking({
      ...req.body,
      user: req.user._id
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Time slot already booked' });
    }
    res.status(400).json({ error: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const query = {};
    
    // Students can only view their own bookings
    if (req.user.role === 'student') {
      query.user = req.user._id;
    }
    
    // CRs can view their own bookings
    if (req.user.role === 'CR') {
      query.user = req.user._id;
    }

    const bookings = await Booking.find(query)
      .populate('user', 'name email')
      .sort({ date: 1, timeSlot: 1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    // Only admin can update booking status
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admin can update booking status' });
    }

    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'name email');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const { groundType, date } = req.query;
    const bookings = await Booking.find({
      groundType,
      date: new Date(date),
      status: { $in: ['pending', 'approved'] }
    });

    // Generate all possible time slots (8 AM to 6 PM)
    const allSlots = Array.from({ length: 11 }, (_, i) => i + 8);
    
    // Get booked slots
    const bookedSlots = bookings.map(booking => booking.timeSlot);
    
    // Filter out booked slots
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
    
    res.json(availableSlots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 