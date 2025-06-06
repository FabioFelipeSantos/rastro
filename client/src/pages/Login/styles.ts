import styled from "styled-components";

export const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2)};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background},
    ${({ theme }) => theme.colors.primary}33
  );
  position: relative;
`;

export const LoginLogoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100vh;

  & > img {
    max-height: 100vh;
    width: 100%;
    object-fit: contain;
  }
`;

export const LoginCardStyled = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.spacing(2)};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  text-align: center;
  position: relative;
  z-index: 1;

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing(2.4)};
  }

  & > button {
    margin-top: ${({ theme }) => theme.spacing(1.6)};
  }

  & > p {
    margin-top: ${({ theme }) => theme.spacing(2.4)};
    font-size: ${({ theme }) => theme.sizing(1.4)};

    & > a {
      font-weight: 700;
    }
  }
`;

export const UserIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing(3)} auto;
  color: ${({ theme }) => theme.colors.primary};
  border: 3px solid ${({ theme }) => theme.colors.primary};
`;
