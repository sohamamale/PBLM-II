import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

// Timings component for displaying and managing available time slots
function Timings() {
  // Get ground type from URL parameters
  const { groundType } = useParams();
  const { isDarkMode } = useTheme();
  
  // State for managing selected date (defaults to current date)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // State for storing booked slots
  const [bookedSlots, setBookedSlots] = useState([]);
  
  // Generate time slots from 8 AM to 6 PM (11 slots)
  const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8);

  // Effect hook to load bookings when date or ground type changes
  useEffect(() => {
    // Load bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    // Filter bookings for selected date and ground type
    const slotsForDate = bookings
      .filter(booking => booking.date === selectedDate && booking.groundType === groundType)
      .map(booking => parseInt(booking.timeSlot));
    
    // Update booked slots state
    setBookedSlots(slotsForDate);
  }, [selectedDate, groundType]);

  // Helper function to get ground title based on ground type
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
    <div style={{ 
      padding: '20px',
      color: isDarkMode ? '#ffffff' : '#000000'
    }}>
      {/* Display ground title */}
      <h2 style={{ 
        marginBottom: '30px',
        textAlign: 'center',
        color: isDarkMode ? '#ffffff' : '#000000'
      }}>
        {getGroundTitle()} - Available Time Slots
      </h2>
      
      {/* Date selection input */}
      <div style={{ 
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px'
      }}>
        <label style={{ 
          fontWeight: 'bold',
          color: isDarkMode ? '#ffffff' : '#000000'
        }}>
          Select Date:
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          style={{
            padding: '8px',
            borderRadius: '6px',
            border: `1px solid ${isDarkMode ? '#4a5568' : '#cbd5e0'}`,
            backgroundColor: isDarkMode ? '#2d3748' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
            cursor: 'pointer'
          }}
        />
      </div>

      {/* Grid of time slots */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '15px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {timeSlots.map((hour) => (
          <div
            key={hour}
            style={{
              padding: '15px',
              borderRadius: '12px',
              backgroundColor: bookedSlots.includes(hour) 
                ? (isDarkMode ? '#dc2626' : '#ef4444') // Red for booked slots
                : (isDarkMode ? '#86efac' : '#22c55e'), // Green for available slots
              textAlign: 'center',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease',
              cursor: 'pointer',
              ':hover': {
                transform: 'scale(1.02)'
              }
            }}
          >
            <div style={{ 
              fontSize: '1.2em', 
              marginBottom: '5px',
              fontWeight: '600',
              color: bookedSlots.includes(hour) 
                ? '#ffffff' // White text for booked slots
                : (isDarkMode ? '#000000' : '#ffffff'), // Black text for available slots in dark mode
              textShadow: bookedSlots.includes(hour) 
                ? '0 1px 2px rgba(0,0,0,0.3)'
                : 'none'
            }}>
              {hour}:00 - {hour + 1}:00
            </div>
            <div style={{ 
              fontSize: '0.9em',
              color: bookedSlots.includes(hour) 
                ? '#ffffff' // White text for booked slots
                : (isDarkMode ? '#000000' : '#ffffff'), // Black text for available slots in dark mode
              textShadow: bookedSlots.includes(hour) 
                ? '0 1px 2px rgba(0,0,0,0.3)'
                : 'none',
              opacity: 0.9
            }}>
              {bookedSlots.includes(hour) ? 'Booked' : 'Available'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timings;
