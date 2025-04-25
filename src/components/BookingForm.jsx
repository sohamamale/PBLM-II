import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookingForm.css';

function BookingForm({ onBookingSuccess }) {
  const { groundType } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    timeSlot: '',
    purpose: '',
    groundType: groundType || 'lawn' // Default to lawn if no type specified
  });

  const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8); // 8 to 18

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing bookings from localStorage
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    // Check if slot is already booked
    const isSlotBooked = existingBookings.some(
      booking => booking.date === formData.date && 
                booking.timeSlot === formData.timeSlot &&
                booking.groundType === formData.groundType
    );

    if (isSlotBooked) {
      alert('This slot is already booked. Please choose another time.');
      return;
    }

    // Add new booking
    const newBooking = {
      ...formData,
      id: Date.now(),
      bookingDate: new Date().toISOString()
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

    alert('Booking successful!');
    if (onBookingSuccess) {
      onBookingSuccess();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    <div className="booking-form">
      <h2>Book {getGroundTitle()}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div className="form-group">
          <label>Time Slot:</label>
          <select
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            required
          >
            <option value="">Select a time slot</option>
            {timeSlots.map(hour => (
              <option key={hour} value={hour}>
                {hour}:00 - {hour + 1}:00
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Purpose:</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit">Book Slot</button>
      </form>
    </div>
  );
}

export default BookingForm; 