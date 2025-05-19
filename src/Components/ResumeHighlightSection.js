// === ResumeHighlightSection.jsx ===
import React from "react";
import "./ResumeHighlightSection.css";

const ResumeHighlightSection = () => {
  return (
    <section className="resume-highlight-section">
      <div className="highlight-section">
  <div className="highlight-content">
    <h2 className="highlight-title">
      Make sure your resume stands out for the right reasons!
    </h2>
    <ul className="highlight-points">
      <li>
        <span className="highlight-check">✔</span> Eliminate embarrassing mistakes and typos
      </li>
      <li>
        <span className="highlight-check">✔</span> Sell yourself effectively by strengthening your content
      </li>
      <li>
        <span className="highlight-check">✔</span> Improve your design and create a visually appealing resume
      </li>
    </ul>
  </div>
  <div className="highlight-image-wrapper">
    <img
      src="/goodvsbad.jpg"
      alt="Better vs Poor Resume Examples"
      className="highlight-image"
    />
  </div>
</div>
    </section>
  );
};

export default ResumeHighlightSection;
