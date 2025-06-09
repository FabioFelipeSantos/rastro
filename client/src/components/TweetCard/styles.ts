import styled from "styled-components";

export const TweetCardContainer = styled.article<{ $isRetweet?: boolean }>`
  padding: ${({ theme, $isRetweet }) =>
    $isRetweet ? `${theme.spacing(0.8)} ${theme.spacing(1.2)}` : `${theme.spacing(1.2)} ${theme.spacing(1.6)}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  transition: background-color 0.2s ease;
  font-size: ${({ $isRetweet, theme }) => ($isRetweet ? theme.sizing(0.9) : "inherit")};

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
  }
`;

export const TweetContent = styled.div`
  flex-grow: 1;
`;

export const TweetHeader = styled.div<{ $isRetweet?: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(0.4)};

  strong {
    margin-right: ${({ theme }) => theme.spacing(0.4)};
    font-size: ${({ $isRetweet, theme }) => ($isRetweet ? theme.sizing(1.4) : "inherit")};
  }
  span {
    margin-left: ${({ theme }) => theme.spacing(0.6)};
    color: ${({ theme }) => theme.colors.icon};
    font-size: ${({ $isRetweet, theme }) => ($isRetweet ? theme.sizing(1.3) : theme.sizing(1.4))};
  }
`;

type FollowContainerProps = {
  $isRetweet: boolean;
};

export const FollowContainer = styled.div<FollowContainerProps>`
  margin-left: ${({ theme }) => theme.spacing(1.4)};

  .follow-icon {
    font-size: ${({ theme, $isRetweet }) => ($isRetweet ? theme.sizing(1.8) : theme.sizing(2.2))};
  }
`;

export const TweetBody = styled.p<{ $isRetweet?: boolean }>`
  margin: 0 0 ${({ theme }) => theme.spacing(1.2)} 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: ${({ $isRetweet, theme }) => ($isRetweet ? theme.sizing(1.2) : "inherit")};
`;

export const TweetActions = styled.div<{ $isRetweet?: boolean }>`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.icon};
  width: 60%;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 70%;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 80%;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 96%;
  }
`;

type ActionButtonProps = {
  $isReacted: boolean;
  $isRetweetButton?: boolean;
  $hasExpanded?: boolean;
};

export const ActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: ${({ theme, $isReacted, $isRetweetButton, $hasExpanded }) => {
    if ($isRetweetButton && $hasExpanded) {
      return theme.colors.primary;
    }

    return $isReacted ? theme.colors.primary : theme.colors.text;
  }};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  font-size: 14px;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.applyAlpha(theme.colors.primary, 0.75)};
  }

  .icon {
    font-size: 18px;
    transform: ${({ $isReacted, $hasExpanded }) => ($isReacted || $hasExpanded ? "scale(1.2)" : "scale(1)")};
    transition: transform 0.2s ease;
  }
`;

export const RetweetExpandContainer = styled.div`
  margin-top: 8px;
`;
