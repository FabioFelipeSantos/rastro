export const getHeader = (token: string, isFormData = false) => {
  if (isFormData) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
