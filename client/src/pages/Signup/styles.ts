import styled from "styled-components";

export const SignUpPageContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const LeftPanel = styled.div`
  max-height: 100vh;
  flex: 1;
  background: linear-gradient(
    to left,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.background}
  );
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: none;
    width: 100%;
    min-height: 250px;
    /* background: ${({ theme }) => theme.colors.primary}; */
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing(3)};
    background: linear-gradient(${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.background});
  }
`;

export const BenefitsTextContainer = styled.div`
  max-width: 450px;
  padding: ${({ theme }) => theme.sizing(2.8)};
  background-color: ${({ theme }) => theme.applyAlpha(theme.colors.background, 0.5)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizing(1.2)};
  box-shadow: 0 0 20px 5px ${({ theme }) => theme.applyAlpha(theme.colors.success, 0.2)};

  h2 {
    font-size: ${({ theme }) => theme.sizing(3.2)};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
  ul {
    list-style: disc;
    padding-left: ${({ theme }) => theme.spacing(2.5)};
    li {
      margin-bottom: ${({ theme }) => theme.spacing(1)};
      font-size: ${({ theme }) => theme.sizing(1.7)};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    text-align: center;
    h2 {
      font-size: ${({ theme }) => theme.sizing(2.4)};
    }
    ul li {
      font-size: ${({ theme }) => theme.sizing(1.6)};
    }
  }
`;

export const RightPanel = styled.div`
  max-height: 100vh;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 1;
    padding: ${({ theme }) => theme.spacing(2)};
  }
`;

export const SignUpFormContainer = styled.div`
  width: 100%;
  max-width: 450px;
  max-height: 90vh;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.spacing(1)};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  h1 {
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing(3)};
    font-size: ${({ theme }) => theme.sizing(2.8)};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hsl(0, 0%, 0%, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  border-radius: ${({ theme }) => theme.spacing(1)};
`;

export const Spinner = styled.div`
  border: 5px solid ${({ theme }) => theme.colors.secondary};
  border-left-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const BackButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: ${({ theme }) => theme.spacing(2)};
    width: auto;
  }
`;

export const FormField = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  label {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing(0.5)};
    font-weight: 500;
    font-size: ${({ theme }) => theme.sizing(1.4)};

    span {
      margin-left: ${({ theme }) => theme.spacing(0.8)};
      opacity: 0.4;
      font-style: italic;
    }
  }
`;
