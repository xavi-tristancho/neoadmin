import { Slider as MuiSlider, SliderProps, styled } from "@mui/material";

const Slider = (props: SliderProps) => {
  return <StyledSlider defaultValue={0} {...props} />;
};

export default Slider;

const StyledSlider = styled(MuiSlider)`
  && {
    margin: 0px 15px;
  }
`;
