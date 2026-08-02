import React, { useState, useEffect } from "react";

export default function TextType({ text, speed = 15 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Reset when text changes
    setIndex(0);

    if (!text) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  const isTyping = index < text.length;

  return (
    <span
      style={{
        fontFamily: "var(--font-body)",
        position: "relative",
      }}
    >
      {text.slice(0, index)}

      {isTyping && (
        <span
          style={{
            display: "inline-block",
            width: "6px",
            height: "1em",
            backgroundColor: "var(--color-accent)",
            marginLeft: "4px",
            verticalAlign: "text-bottom",
            animation: "typeBlink 0.7s infinite",
          }}
        />
      )}

      <style>{`
        @keyframes typeBlink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}