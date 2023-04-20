import React from "react";

function Spinner() {
  return (
    <span
      type="button"
      className="flex w-full items-center justify-center h-screen"
    >
      <svg className="animate-spin h-8 w-8 mr-3 ..." viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="#5f3e8e"
          fill="white"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="white"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <p className="text-primary font-semibold text-xl">Loading...</p>
    </span>
  );
}

export default Spinner;
