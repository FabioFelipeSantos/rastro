import styled from "styled-components";
import { Button } from "../Button";
import { IconButton } from "../IconButton";

export const PageHeader = styled.div`
  width: 100%;
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
  justify-content: space-between;

  .toggle-button-container {
    margin: ${({ theme }) => `0 ${theme.spacing(2)}`};

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      margin: 16px 0;
    }
  }
`;

type HeaderContentContainerProps = {
  $isBurgerMenu: boolean;
};

export const HeaderContentContainer = styled.div<HeaderContentContainerProps>`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  transition: all 0.2s ease;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: fit-content;
    display: ${({ $isBurgerMenu }) => ($isBurgerMenu ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    right: 0;
    top: 110%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.applyAlpha(theme.colors.cardBackground, 0.98)};
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.sizing(1.4)};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: ${({ theme }) => theme.spacing(1.4)};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const HeaderLoginButton = styled(Button)`
  padding: ${({ theme }) => `4px ${theme.spacing(2.6)}`};
  font-size: ${({ theme }) => theme.sizing(1.4)};
  font-weight: 400;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
  }
`;

export const LogoContainer = styled.div`
  max-width: 120px;
  width: 100%;

  & > img {
    width: 90%;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const BurgerMenuContainer = styled.div`
  position: relative;
  width: 100%;
  display: none;
  justify-content: end;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
  }
`;

export const BurgerMenuStyles = styled(IconButton)`
  background-color: ${({ theme }) => theme.applyAlpha(theme.colors.primary, 0.1)};
  padding: 6px;
`;
