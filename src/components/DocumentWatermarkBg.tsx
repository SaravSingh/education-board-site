import React from "react";

interface DocumentWatermarkBgProps {
  opacity?: number;
  emblemOpacity?: number;
  showEmblem?: boolean;
}

export const DocumentWatermarkBg: React.FC<DocumentWatermarkBgProps> = ({
  opacity = 0.16,
  emblemOpacity = 0.05,
  showEmblem = true,
}) => {
  return (
    <>
      {/* Authentic Continuous Security Micro-Pattern Watermark */}
      <div
        className="bhse-bg-watermark-bg absolute inset-0 pointer-events-none z-0"
        style={{
          opacity,
          backgroundImage:
            'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA4IiBoZWlnaHQ9IjEwIiB2aWV3Qm94PSIwIDAgMjA4IDEwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjAiIHk9IjcuNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzNiODJmNiIgbGV0dGVyLXNwYWNpbmc9IjAuM3B4Ij5CT0FSRCBPRiBISUdIRVIgU0VDT05EQVJZIEVEVUNBVElPTiBERUxISSYjMTYwOzwvdGV4dD48L3N2Zz4=")',
          backgroundRepeat: "repeat",
          backgroundSize: "208px 10px",
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        }}
      />

      {/* Central Large Emblem Watermark */}
      {showEmblem && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          style={{ opacity: emblemOpacity }}
        >
          <img
            src="/bhse_emblem_blue.png"
            alt="Board Emblem Watermark"
            className="w-80 h-80 object-contain"
          />
        </div>
      )}
    </>
  );
};

