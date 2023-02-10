import React from "react";
import styled from "styled-components";

const Input = React.forwardRef(({ onChange }, ref) => {
  const onLocalChange = (e) => onChange(e.target.files[0]);
  const resetInputValue = (e) => (e.target.value = "");

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

const StyledInput = styled.input`
  display: none;
`;
export default Input;
