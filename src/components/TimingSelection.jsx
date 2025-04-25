import { Link } from 'react-router-dom';

const TimingSelection = () => {
  const grounds = [
    {
      id: 'football',
      name: 'Football Ground',
      description: 'View available time slots for the football ground',
      image: '⚽'
    },
    {
      id: 'volleyball',
      name: 'Volleyball Court',
      description: 'View available time slots for the volleyball court',
      image: '🏐'
    },
    {
      id: 'lawn',
      name: 'Lawn Ground',
      description: 'View available time slots for the lawn ground',
      image: '🌿'
    }
  ];

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 className="text-center mb-8">Select Ground to View Timings</h1>
      <div className="grounds-grid">
        {grounds.map((ground) => (
          <Link 
            to={`/timings/${ground.id}`} 
            key={ground.id}
            className="ground-card"
          >
            <div className="ground-icon">{ground.image}</div>
            <h2 className="ground-title">{ground.name}</h2>
            <p className="ground-description">{ground.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TimingSelection; 