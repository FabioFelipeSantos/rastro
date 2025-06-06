import styled from "styled-components";

type InputStyleProps = {
  $isError: boolean;
};

export const InputStyles = styled.input<InputStyleProps>`
  background-color: ${({ theme, $isError }) =>
    !$isError ? theme.colors.inputBackground : theme.applyAlpha(theme.colors.error, 0.1)};
  color: ${({ theme, $isError }) => (!$isError ? theme.colors.text : theme.colors.error)};
  border: ${({ theme, $isError }) =>
    !$isError ? `1px solid ${theme.colors.border}` : `1.5px solid ${theme.colors.error}`};
  padding: ${({ theme }) => theme.spacing(1.5)};
  border-radius: ${({ theme }) => theme.spacing(0.75)};
  font-size: 1.2rem;
  width: 100%;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.icon};
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, $isError }) => (!$isError ? theme.colors.primary : theme.colors.error)};
    box-shadow: 0 0 6px 4px
      ${({ theme, $isError }) => theme.applyAlpha(!$isError ? theme.colors.primary : theme.colors.error, 0.25)};
  }
`;
