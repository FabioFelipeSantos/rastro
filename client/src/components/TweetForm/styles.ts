import styled from "styled-components";

export const TweetFormContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
`;
