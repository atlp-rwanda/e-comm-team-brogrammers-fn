import React from "react";
import { formatString } from "../../helpers/Format";
const Categorize = (props) => {
  const { id, categories } = props;

  if (categories.length > 0) {
    const category = categories.find((cat) => {
      return cat.id === id;
    });
    console.log(category);
    if (category) {
      //   console.log(Object.keys(category));
      return <span>{formatString(category.name)}</span>;
    }
  } else {
    return <span>All</span>;
  }
};

export default Categorize;
