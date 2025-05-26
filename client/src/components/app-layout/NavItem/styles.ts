import styled from "styled-components";

import { Link } from "react-router-dom";

type NavItemStyleProps = {
  $isActive?: boolean;
};

export const NavItemStyles = styled(Link)<NavItemStyleProps>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1.2)};
  margin-bottom: ${({ theme }) => theme.spacing(0.8)};
  border-radius: 9999px;
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.text)};
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  font-size: ${({ theme }) => theme.sizing(1.6)};
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  svg {
    margin-right: ${({ theme }) => theme.spacing(1.6)};
    width: 26px;
    height: 26px;
    fill: currentColor;
  }

  span {
    @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
      display: none;
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
    svg {
      margin-right: 0;
    }
  }
`;
