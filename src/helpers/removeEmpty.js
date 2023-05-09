export default function removeEmpty(obj) {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key]) newObj[key] = obj[key];
  });
  return newObj;
}
