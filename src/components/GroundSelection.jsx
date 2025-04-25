import { Link } from 'react-router-dom';

const GroundSelection = () => {
  const grounds = [
    {
      id: 'football',
      name: 'Football Ground',
      description: 'Standard size football ground with proper markings and goal posts',
      image: '⚽'
    },
    {
      id: 'volleyball',
      name: 'Volleyball Court',
      description: 'Professional volleyball court with net and boundary lines',
      image: '🏐'
    },
    {
      id: 'lawn',
      name: 'Lawn Ground',
      description: 'Open lawn area suitable for various outdoor activities',
      image: '🌿'
    }
  ];

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 className="text-center mb-8">Select Ground Type</h1>
      <div className="grounds-grid">
        {grounds.map((ground) => (
          <Link 
            to={`/booking/${ground.id}`} 
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

export default GroundSelection; 