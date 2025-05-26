import styled from "styled-components";

export const TextAreaStyles = styled.textarea`
  background-color: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing(1.5)};
  border-radius: ${({ theme }) => theme.spacing(0.5)};
  font-size: ${({ theme }) => theme.sizing(1.2)};
  width: 100%;
  min-height: 100px;
  resize: vertical;
  font-family: ${({ theme }) => theme.fonts.main};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.applyAlpha(theme.colors.primary, 0.04)};
  }
`;
