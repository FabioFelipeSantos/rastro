import styled from "styled-components";

export const MainContentContainer = styled.main`
  flex-grow: 1;
  max-width: ${({ theme }) => theme.spacing(60)};
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-right: none;
  }
`;
