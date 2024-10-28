import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GrievanceForm from './components/GrievanceForm';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GrievanceForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
