import styled from "styled-components";

export const HomeContainer = styled.main`
  width: 92%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CTAContainer = styled.div`
  width: 80%;
  margin: ${({ theme }) => `${theme.spacing(6.4)} auto 0`};
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

    & > svg {
      font-size: 24px;

      @media screen and (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
        font-size: 22px;
      }
      @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: 20px;
      }
      @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 16px;
      }
    }
  }
`;

export const CardsContainer = styled.ul`
  width: 96%;
  margin-top: ${({ theme }) => theme.spacing(12)};
  margin-bottom: ${({ theme }) => theme.spacing(8)};

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: ${({ theme }) => theme.spacing(2.2)};
  column-gap: ${({ theme }) => theme.spacing(2.4)};

  & > li {
    background-color: ${({ theme }) => theme.colors.cardBackground};
    padding: ${({ theme }) => theme.spacing(2.8)};
    border-radius: ${({ theme }) => theme.spacing(2.2)};

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(0.8)};

    .card-icon {
      font-size: ${({ theme }) => theme.sizing(6.4)};
      background-color: ${({ theme }) => theme.applyAlpha(theme.colors.success, 0.1)};
      padding: ${({ theme }) => theme.spacing(1.2)};
      border-radius: 50%;
      transition: all 0.2s ease;
    }

    & > h3 {
      font-size: ${({ theme }) => theme.sizing(2.1)};
      text-decoration: underline;
      text-decoration-color: ${({ theme }) => theme.applyAlpha(theme.colors.text, 0.5)};
      text-underline-offset: 6px;
    }

    & > p {
      width: 80%;
      text-align: center;
      margin-top: ${({ theme }) => theme.spacing(1.2)};
    }

    &:hover {
      .card-icon {
        background-color: ${({ theme }) => theme.applyAlpha(theme.colors.success, 0.25)};
      }
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 60%;
    grid-template-columns: repeat(1, 1fr);
    align-items: center;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 80%;
    grid-template-columns: repeat(1, 1fr);
    align-items: center;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 90%;
    grid-template-columns: repeat(1, 1fr);
    align-items: center;
  }
`;

export const AnotherCTA = styled.div`
  width: 100vw;
  height: 240px;
  background-color: ${({ theme }) => theme.applyAlpha(theme.colors.primary, 0.7)};
`;

export const AnotherCTAContentContainer = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;

  h2 {
    font-size: 32px;
    text-align: center;
  }

  .another-cta-button {
    width: 40%;
    max-width: 380px;
    padding: 24px;
    font-size: 18px;
  }

  .cta-link {
    color: ${({ theme }) => theme.colors.text};
    font-style: italic;

    &:hover {
      cursor: pointer;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    h2 {
      font-size: 28px;
    }

    .another-cta-button {
      width: 60%;
      font-size: 16px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    h2 {
      font-size: 24px;
    }

    .another-cta-button {
      width: 80%;
      font-size: 15px;
    }
  }
`;

export const HomeFooter = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 112px;
  width: 100%;
  height: 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  & > ul {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  .footer-time {
    font-size: 14px;
  }
`;
