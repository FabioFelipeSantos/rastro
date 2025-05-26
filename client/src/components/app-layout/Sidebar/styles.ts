import styled from "styled-components";

export const SidebarContainerStyles = styled.aside`
  width: ${({ theme }) => theme.spacing(28)};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing(1.6)};
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: ${({ theme }) => theme.spacing(8.8)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 70px;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(1)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;
