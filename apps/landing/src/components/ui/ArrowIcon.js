import styled from 'styled-components';
import Arrow from 'public/icons/arrow.svg';

const ArrowIcon = styled(Arrow)`
  fill: ${({ color = '#1c1c1c' }) => color};
`;

const BackArrowIcon = styled(ArrowIcon)`
  transform: rotate(180deg);
  fill: #aeaeae;
`;

export default { ArrowIcon, BackArrowIcon };
