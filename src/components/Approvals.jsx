import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Approvals = () => {
  const { isDarkMode } = useTheme();
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const formattedApprovals = bookings.map(booking => ({
      id: booking.id,
      groundType: getGroundTitle(booking.groundType),
      date: booking.date,
      timeSlot: `${booking.timeSlot}:00 - ${parseInt(booking.timeSlot) + 1}:00`,
      status: booking.status || 'Pending',
      authority: getAuthority(booking.groundType),
      name: booking.name,
      email: booking.email,
      purpose: booking.purpose
    }));
    setApprovals(formattedApprovals);
    setLoading(false);
  }, []);

  const getGroundTitle = (type) => {
    switch(type) {
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

  const getAuthority = (groundType) => {
    switch(groundType) {
      case 'football':
        return 'Sports Department';
      case 'volleyball':
        return 'Recreation Committee';
      case 'lawn':
        return 'Maintenance Team';
      default:
        return 'General Administration';
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'approved':
        return isDarkMode ? 'text-green-400' : 'text-green-600';
      case 'rejected':
        return isDarkMode ? 'text-red-400' : 'text-red-600';
      case 'pending':
        return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
      default:
        return isDarkMode ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedApprovals = approvals.map(approval => 
      approval.id === id ? { ...approval, status: newStatus } : approval
    );
    setApprovals(updatedApprovals);

    // Update localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = bookings.map(booking =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const filteredApprovals = approvals.filter(approval => 
    filter === 'all' ? true : approval.status.toLowerCase() === filter
  );

  if (loading) {
    return (
      <div className={`container ${isDarkMode ? 'dark' : ''}`} style={{ padding: '2rem 0' }}>
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`container ${isDarkMode ? 'dark' : ''}`} style={{ padding: '2rem 0' }}>
      <h1 className="text-center mb-8">Authority Approvals</h1>
      
      <div className="filters mb-6">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
          onClick={() => setFilter('approved')}
        >
          Approved
        </button>
        <button 
          className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          Rejected
        </button>
      </div>

      <div className="approvals-table">
        <table className="w-full">
          <thead>
            <tr className={isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}>
              <th className="p-4 text-left">Ground Type</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Time Slot</th>
              <th className="p-4 text-left">Booked By</th>
              <th className="p-4 text-left">Authority</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApprovals.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  No approvals found
                </td>
              </tr>
            ) : (
              filteredApprovals.map((approval) => (
                <tr 
                  key={approval.id} 
                  className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <td className="p-4">{approval.groundType}</td>
                  <td className="p-4">{approval.date}</td>
                  <td className="p-4">{approval.timeSlot}</td>
                  <td className="p-4">
                    <div className="booked-by">
                      <div>{approval.name}</div>
                      <div className="text-sm opacity-75">{approval.email}</div>
                    </div>
                  </td>
                  <td className="p-4">{approval.authority}</td>
                  <td className={`p-4 ${getStatusColor(approval.status)}`}>
                    {approval.status}
                  </td>
                  <td className="p-4">
                    {approval.status === 'Pending' && (
                      <div className="action-buttons">
                        <button
                          className="approve-btn"
                          onClick={() => handleStatusChange(approval.id, 'Approved')}
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleStatusChange(approval.id, 'Rejected')}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Approvals; 