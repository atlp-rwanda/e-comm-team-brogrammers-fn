export const formatDate = (date) => {
  const dateObj = new Date(date);
  const options = { month: "numeric", day: "numeric", year: "numeric" };
  const readableDate = dateObj.toLocaleDateString("en-US", options);
  return readableDate;
};

//this capitalizes every first letter of a string separated with space
// ex: hello trojans  ====  Hello Trojans
export const formatString = (str) => {
  const words = str.split(" ");
  const newString = words.map((word) => word[0].toUpperCase() + word.substr(1));
  return newString.join(" ");
};

export const formatExpired = (bool) => {
  if (bool === true) {
    return "Expired";
  } else {
    return "Not expired";
  }
};
