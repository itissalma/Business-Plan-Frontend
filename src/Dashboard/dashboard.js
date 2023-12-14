import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './dashboard.css'; // Import your CSS file

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/documents');
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error.message);
      }
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (documentId) => {
    try {
      await axios.post(`http://localhost:8080/delete-document/${documentId}`);
      setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc.id !== documentId));
    } catch (error) {
      console.error('Error deleting document:', error.message);
    }
  };

  const handleDocumentClick = (documentId) => {
    // Redirect to the "/document" route with the selected document's ID
    //TODO: call the api for getting the document data
    window.location.href = '/document/' + documentId;
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button type="button">Logout</button>

      <div className="document-list">
        <Link to="/questions" className="no-decoration">
          <div className="document-card new-document-card">
            <span className="add-icon">+</span>
          </div>
        </Link>

        {documents.map((document) => (
          <div
            key={document.id}
            className="document-card"
            id={`document-${document.id}`}
            onClick={() => handleDocumentClick(document.id)}
          >
            <span className="document-name">{document.name}</span>
            <button
              type="button"
              className="delete-icon"
              onClick={(e) => {
                e.stopPropagation(); // Prevent document click event from firing
                handleDelete(document.id);
              }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
