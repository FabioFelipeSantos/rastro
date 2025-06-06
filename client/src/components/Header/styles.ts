import styled from "styled-components";
import { Button } from "../Button";

export const PageHeader = styled.div`
  padding: ${({ theme }) => `${theme.spacing(1.2)} ${theme.spacing(1.6)}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.sizing(1)};
  font-weight: bold;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.applyAlpha(theme.colors.background, 0.35)};
  backdrop-filter: blur(5px);
  z-index: 10;

  display: flex;
  justify-content: end;

  .toggle-button-container {
    margin: ${({ theme }) => `0 ${theme.spacing(2)}`};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.sizing(1.4)};
`;

export const HeaderLoginButton = styled(Button)`
  padding: ${({ theme }) => `0 ${theme.spacing(2.6)}`};
  font-size: ${({ theme }) => theme.sizing(1.4)};
  font-weight: 400;
`;
