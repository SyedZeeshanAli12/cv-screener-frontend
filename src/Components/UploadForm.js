import React, { useState } from "react";
import API from "../api";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useAnalysis } from "../Context/AnalysisContext";
import "../App.css";
import "./UploadForm.css";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { setAnalysisData } = useAnalysis();

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
    setUploadDone(false);
    setErrorMsg("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setUploadDone(false);
      setErrorMsg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMsg("Please select a resume file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setErrorMsg("");
    setUploading(true);

    try {
      const response = await API.post(
        "https://cv-screener-backend.onrender.com/api/resumes/upload",
        formData
      );
      const data = response.data.data;
      setAnalysisData(data);
      setUploadDone(true);
    } catch (err) {
      console.error("Upload Error:", err);
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

  return (
    <form onSubmit={handleSubmit} className="upload-form-container">
      <div
        className="drop-area"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p>
          📁 <strong>Drag & Drop your resume here or click to browse</strong>
        </p>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileSelect}
          className="hidden-input"
        />
      </div>

      {file && (
        <div className="file-preview">
          <p>📄 {file.name}</p>
          {uploading ? (
            <div className="uploading-status">
              <Circles height="24" width="24" color="#6a1b9a" />
              <span>Analysing...</span>
            </div>
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
        </div>
      )}

      {errorMsg && <div className="error-popup">{errorMsg}</div>}
    </form>
  );
};

export default UploadForm;
