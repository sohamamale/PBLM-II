import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import BookingForm from './BookingForm';

function Timings() {
  const { groundType } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8); // 8 to 18

  useEffect(() => {
    // Load bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const slotsForDate = bookings
      .filter(booking => booking.date === selectedDate && booking.groundType === groundType)
      .map(booking => parseInt(booking.timeSlot));
    setBookedSlots(slotsForDate);
  }, [selectedDate, groundType]);

  const handleBookingSuccess = () => {
    // Refresh the booked slots after a successful booking
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const slotsForDate = bookings
      .filter(booking => booking.date === selectedDate && booking.groundType === groundType)
      .map(booking => parseInt(booking.timeSlot));
    setBookedSlots(slotsForDate);
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
    <div style={{ padding: '20px' }}>
      <h2>{getGroundTitle()} - Available Time Slots</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Select Date: </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '30px' }}>
        {timeSlots.map((hour) => (
          <div
            key={hour}
            style={{
              padding: '10px',
              borderRadius: '8px',
              backgroundColor: bookedSlots.includes(hour) ? '#f87171' : '#86efac',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {hour}:00 - {hour + 1}:00 <br />
            {bookedSlots.includes(hour) ? 'Booked' : 'Available'}
          </div>
        ))}
      </div>

      <BookingForm onBookingSuccess={handleBookingSuccess} />
    </div>
  );
}

export default Timings;
