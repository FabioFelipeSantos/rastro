const API_URL = "http://localhost:8000/";

export const getImageUrl = (path: string): string => {
  if (!path) {
    return "https://placehold.co/100x100/CCCCCC/FFFFFF?text=?";
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  return `${API_URL}${cleanPath}`;
};
