import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.TERTIARY};
  padding: 0px 24px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.SECONDARY};
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

export const ContainerButton = styled.View`
  margin-top: 10px;
`;
