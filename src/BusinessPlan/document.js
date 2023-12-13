import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './document.css'; // Import your CSS file

const BusinessPlan = () => {
  const [sections, setSections] = useState({
    'Executive Summary': '',
    'Business Description': '',
    'Mission Statement': '',
    'Market Analysis': '',
    'Products or Services': '',
    'Marketing Plan': '',
  });

  useEffect(() => {
    // Fetch initial data for all sections when the component mounts
    fetchBusinessPlanData();
  }, []);

  const fetchBusinessPlanData = async () => {
    try {
      // Make a GET request to your API endpoint to get data for all sections
      const response = await axios.get('http://localhost:8080/business-plan');

      // Update the sections with the retrieved data
      setSections(response.data);
    } catch (error) {
      console.error('Error fetching business plan data:', error.message);
    }
  };

  const handleSectionChange = (section, content) => {
    setSections((prevSections) => ({
      ...prevSections,
      [section]: content,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Send the sections data to your backend or perform any desired action
      await axios.post('http://localhost:8080/business-plan', sections);

      // Handle the response or perform any further action
      console.log('Business plan data submitted successfully!');
    } catch (error) {
      console.error('Error submitting business plan:', error.message);
    }
  };

  const handleExpandClick = (section) => {
    // Implement logic to expand or do something with the section
    console.log(`Expand button clicked for ${section}`);
  };

  return (
    <div className="business-plan-container">
      <h2>Business Plan</h2>

      {Object.entries(sections).map(([section, content]) => (
        <div key={section} className="business-plan-section">
          <div className="section-header">
            <h3>
              {section}
              <button type="button" className='button2' onClick={() => handleExpandClick(section)}>
                Expand
              </button>
            </h3>
          </div>
          <div className="section-content">
            <input type="checkbox" id={`${section}-checkbox`} />
            <textarea 
              value={content}
              onChange={(e) => handleSectionChange(section, e.target.value)}
            />
          </div>
        </div>
      ))}

      <button type="button" onClick={handleSubmit}>
        Save Business Plan
      </button>
    </div>
  );
};

export default BusinessPlan;
