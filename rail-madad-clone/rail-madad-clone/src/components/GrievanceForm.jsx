import React, { useState } from 'react';
import './GrievanceForm.css';

const GrievanceForm = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    trainNumber: '',
    pnrNumber: '',
    problemDescription: '',
    type: '',
    subType: '',
    incidentDate: '',
    incidentTime: '',
    file: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="form-container">
      <form className="grievance-form" onSubmit={handleSubmit}>
        <h2>Grievance Detail</h2>
        
        <div className="form-row">
          <label>
            Train Number:
            <input
              type="text"
              name="trainNumber"
              value={formData.trainNumber}
              onChange={handleChange}
              placeholder="Enter the train number"
              required
            />
          </label>
          <label>
            PNR Number:
            <input
              type="text"
              name="pnrNumber"
              value={formData.pnrNumber}
              onChange={handleChange}
              placeholder="Enter your PNR number"
              required
            />
          </label>
        </div>

        <label>
          Problem Description:
          <textarea
            name="problemDescription"
            value={formData.problemDescription}
            onChange={handleChange}
            placeholder="Describe your problem"
            required
          />
        </label>

        <div className="form-row">
          <label>
            Type:
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">--Select--</option>
              <option value="General">General</option>
              <option value="Technical">Technical</option>
            </select>
          </label>
          <label>
            Sub Type:
            <select name="subType" value={formData.subType} onChange={handleChange} required>
              <option value="">--Select--</option>
              <option value="Delay">Delay</option>
              <option value="Service Issue">Service Issue</option>
            </select>
          </label>
        </div>

        <label>
          Upload File (Image, Video, Audio):
          <input type="file" name="file" accept="image/*,video/*,audio/*" onChange={handleFileChange} />
        </label>

        <div className="form-row">
          <label>
            Incident Date:
            <input type="date" name="incidentDate" value={formData.incidentDate} onChange={handleChange} required />
          </label>
          <label>
            Incident Time:
            <input type="time" name="incidentTime" value={formData.incidentTime} onChange={handleChange} required />
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GrievanceForm;