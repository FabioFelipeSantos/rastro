import styled from "styled-components";

type TextAreaStyleProps = {
  $isError: boolean;
  $isFromParent: boolean;
};

export const TextAreaStyles = styled.textarea<TextAreaStyleProps>`
  background-color: ${({ theme, $isError }) =>
    !$isError ? theme.colors.inputBackground : theme.applyAlpha(theme.colors.error, 0.1)};
  color: ${({ theme, $isError }) => (!$isError ? theme.colors.text : theme.colors.error)};
  border: 1px solid
    ${({ theme, $isError }) => (!$isError ? theme.colors.border : theme.applyAlpha(theme.colors.error, 0.8))};
  padding: ${({ theme }) => theme.spacing(1.5)};
  border-radius: ${({ theme }) => theme.spacing(0.5)};
  font-size: ${({ theme }) => theme.sizing(1.2)};
  font-weight: ${({ $isError }) => (!$isError ? "normal" : 700)};
  width: 100%;
  min-height: ${({ theme, $isFromParent }) => ($isFromParent ? theme.sizing(6) : "100px")};
  resize: vertical;
  font-family: ${({ theme }) => theme.fonts.main};

  &:focus {
    outline: none;
    border-color: ${({ theme, $isError }) => (!$isError ? theme.colors.primary : theme.colors.error)};
    box-shadow: 0 0 0 2px
      ${({ theme, $isError }) =>
        !$isError ? theme.applyAlpha(theme.colors.primary, 0.04) : theme.applyAlpha(theme.colors.error, 0.04)};
  }
`;
