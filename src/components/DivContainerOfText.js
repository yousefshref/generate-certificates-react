import React, { useEffect, useRef, useState } from "react";

const DivContainerOfText = ({ text, className }) => {
  const [fontSize, setFontSize] = useState("1.5vw");
  const containerRef = useRef(null);

  const adjustFontSize = () => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      // Adjust the multiplier to fit your needs
      const newFontSize = containerHeight * 0.5; // Adjust this multiplier as needed
      setFontSize(`${newFontSize}px`);
    }
  };

  useEffect(() => {
    adjustFontSize(); // Adjust font size on mount
    window.addEventListener("resize", adjustFontSize); // Adjust font size on resize

    return () => {
      window.removeEventListener("resize", adjustFontSize); // Clean up listener on unmount
    };
  }, []);
  return (
    <div ref={containerRef} className={className}>
      <p style={{ fontSize: fontSize }}>{text}</p>
    </div>
  );
};

export default DivContainerOfText;
