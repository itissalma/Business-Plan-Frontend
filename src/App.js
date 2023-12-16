import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm/login';
import Dashboard from './Dashboard/dashboard';
import './App.css';
import Questionnaire from './Questionnaire/questions';
import BusinessPlan from './BusinessPlan/document';

function App() {
  const isAuthenticated = !!sessionStorage.getItem('username');

  const PrivateRoute = ({ element, ...props }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return element;
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
            />
            <Route
              path="/questions"
              element={<PrivateRoute element={<Questionnaire />} />}
            />
            <Route
              path="/document/:id"
              element={<PrivateRoute element={<BusinessPlan />} />}
            />
            <Route path="/" element={<LoginForm />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
