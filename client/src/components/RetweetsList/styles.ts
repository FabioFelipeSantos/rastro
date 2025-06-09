import styled from "styled-components";

export const RetweetsContainer = styled.div`
  border-left: 1px solid ${({ theme }) => theme.applyAlpha(theme.colors.border, 0.9)};
  margin-left: 24px;
  padding-left: 12px;
  margin-bottom: 16px;
`;

export const RetweetHeader = styled.div`
  padding: 8px 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.applyAlpha(theme.colors.primary, 0.7)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 8px;
`;

export const NoRetweetsMessage = styled.p`
  padding: 16px;
  color: ${({ theme }) => theme.applyAlpha(theme.colors.text, 0.4)};
  text-align: center;
`;
