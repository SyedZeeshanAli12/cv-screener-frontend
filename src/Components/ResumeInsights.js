import React from "react";
import "./ResumeInsights.css";

const insights = [
  {
    icon: "✅",
    title: "Optimized for Recruiter Scans",
    description:
      "We ensure your resume includes the right skills, formatting, and layout to pass through ATS scans and recruiter skims efficiently.",
  },
  {
    icon: "🎨",
    title: "Visually Clean & Professional",
    description:
      "We detect poor visual hierarchy or clutter and help enhance your resume’s aesthetic with industry-proven layouts.",
  },
  {
    icon: "🔍",
    title: "Fix Grammar & Clarity Issues",
    description:
      "We check for typos, awkward phrasing, or unclear achievements — and suggest refined, crisp alternatives.",
  },
  {
    icon: "🧠",
    title: "Reduce Overused Buzzwords",
    description:
      "We highlight repetitive jargon or filler content and recommend strong action verbs to better reflect your accomplishments.",
  },
  {
    icon: "📉",
    title: "Avoid Weak or Vague Phrasing",
    description:
      "We flag vague terms like 'many' or 'responsible for' and suggest quantifiable, impactful alternatives.",
  },
];

const ResumeInsights = () => {
  return (
    <div className="resume-insights-full">
      <div className="insights-heading-wrapper">
        <div className="insights-heading">
          <h2>What Our Resume Analyzer Improves</h2>
          <p>
            Upload your resume and receive a clear, structured breakdown of what can be enhanced — <strong>fast, free, and smart</strong>.
          </p>
        </div>
      </div>

      <div className="insights-inner">
        <div className="insights-grid">
          {insights.map((item, idx) => (
            <div key={idx} className="insight-card">
              <div className="insight-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeInsights;
