import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useParams, useLocation } from 'react-router-dom';
import './document.css';

const BusinessPlan = () => {
  const { id } = useParams(); // Access the document ID from the route
  console.log("id: " + id);

  const location = useLocation();
  const { documentData } = location.state || {}; // Access documentData from the state

  const [sections, setSections] = useState({
    'Executive Summary': '',
    'Business Description': '',
    'Mission Statement': '',
    'Market Analysis': '',
    'Products or Services': '',
    'Marketing Plan': '',
  });

  const [expandedText, setExpandedText] = useState('');
  const [selectedSection, setSelectedSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Set initial sections state with documentData
    if (documentData) {
      setSections(documentData);
    }
  }, [documentData]);

  const handleSectionChange = (section, content) => {
    setSections((prevSections) => ({
      ...prevSections,
      [section]: content,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Filter sections with checkboxes checked
      const checkedSections = Object.entries(sections)
        .filter(([section]) => document.getElementById(`${section}-checkbox`).checked)
        .reduce((acc, [section, content]) => ({ ...acc, [section]: content }), {});

      // Send only the checked sections data to your backend
      await axios.post(`http://localhost:8080/document/${id}`, checkedSections);

      console.log(`Document ${id} data submitted successfully!`);
    } catch (error) {
      console.error(`Error submitting data for document ${id}:`, error.message);
    }
  };

  const handleExpandClick = async (section) => {
    // Set the selected section for expansion
    setSelectedSection(section);

    try {
      // Send the current text to the backend for expansion using the GPT AI
      const response = await axios.post('http://localhost:8080/expand-text', {
        text: sections[section],
      });

      console.log("response: " + response.data);
      // Update the expanded text state with the response
      setExpandedText(response.data);

      // Open the modal
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error expanding text:', error.message);
    }
  };

  const closeModal = () => {
    // Close the modal and reset the states
    setIsModalOpen(false);
    setSelectedSection(null);
    setExpandedText('');
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

      {/* Modal for displaying expanded text */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Expanded Text Modal"
      >
        <h2>{selectedSection} - Expanded Text</h2>
        <p>{expandedText}</p>
        <button type="button" onClick={closeModal}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default BusinessPlan;
