import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.TERTIARY};
  padding: 0px 24px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const Info = styled.View`
  align-items: center;
`;

export const Buttons = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.SECONDARY};
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;


