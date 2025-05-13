import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadForm from './Components/UploadForm';
import AnalysisReport from './Components/AnalysisReport';
import { AnalysisProvider } from './Context/AnalysisContext';
import './App.css';

function App() {
  return (
    <AnalysisProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route
              path="/"
              element={
                <div className="hero-section">
                  <header className="header">
                    <h1 className="header-title">CV Screener & Analyst</h1>
                    <p className="header-subtitle">
                      Upload your resume and get instant AI-powered feedback with scoring and suggestions.
                    </p>
                  </header>
                  <UploadForm />
                </div>
              }
            />
            <Route path="/analysis" element={<AnalysisReport />} />
          </Routes>
        </div>
      </Router>
    </AnalysisProvider>
  );
}

export default App;
