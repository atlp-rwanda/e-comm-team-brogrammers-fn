import React from "react";
import { useNavigate } from "react-router-dom";

const BackArrow = (props) => {
  const { to } = props;
  const navigate = useNavigate();
  return (
    <i
      data-testid="back-arrow-1"
      className="fa fa-arrow-left fa-2xl text-secondary ease-in duration-500 absolute top-4 right-3 hover:text-primary hover:cursor-pointer"
      onClick={() => navigate(to)}
    ></i>
  );
};

export default BackArrow;
