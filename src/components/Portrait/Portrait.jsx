import { Image } from "primereact/image";
import { useState, useEffect } from "react";

const getInitials = (text = "") =>
  text
    .trim()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase())
    .join("");

const getRandomColour = () => {
  const colours = [
    "#0f172a",
    "#1e293b",
    "#334155",
    "#475569",
    "#7c2d12",
    "#9a3412",
    "#c2410c",
    "#ea580c",
    "#064e3b",
    "#065f46",
    "#047857",
    "#059669",
    "#1e3a8a",
    "#1d4ed8",
    "#2563eb",
    "#3b82f6",
  ];

  return colours[Math.floor(Math.random() * colours.length)];
};

const Portrait = ({ imageUrl, name }) => {
  const [hasError, setHasError] = useState(false);
  const [bgColour, setBgColour] = useState(getRandomColour);
  const initials = getInitials(name);

  useEffect(() => {
    if (imageUrl) {
      setHasError(false);
      return;
    }

    setBgColour(getRandomColour());
  }, [imageUrl, hasError]);

  return (
    <div className="w-[250px] h-[250px]">
      {imageUrl && !hasError ? (
        <Image
          src={imageUrl}
          alt={name}
          onError={() => setHasError(true)}
          className="w-full h-full rounded-full select-none"
        />
      ) : (
        <div
          aria-label={name}
          className="
            w-full h-full
            flex items-center justify-center
            text-white
            text-5xl font-semibold
            rounded-full
            select-none
          "
          style={{ backgroundColor: bgColour }}
        >
          {initials}
        </div>
      )}
    </div>
  );
};

export default Portrait;
