import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation
import './dashboard.css'; // Import your CSS file

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch documents from the backend when the component mounts
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/documents'); // Replace with your actual API endpoint
        setDocuments(response.data); // Assuming the response is an array of documents
      } catch (error) {
        console.error('Error fetching documents:', error.message);
      }
    };

    fetchDocuments();
  }, []); // The empty dependency array ensures the effect runs only once on mount

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button type="button">
        Logout
      </button>
  
      <div className="document-list">
        {/* Add the new document card with the same styling */}
        <Link to="/editor" className="no-decoration">
          <div className="document-card new-document-card">
            <span className="add-icon">+</span>
          </div>
        </Link>
  
        {/* Map through documents and display them with the same styling */}
        {documents.map((document) => (
          <Link key={document.id} to={`/editor/${document.id}`} className="no-decoration">
            <div className="document-card">
              <span className="document-name">{document.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
