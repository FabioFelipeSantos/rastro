import styled from "styled-components";

type ButtonProps = {
  $primary: boolean;
  $fullWidth: boolean;
  $variant: "default" | "outline";
};

export const ButtonStyle = styled.button<ButtonProps>`
  background-color: ${({ theme, $primary, $variant }) =>
    $variant === "outline" ? "transparent" : $primary ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme, $primary, $variant }) =>
    $variant === "outline" ? theme.colors.primary : $primary ? theme.colors.buttonText : theme.colors.text};
  border: 1px solid
    ${({ theme, $primary, $variant }) =>
      $variant === "outline" ? theme.colors.primary : $primary ? theme.colors.primary : theme.colors.border};
  padding: ${({ theme }) => `${theme.spacing(1.2)} ${theme.spacing(2.4)}`};
  border-radius: 9999px;
  font-size: ${({ theme }) => theme.sizing(1.4)};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  &:hover {
    opacity: 0.9;
    background-color: ${({ theme, $primary, $variant }) =>
      $variant === "outline"
        ? `${theme.colors.primary}1A`
        : $primary
          ? theme.colors.primary
          : theme.colors.hoverBackground};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
