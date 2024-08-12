export const truncateText = (text, length) => {
  if (text.length <= length) {
    return text;
  } else {
    return text.slice(0, length) + "...";
  }
};
