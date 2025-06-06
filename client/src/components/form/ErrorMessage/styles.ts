import styled from "styled-components";

export const ErrorMessageStyles = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.error};
  font-weight: 500;
  font-size: ${({ theme }) => theme.sizing(1.4)};
  margin-top: ${({ theme }) => theme.spacing(0.4)};
  padding-left: ${({ theme }) => theme.spacing(0.8)};
`;
