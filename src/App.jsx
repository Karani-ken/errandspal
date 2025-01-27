import { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Dashboard from './Components/Dashboards/Dashboard';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import ProtectedRoute from './Middlewares/ProtectedRoute';
import Panels from './Components/Dashboards/Panels';
import PaymentPage from './Components/Payments/PaymentPage';
import SubscriptionPlans from './Components/Subscriptions/SubscriptionPlans';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const LocationBasedNavbar = () => {
    const location = useLocation();

    if (location.pathname === "/dashboard") {
      return null;
    }
    return <Navbar />;
  };

  return (
    <Router>
      <div>       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Panels />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
           <Route
            path="/plans"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SubscriptionPlans />
              </ProtectedRoute>
            }
          />
        </Routes>
        
      </div>
    </Router>
  )
}

export default App
