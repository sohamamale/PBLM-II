const express = require('express');
const router = express.Router();
const { 
  createBooking, 
  getBookings, 
  updateBookingStatus,
  getAvailableSlots 
} = require('../controllers/bookingController');
const { auth, authorize } = require('../middleware/auth');

// All booking routes require authentication
router.use(auth);

// Get available slots (accessible to all authenticated users)
router.get('/available', getAvailableSlots);

// CR routes
router.post('/', authorize('CR'), createBooking);
router.get('/', authorize('CR', 'student'), getBookings);

// Admin routes
router.patch('/:id/status', authorize('admin'), updateBookingStatus);

module.exports = router; 