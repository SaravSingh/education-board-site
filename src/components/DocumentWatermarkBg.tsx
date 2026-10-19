import React from "react";

interface DocumentWatermarkBgProps {
  opacity?: number;
  emblemOpacity?: number;
  showEmblem?: boolean;
}

export const DocumentWatermarkBg: React.FC<DocumentWatermarkBgProps> = ({
  opacity = 0.85,
  emblemOpacity = 0.08,
  showEmblem = true,
}) => {
  return (
    <>
      {/* Authentic Continuous Security Micro-Pattern Watermark (Vector SVG DOM element - renders in Print & PDF) */}
      <svg
        className="bhse-bg-watermark absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        style={{
          opacity,
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        }}
      >
        <defs>
          <pattern
            id="bhse-global-watermark-pattern"
            width="208"
            height="9"
            patternUnits="userSpaceOnUse"
          >
            <text
              x="0"
              y="7.4"
              fontFamily="'Arial', 'Helvetica Neue', Helvetica, sans-serif"
              fontSize="8"
              fontWeight="700"
              fill="#9bb2dd"
              textLength="208"
              lengthAdjust="spacingAndGlyphs"
            >
              BOARD OF HIGHER SECONDARY EDUCATION DELHI&#160;
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bhse-global-watermark-pattern)" />
      </svg>

      {/* CSS Pattern Fallback for html2canvas & export engines */}
      <div
        className="bhse-bg-watermark-bg absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: opacity * 0.9,
          backgroundImage:
            'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA4IiBoZWlnaHQ9IjkiIHZpZXdCb3g9IjAgMCAyMDggOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSIwIiB5PSI3LjQiIGZvbnQtZmFtaWx5PSInQXJpYWwnLCAnaGVsdmV0aWNhIE5ldWUnLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzliYjJkZCIgdGV4dExlbmd0aD0iMjA4IiBsZW5ndGhBZGp1c3Q9InNwYWNpbmdBbmRHbHlwaHMiPkJPQVJEIE9GIEhJR0hFUiBTRUNPTkRBUlkgRURVQ0FUSU9OIERFTEhJJiMxNjA7PC90ZXh0Pjwvc3ZnPg==")',
          backgroundRepeat: "repeat",
          backgroundSize: "208px 9px",
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
