import { useEffect, useRef } from "react";

export const NewsletterForm = () => {
  const formRef = useRef(null);

  useEffect(() => {
    // 1. Safety Check: If the div already has content, don't add it again
    if (!formRef.current || formRef.current.innerHTML !== "") return;

    const script = document.createElement("script");
    script.src = "https://glomespace.kit.com/af259a2af5/index.js";
    script.async = true;
    script.setAttribute("data-uid", "af259a2af5");

    formRef.current.appendChild(script);

    // 2. The Cleanup is CRITICAL
    return () => {
      if (formRef.current) {
        formRef.current.innerHTML = ""; // This wipes the form when you leave the page
      }
      // Optional: Remove the script tag from the DOM entirely
      script.remove();
    };
  }, []);

  return (
    <div ref={formRef} id="kit-form-container" className="">
      {/* Form injects here */}
    </div>
  );
};
