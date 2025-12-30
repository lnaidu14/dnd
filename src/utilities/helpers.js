export const getInitials = (text = "") =>
  text
    .trim()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase())
    .join("");