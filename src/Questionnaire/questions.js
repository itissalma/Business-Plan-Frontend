import React, { useState } from 'react';
import './questions.css'; // Import your CSS file
import axios from 'axios';

const Questionnare = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    businessOverview: '',
    country: '',
    productsServices: '',
    targetAudience: '',
    employeesCount: '',
    businessGoals: '',
  });
  const [showError, setShowError] = useState(false);

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
      if (Object.values(formData).some(value => value === '')) {
        throw new Error('Please fill in all fields.');
      }

      const queryParams = new URLSearchParams(formData).toString();

      // Make a GET request with the form data as URL parameters
      const response = await axios.post(`http://localhost:8080/questions?${queryParams}`);
      
      // Handle the response as needed
      console.log('API response:', response.data);

      if(response.status === 200){
        window.location.href = '/document';
      }

    } catch (error) {
      console.error('Error submitting form:', error.message);
      setShowError(true);

      // Handle the error, for example, display an error message to the user
    }
  };

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
