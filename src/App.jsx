import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Nav from './components/nav';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import BookingForm from './components/BookingForm';
import Timings from './components/timings';
import GroundSelection from './components/GroundSelection';
import TimingSelection from './components/TimingSelection';
import Approvals from './components/Approvals';

// Import CSS files
import './styles/global.css';
import './styles/nav.css';
import './styles/form.css';
import './styles/home.css';
import './styles/groundSelection.css';
import './styles/approvals.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/booking" element={<GroundSelection />} />
              <Route path="/booking/:groundType" element={<BookingForm />} />
              <Route path="/timings" element={<TimingSelection />} />
              <Route path="/timings/:groundType" element={<Timings />} />
              <Route path="/approvals" element={<Approvals />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
