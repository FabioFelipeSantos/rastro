import styled from "styled-components";

export const PageHeader = styled.div`
  padding: ${({ theme }) => `${theme.spacing(1.2)} ${theme.spacing(1.6)}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => `${theme.spacing(1)}`};
  font-weight: bold;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.applyAlpha(theme.colors.background, 0.35)};
  backdrop-filter: blur(5px);
  z-index: 10;
`;
