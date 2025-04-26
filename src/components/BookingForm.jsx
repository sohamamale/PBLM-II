import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './BookingForm.css';

function BookingForm({ onBookingSuccess }) {
  const { groundType } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    timeSlot: '',
    purpose: '',
    groundType: groundType || 'lawn'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8); // 8 to 18

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.timeSlot) newErrors.timeSlot = 'Time slot is required';
    if (!formData.purpose.trim()) newErrors.purpose = 'Purpose is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Get existing bookings from localStorage
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      
      // Check if slot is already booked
      const isSlotBooked = existingBookings.some(
        booking => booking.date === formData.date && 
                  booking.timeSlot === formData.timeSlot &&
                  booking.groundType === formData.groundType
      );

      if (isSlotBooked) {
        setErrors({ timeSlot: 'This slot is already booked. Please choose another time.' });
        return;
      }

      // Add new booking
      const newBooking = {
        ...formData,
        id: Date.now(),
        bookingDate: new Date().toISOString(),
        status: 'Pending'
      };

      const updatedBookings = [...existingBookings, newBooking];
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));

      // Reset form
      setFormData({
        name: '',
        email: '',
        date: '',
        timeSlot: '',
        purpose: '',
        groundType: groundType || 'lawn'
      });
      setErrors({});

      alert('Booking successful! Your request is pending approval.');
      navigate('/approvals');
    } catch (error) {
      console.error('Booking error:', error);
      alert('An error occurred while processing your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const getGroundTitle = () => {
    switch(groundType) {
      case 'football':
        return 'Football Ground';
      case 'volleyball':
        return 'Volleyball Court';
      case 'lawn':
        return 'Lawn Ground';
      default:
        return 'Ground';
    }
  };

  return (
    <div className={`booking-form ${isDarkMode ? 'dark' : ''}`}>
      <h2>Book {getGroundTitle()}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="Enter your full name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={errors.date ? 'error' : ''}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>
        
        <div className="form-group">
          <label>Time Slot:</label>
          <select
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            className={errors.timeSlot ? 'error' : ''}
          >
            <option value="">Select a time slot</option>
            {timeSlots.map(hour => (
              <option key={hour} value={hour}>
                {hour}:00 - {hour + 1}:00
              </option>
            ))}
          </select>
          {errors.timeSlot && <span className="error-message">{errors.timeSlot}</span>}
        </div>
        
        <div className="form-group">
          <label>Purpose:</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className={errors.purpose ? 'error' : ''}
            placeholder="Describe the purpose of your booking"
            rows="4"
          />
          {errors.purpose && <span className="error-message">{errors.purpose}</span>}
        </div>
        
        <button 
          type="submit" 
          className={isSubmitting ? 'submitting' : ''}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Book Slot'}
        </button>
      </form>
    </div>
  );
}

export default BookingForm; 