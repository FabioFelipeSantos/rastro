import styled from "styled-components";

export const ModalExternalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalOverlay = styled(ModalExternalContainer)`
  z-index: 2000;
  width: 100%;
  background-color: ${({ theme }) => theme.applyAlpha(theme.colors.modalBackground, 0.85)};
`;

export const ModalContentContainer = styled.div`
  padding: ${({ theme }) => `${theme.spacing(2.4)} ${theme.spacing(3.2)}`};

  background-color: ${({ theme }) => theme.applyAlpha(theme.colors.cardBackground, 0.9)};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.spacing(1.6)};
  border: 2px solid ${({ theme }) => theme.applyAlpha(theme.colors.accent, 0.6)};
  box-shadow: 0 0 40px 40px ${({ theme }) => theme.applyAlpha(theme.colors.accent, 0.14)};
  width: 40%;

  display: flex;
  flex-direction: column;
  align-items: start;
  z-index: 9999;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 45%;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 60%;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 94%;
  }
`;

export const ModalTitle = styled.h2`
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing(0.6)};
  font-weight: 700;
  font-size: ${({ theme }) => theme.sizing(2.8)};
`;

export const ModalContent = styled.p`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(2.4)};
  padding: ${({ theme }) => `0 ${theme.spacing(0.6)} ${theme.spacing(1)} ${theme.spacing(2.4)}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ModalFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1.6)};

  align-self: end;
`;
