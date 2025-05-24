import React, { useState } from "react";

const SummaryButton = ({ onSummarize }) => {
  const [status, setStatus] = useState("");

  const handleClick = async () => {
    setStatus("Summarizing...");
    try {
      await onSummarize();
      setStatus("Summary sent to Slack!");
    } catch (error) {
      setStatus("Failed to send summary.");
    }
    setTimeout(() => setStatus(""), 3000); // Clear status after 3 seconds
  };

  return (
    <div>
      <button onClick={handleClick}>Generate Summary</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default SummaryButton;
