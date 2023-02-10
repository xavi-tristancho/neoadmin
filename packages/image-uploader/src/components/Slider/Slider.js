import * as React from "react";
import styled from "styled-components";
import { Slider as MuiSlider } from "@mui/material";

const Slider = (props) => {
  return <StyledSlider defaultValue={0} {...props} />;
};
const StyledSlider = styled(MuiSlider)`
  && {
    margin: 0px 15px;
  }
`;

export default Slider;
