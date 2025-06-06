import styled from "styled-components";

export const ProfileHeaderContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
export const ProfileBanner = styled.div`
  height: 200px;
  background-color: ${({ theme }) => theme.colors.secondary};
  background-image: url("https://placehold.co/600x200/1DA1F2/FFFFFF?text=Banner");
  background-size: cover;
  background-position: center;
`;
export const ProfileAvatarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;
export const ProfileAvatar = styled.img`
  width: 144px;
  height: 144px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.background};
  object-fit: cover;
`;
export const ProfileInfo = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  h2 {
    margin: 0 0 ${({ theme }) => theme.spacing(0.5)} 0;
    font-size: 1.5rem;
  }
  p {
    margin: 0 0 ${({ theme }) => theme.spacing(1)} 0;
    color: ${({ theme }) => theme.colors.icon};
  }
  p:last-of-type {
    margin-bottom: ${({ theme }) => theme.spacing(1.5)};
  }
`;
export const ProfileStats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  span {
    color: ${({ theme }) => theme.colors.icon};
    strong {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;
