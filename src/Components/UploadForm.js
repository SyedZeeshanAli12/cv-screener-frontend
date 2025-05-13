import React, { useState } from "react";
import API from "../api";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useAnalysis } from "../Context/AnalysisContext";
import "../App.css";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");             // ← new
  const navigate = useNavigate();
  const { setAnalysisData } = useAnalysis();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMsg("Please select a resume file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setErrorMsg("");                                         // clear old errors
    setUploading(true);

    try {
      const response = await API.post("https://cv-screener-backend.onrender.com/api/resumes/upload", formData);
      const data = response.data.data;
      setAnalysisData(data);
      setUploadDone(true);
    } catch (err) {
      console.error("Upload Error:", err);
      // show server‐sent message if available, otherwise generic
      const msg =
        err.response?.data?.error ||
        "Upload failed. Please try again or re-save your PDF in UTF-8 format.";
      setErrorMsg(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleViewAnalysis = () => {
    navigate("/analysis");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadDone(false);
    setErrorMsg("");                                       // clear on new file
  };

  return (
    <div className="upload-page-layout">
      <div className="upload-left">
        {/* ─── Error Pop-up ─── */}
        {errorMsg && (
          <div className="error-popup">
            <span>{errorMsg}</span>
            <button
              className="close-btn"
              onClick={() => setErrorMsg("")}
              aria-label="Dismiss error"
            >
              &times;
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-container">
          <h2 className="form-title">Upload Your Resume</h2>

          <label className="custom-file-upload">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              required
            />
            📎 Choose Resume
          </label>

          <div
            style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#333" }}
          >
            {file?.name || "No file chosen"}
          </div>

          {uploading ? (
            <>
              <div style={{ marginTop: "1rem" }}>
                <Circles
                  height="50"
                  width="50"
                  color="#4fa94d"
                  ariaLabel="loading"
                />
                <p>Analyzing resume...</p>
              </div>
              <div style={{ marginTop: "10px", width: "100%" }}>
                <div style={{ width: "100%", background: "#eee", borderRadius: "5px" }}>
                  <div
                    style={{
                      height: "10px",
                      width: "100%",
                      background: "#4fa94d",
                      animation: "pulse 2s ease-in-out infinite",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              </div>
            </>
          ) : uploadDone ? (
            <button
              type="button"
              className="submit-button"
              onClick={handleViewAnalysis}
            >
              View Analysis
            </button>
          ) : (
            <button type="submit" className="submit-button">
              Analyze CV
            </button>
          )}
        </form>
      </div>

      <div className="upload-right">
        <div className="why-section">
          <h3>Why Use CV Screener & Analyst?</h3>
          <ul>
            <li>✔ Instantly get feedback on your resume</li>
            <li>✔ Improve your chances of landing interviews</li>
            <li>✔ Get AI-based suggestions for improvements</li>
            <li>✔ Completely free and private</li>
          </ul>
        </div>

        <img
          src="/man.jpg"
          alt="Resume Analysis Illustration"
          className="illustration"
        />

        <div className="testimonial">
          <blockquote>
            "This tool helped me land my dream job!"
          </blockquote>
          <cite>– Sarah M., Software Engineer</cite>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
