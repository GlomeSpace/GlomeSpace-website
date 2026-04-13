import React, { useEffect } from "react";

const CalendlyWidget = () => {
  useEffect(() => {
    const container = document.getElementById("calendly-embed");

    if (window.Calendly && container) {
      container.innerHTML = "";

      window.Calendly.initInlineWidget({
        url: "https://calendly.com/arihoseth18",
        parentElement: container,
        prefill: {},
        utm: {},
      });
    }
  }, []);

  return (
    <div
      id="calendly-embed"
      className="calendly-inline-widget"
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
};

export default CalendlyWidget;
