import React, { createContext, useState, useContext, useEffect } from "react";

const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [analysisData, setAnalysisData] = useState(() => {
    const stored = localStorage.getItem("analysisData");
    return stored ? JSON.parse(stored) : null;
  });

  // persist so page-reload still works
  useEffect(() => {
    if (analysisData) {
      localStorage.setItem("analysisData", JSON.stringify(analysisData));
    }
  }, [analysisData]);

  return (
    <AnalysisContext.Provider value={{ analysisData, setAnalysisData }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);
