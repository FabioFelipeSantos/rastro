import styled from "styled-components";

export const TweetFormContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
`;

export const AvatarImageSmall = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  margin-right: ${({ theme }) => theme.spacing(1.5)};

  &:hover {
    cursor: pointer;
  }
`;

export const FormContent = styled.div`
  flex-grow: 1;

  & > form {
    display: flex;

    .text-area-container {
      width: 90%;
      margin-right: 8px;
    }
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-top: ${({ theme }) => theme.spacing(1.5)};
  width: 10%;
`;
