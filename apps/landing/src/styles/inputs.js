import styled from 'styled-components';

export const Checkbox = styled.div`
  border: 2px solid #aeaeae;
  box-sizing: border-box;

  min-height: 20px;
  min-width: 20px;
  max-height: 20px;
  max-width: 20px;
  height: 100%;
  width: 100%;
  margin-right: 0.5rem;

  ${({ checked }) =>
    checked && 'border: 2px solid #606200; background:  #f4f900;'}

  &:hover {
    opacity: 0.5;
  }
`;

export const Radio = styled(Checkbox)`
  border-radius: 50%;
`;

export const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  height: 20px;
  width: 26px;

  position: absolute;
  top: -3px;
  left: -4px;
  cursor: pointer;
  opacity: 0;
`;

export const RadioInput = styled.input.attrs({ type: 'radio' })`
  height: 20px;
  width: 26px;

  position: absolute;
  top: -3px;
  left: -5px;
  cursor: pointer;
  opacity: 0;
`;

export const TextInput = styled.input.attrs({ type: 'text' })`
  width: 100%;
  font-size: 16px;
  font-family: Silka;
  background: transparent;
  color: #aeaeae;
  border: 2px solid #aeaeae;
  padding: 0.4rem 0.6rem;
  font-weight: 600;
  height: 50px;

  ${({ showTextInput }) =>
    showTextInput ? 'visibility: visible;' : 'display: none'}
`;

export const TextareaInput = styled(TextInput).attrs({
  as: 'textarea',
})`
  height: 100px;
  resize: none;
`;
