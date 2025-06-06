import styled from "styled-components";

export const HomeContainer = styled.main`
  width: 92%;
  margin: 0 auto;
`;

export const CTAContainer = styled.div`
  width: 80%;
  margin: ${({ theme }) => `${theme.spacing(2.8)} auto 0`};
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.applyAlpha(theme.colors.accent, 0.07)};
  border: 1px solid ${({ theme }) => theme.applyAlpha(theme.colors.accent, 0.5)};
  border-radius: ${({ theme }) => theme.spacing(1.2)};
  box-shadow: 0 0 15px 20px ${({ theme }) => theme.applyAlpha(theme.colors.accent, 0.05)};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  gap: ${({ theme }) => theme.spacing(2)};

  & > div:first-child {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: start;
    flex-grow: 1;
    flex-shrink: 1;
  }

  .on-tablet {
    display: none;
    margin-bottom: ${({ theme }) => theme.spacing(2.8)};
    border-radius: ${({ theme }) => theme.spacing(1.2)};
  }

  img {
    width: 30%;
    max-width: 320px;
    height: auto;
    object-fit: contain;
    border-radius: ${({ theme }) => theme.spacing(1.2)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;

    flex-direction: column;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(1.5)}; // Menor padding no mobile

    .on-tablet {
      display: block;
      width: 30%;
    }

    img {
      display: none;
    }

    & > div:first-child {
      width: 100%; // Ocupa toda a largura
      align-items: center;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;

    .on-tablet {
      display: none;
    }
  }
`;

export const CTATitle = styled.h1`
  width: 65%;
  font-size: ${({ theme }) => theme.sizing(3.0)};
  font-weight: 700;
  line-height: 1.1;
  text-align: inherit;
  margin-bottom: ${({ theme }) => theme.spacing(1.8)};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.sizing(2.6)};
    width: 100%;
    text-align: center;
  }
`;

export const CTAContent = styled.p`
  width: 70%;
  font-size: ${({ theme }) => theme.sizing(1.7)};
  text-align: inherit;
  margin-bottom: ${({ theme }) => theme.spacing(4)};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.sizing(1.6)};
    text-align: center;
    width: 90%;
  }
`;

export const CTAButtonsContainer = styled.div`
  width: 85%;
  max-width: ${({ theme }) => theme.spacing(50)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 70%;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 90%;
  }
`;

export const CTASocialIcons = styled.div`
  width: auto;
  display: flex;
  flex-direction: row !important;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  box-sizing: border-box; // Adicionado

  a {
    display: inline-flex;
    color: ${({ theme }) => theme.colors.text};
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;
