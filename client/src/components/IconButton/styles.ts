import styled from "styled-components";

export const IconButtonStyles = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.icon};
  padding: ${({ theme }) => theme.spacing(0.8)};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: ${({ theme }) => theme.spacing(3.2)};
    height: ${({ theme }) => theme.spacing(3.2)};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
