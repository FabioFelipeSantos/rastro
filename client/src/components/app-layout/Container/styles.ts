import styled from "styled-components";

export const ContainerStyles = styled.div`
  display: flex;
  max-width: ${({ theme }) => theme.spacing(132)};
  margin: 0 auto;
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    /* On smaller screens, allow full width */
  }
`;
