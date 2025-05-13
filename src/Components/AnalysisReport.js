import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { useAnalysis } from "../Context/AnalysisContext";
import "./AnalysisReport.css";

function extractScore(text = "") {
  const frac = text.match(/([\d]+(?:\.\d+)?)\s*\/\s*10/);
  if (frac) return Math.min(Math.max(parseFloat(frac[1]) * 10, 0), 100);
  const m = text.match(/score\s*(?:of|:)?\s*([\d]+(?:\.\d+)?)/i);
  if (m) {
    const val = parseFloat(m[1]);
    return val <= 10
      ? Math.min(Math.max(val * 10, 0), 100)
      : Math.min(Math.max(val, 0), 100);
  }
  return 0;
}

const AnalysisReport = () => {
  const { analysisData } = useAnalysis();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const reportRef = useRef(null);

  useEffect(() => {
    if (!analysisData) navigate("/");
  }, [analysisData, navigate]);

  const rawText = analysisData?.analysis || analysisData?.text || "";
  const score   = analysisData?.score ?? extractScore(rawText);
  const lines   = rawText.split("\n").filter((l) => l.trim());

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    let fillColor =
      score >= 65 ? "#4caf50" :
      score >= 50 ? "#ffc107" :
      "#f44336";

    const centerTextPlugin = {
      id: "centerText",
      beforeDraw(chart) {
        const { width, height } = chart;
        const { ctx } = chart;
        ctx.save();
        ctx.font = `${(height / 100).toFixed(2)}em sans-serif`;
        ctx.textBaseline = "middle";
        ctx.fillStyle = fillColor;
        const txt = `${score}%`;
        ctx.fillText(
          txt,
          (width - ctx.measureText(txt).width) / 2,
          height / 2
        );
        ctx.restore();
      },
    };

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Score", "Remaining"],
        datasets: [{
          data: [score, 100 - score],
          backgroundColor: [fillColor, "#e0e0e0"],
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: { legend: { display: false } },
        animation: { duration: 600 },
      },
      plugins: [centerTextPlugin],
    });
  }, [score]);

  const handleDownloadPDF = () => {
    const btn = reportRef.current.querySelector(".download-btn");
    if (btn) btn.style.display = "none";

    const pdf    = new jsPDF("p", "pt", "a4");
    const margin = 40;
    const contentWidth = pdf.internal.pageSize.getWidth() - margin * 2;

    pdf.html(reportRef.current, {
      // To shift left, lower this X value:
      x: margin - 20,        // ← adjust this number to move the whole report left/right
      y: margin,
      html2canvas: { scale: 0.6, useCORS: true },
      width: contentWidth,
      callback: (doc) => {
        doc.save("analysis-report.pdf");
        if (btn) btn.style.display = "";
      },
    });
  };

  return (
    <div className="analysis-container" ref={reportRef}>
      <h2 className="analysis-title">AI Analysis Result</h2>

      <div className="chart-wrapper">
        <canvas ref={canvasRef} />
      </div>

      <div className="analysis-card">
        {lines.map((line, idx) => {
          if (/^[A-Z0-9].*:\s*$/.test(line.trim())) {
            return (
              <h3 key={idx} className="analysis-heading">
                {line.replace(/:$/, "").trim()}
              </h3>
            );
          }
          return (
            <p key={idx} className="analysis-line">
              {line.trim()}
            </p>
          );
        })}
      </div>

      <button className="download-btn" onClick={handleDownloadPDF}>
        Download as PDF
      </button>
    </div>
  );
};

export default AnalysisReport;
