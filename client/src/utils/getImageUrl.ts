// URL base da API
const API_URL = "http://localhost:8000/";

export const getImageUrl = (path: string): string => {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  return `${API_URL}/${cleanPath}`;
};
