import styled, { css } from "styled-components/native";

export const Container = styled.Modal`
  flex: 1;
`;

export const Main = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 24px;
`;

export const Background = styled.View`
  width: 100%;
  min-height: 52px;

  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const bar = styled.View`
  height: 8px;
  width: 62px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.GRAY};
  opacity: 0.4;
`;

export const ButtonContainer = styled.View`

`;
