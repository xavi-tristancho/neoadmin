import React, { forwardRef } from "react";
import styled from "styled-components";

type InputProps = {
  onChange: (file: File) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ onChange }, ref) => {
  const onLocalChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.files[0]);
  const resetInputValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    (e.target.value = "");

  return (
    <StyledInput
      type="file"
      onChange={onLocalChange}
      multiple={false}
      onClick={resetInputValue}
      ref={ref}
    />
  );
});
export default Input;

const StyledInput = styled.input`
  display: none;
`;
