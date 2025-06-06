import styled from "styled-components";

export const MobileBottomNav = styled.nav`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 100;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 56px;
  }
  a {
    color: ${({ theme }) => theme.colors.icon};
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing(0.5)} 0;
    &.active {
      color: ${({ theme }) => theme.colors.primary};
    }
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;
