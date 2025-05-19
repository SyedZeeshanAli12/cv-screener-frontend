// WhyUseSection.jsx
import React from "react";
import './WhyUseSections.css';

const WhyUseSection = () => {
  return (
    <div className="section why-section">
      <div className="why-text">
        <h3>Why Use CV Screener & Analyst?</h3>
        <ul>
          <li>🤖 AI-powered feedback tailored to your role</li>
          <li>🎯 Highlights missing keywords instantly</li>
          <li>✨ Improve your chances of landing interviews</li>
          <li>🔐 Completely free and private</li>
        </ul>
        <div className="testimonial">
          “This tool helped me land my dream job!”<br />
          – <strong>Sarah M., Software Engineer</strong>
        </div>
      </div>

      <div className="why-illustration">
        <img src="/assets/illustration.png" alt="CV analysis illustration" />
      </div>
    </div>
  );
};

export default WhyUseSection;
