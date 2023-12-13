import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm/login';
import Dashboard from './Dashboard/dashboard';
import './App.css';
import Questionnare from './Questionnaire/questions';
import BusinessPlan from './BusinessPlan/document';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/questions" element={<Questionnare />} />
            <Route path="/document" element={<BusinessPlan />} />
            <Route path="/" element={<LoginForm />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
