import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const qrCodeUrl = 'res/qrcode.png';  // Signup QR CODE
  const linkUrl = 'https://discord.gg/mQ76kE4d5b';  // Club Discord

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://scuzzy.space/api/save-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Data saved successfully');

      // Show QR code and link
      setSubmitted(true);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="container">
	<h1 className="form-title">Join the Chaffey MakerSpace Club!</h1>
      <h4 className="form-text">Please Fill Out the Form.</h4>
      <form onSubmit={handleSubmit}>
        <div className="inputs-container">
          {submitted ? (
            <div className="qr-section">
              <img src={qrCodeUrl} alt="QR Code" className="qr-image" />
              <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="qr-link">
                Join the Clubs Discord!!1!
              </a>
            </div>
          ) : (
            <>
              <input
                type="text"
                name="input1"
                value={formData.input1}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <input
                type="text"
                name="input2"
                value={formData.input2}
                onChange={handleInputChange}
                placeholder="Student ID"
              />
              <input
                type="text"
                name="input3"
                value={formData.input3}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <input
                type="text"
                name="input4"
                value={formData.input4}
                onChange={handleInputChange}
                placeholder="Did you drink water .. ?"
              />
              <button type="submit">Submit</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;

