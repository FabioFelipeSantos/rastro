export const getImageUrl = (path: string): string => {
  if (!path) {
    return "https://placehold.co/100x100/CCCCCC/FFFFFF?text=?";
  } else {
    // if (path.startsWith("http://") || path.startsWith("https://")) {
    // }
    return path;
  }
};
