import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadForm from "./Components/UploadForm";
import AnalysisReport from "./Components/AnalysisReport";
import CareerCoachChat from "./Components/CareerCoachChat";
import { AnalysisProvider } from "./Context/AnalysisContext";
import ResumeInsights from "./Components/ResumeInsights";

import "./App.css";

function App() {
  return (
    <AnalysisProvider>
      <Router>
        <div className="page-container">
          {/* ===== Header ===== */}
          <header className="header">
            <h1 className="header-title">📄 CV Screener & Analyst</h1>
            <p className="header-subtitle">
              Upload your resume and get instant AI-powered feedback with scoring and suggestions.
            </p>
          </header>

          {/* ===== Upload + Chat + Highlight Section ===== */}
          <div className="highlighted-row">
            {/* Upload + Chat Row */}
            <div className="upload-chat-container">
              <div className="card upload-card">
                <h2 className="header-tagline">
                  Is your resume strong enough to land interviews?
                </h2>
                <UploadForm />
              </div>
              <div className="card chat-card">
                <CareerCoachChat />
              </div>
            </div>

            {/* Resume Highlight Section */}
            <div className="resume-highlight">
              <img
                src="/goodvsbad.jpg"
                alt="Resume Examples"
                className="highlight-image"
              />
              <div className="highlight-content">
                <h2>Make sure your resume stands out for the right reasons!</h2>
                <ul>
                  <li>Eliminate embarrassing mistakes and typos</li>
                  <li>Sell yourself effectively by strengthening your content</li>
                  <li>Improve your design and create a visually appealing resume</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <ResumeInsights />
          </div>

          {/* ===== Result Page Routing ===== */}
          <Routes>
            <Route path="/analysis" element={<AnalysisReport />} />
          </Routes>
        </div>
      </Router>
    </AnalysisProvider>
  );
}

export default App;
