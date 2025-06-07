import styled from "styled-components";

export const EditProfileContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
`;

export const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  font-size: 1.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
`;

export const AvatarContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto ${({ theme }) => theme.spacing(3)} auto;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.colors.primary};
`;

export const EditIconContainer = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 36px;
  height: 36px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${({ theme }) => theme.applyAlpha(theme.colors.primary, 0.8)};
  }

  svg {
    color: white;
    font-size: 20px;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const FormSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const FormSectionTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.colors.primary};
`;

export const FormField = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing(1.5)};
  margin-top: ${({ theme }) => theme.spacing(3)};
`;
