import styled from "styled-components";

export const TweetCardContainer = styled.article`
  padding: ${({ theme }) => theme.spacing(1.2)} ${({ theme }) => theme.spacing(1.6)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
  }
`;

export const TweetContent = styled.div`
  flex-grow: 1;
`;

export const TweetHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(0.4)};

  strong {
    margin-right: ${({ theme }) => theme.spacing(0.4)};
  }
  span {
    color: ${({ theme }) => theme.colors.icon};
    font-size: ${({ theme }) => theme.sizing(1.4)};
  }
`;

export const TweetBody = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing(1.2)} 0;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const TweetActions = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.icon};
  max-width: ${({ theme }) => theme.spacing(42.5)};
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.sizing(1.36)};
  padding: ${({ theme }) => theme.spacing(1.2)};
  border-radius: ${({ theme }) => theme.spacing(1.2)};

  svg {
    margin-right: ${({ theme }) => theme.spacing(1.2)};
    width: ${({ theme }) => theme.spacing(1.8)};
    height: ${({ theme }) => theme.spacing(1.8)};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.applyAlpha(theme.colors.primary, 0.2)};
  }
`;
