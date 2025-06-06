import styled from "styled-components";

export const AppContainerStyles = styled.div`
  display: flex;
  max-width: 1320px;
  margin: 0 auto;
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    /* On smaller screens, allow full width */
  }
`;
