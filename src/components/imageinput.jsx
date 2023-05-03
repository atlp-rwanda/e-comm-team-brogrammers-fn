import React, { useCallback } from 'react';

function ImageInput({ onChange }) {
  const clearFileInput = useCallback((ctrl) => {
    try {
      ctrl.value = null;
    } catch (ex) {
      /* empty */
    }
    if (ctrl.value) {
      ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
    }
  }, []);

  return (
    <label htmlFor="file" className="back-angular">
      <svg
        width="96"
        height="64"
        viewBox="0 0 96 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M77.4 24.16C74.68 10.36 62.56 0 48 0C36.44 0 26.4 6.56 21.4 16.16C9.36 17.44 0 27.64 0 40C0 53.24 10.76 64 24 64H76C87.04 64 96 55.04 96 44C96 33.44 87.8 24.88 77.4 24.16ZM76 56H24C15.16 56 8 48.84 8 40C8 31.8 14.12 24.96 22.24 24.12L26.52 23.68L28.52 19.88C32.32 12.56 39.76 8 48 8C58.48 8 67.52 15.44 69.56 25.72L70.76 31.72L76.88 32.16C83.12 32.56 88 37.8 88 44C88 50.6 82.6 56 76 56ZM32 36H42.2V48H53.8V36H64L48 20L32 36Z"
          fill="#888888"
        />
      </svg>
      <span>
        Click here to
        <br />
        Upload product image
      </span>
      <input
        type="file"
        id="file"
        multiple
        onChange={async (e) => {
          await onChange(e);
          clearFileInput(e.target);
        }}
        data-testid="file-uploader"
      />
    </label>
  );
}

export default ImageInput;
