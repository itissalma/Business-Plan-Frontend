import React, { useState } from 'react';
import './questions.css'; // Import your CSS file
import axios from 'axios';
import { Redirect } from 'react-router-dom';


const Questionnare = () => {
const storedUsername = sessionStorage.getItem('username'); // Retrieve username from sessionStorage
  const [formData, setFormData] = useState({
    companyName: '',
    businessOverview: '',
    country: '',
    productsServices: '',
    targetAudience: '',
    employeesCount: '',
    businessGoals: '',
    userName: storedUsername || '', // Use stored username if available
  });
  const [showError, setShowError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [documentData, setDocumentData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if any field is empty
      if (Object.values(formData).some((value) => value === '')) {
        throw new Error('Please fill in all fields.');
      }

      // Make a POST request with the form data in the request body
      const response = await axios.post('http://localhost:8080/questions', formData);

      // Handle the response as needed
      console.log('API response:', response.data);

      if (response.status === 200) {
        // Assuming the server responds with the document data
        const documentData = response.data;

        // Set the redirect state to true
        setRedirect(true);
        setDocumentData(documentData);
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setShowError(true);
    }
  };

  if (redirect && documentData) {
    // Use window.location.href to navigate
    window.location.href = `/document/${documentData.id}`;
    return null; // Prevent rendering anything else before redirect
  }

  return (
    <div className="question-form-container">
      <h2>Questions Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          What is the name of your company?
          <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} />
        </label>

        <label>
          Give me an overview of your business?
          <textarea name="businessOverview" value={formData.businessOverview} onChange={handleInputChange} />
        </label>

        <label>
          What country is it located in?
          <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
        </label>

        <label>
          What products or services do you offer?
          <textarea name="productsServices" value={formData.productsServices} onChange={handleInputChange} />
        </label>

        <label>
          Who are you targeting?
          <input type="text" name="targetAudience" value={formData.targetAudience} onChange={handleInputChange} />
        </label>

        <label>
          How many employees do you have?
          <input type="number" name="employeesCount" value={formData.employeesCount} onChange={handleInputChange} />
        </label>

        <label>
          What are your goals for the business?
          <textarea name="businessGoals" value={formData.businessGoals} onChange={handleInputChange} />
        </label>

        <button type="submit">Submit</button>
      </form>

      {showError && (
        <div className="error-popup">
          <p>Please fill in all fields.</p>
          <button onClick={() => setShowError(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Questionnare;
