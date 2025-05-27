import styled from "styled-components";

export const WidgetsContainerStyles = styled.aside`
  width: ${({ theme }) => theme.spacing(35.2)};
  padding: ${({ theme }) => theme.spacing(1.6)};
  position: sticky;
  top: 0;
  height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;

export const WidgetBox = styled.div`
  background-color: ${({ theme }) => theme.colors.widgetBackground};
  border-radius: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  h3 {
    margin-top: 0;
    font-size: 1.1rem;
  }
`;
