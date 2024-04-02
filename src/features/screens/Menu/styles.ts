import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.TERTIARY};
  padding: 0px 24px;
`;

export const Button = styled.View`
  background-color: ${({ theme }) => theme.colors.SECONDARY};
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 200px;
`;

export const UserImage = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 200px;
`;

export const Info = styled.View`
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

export const ButtonBack = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.SECONDARY};
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

export const ButtonContainer = styled.View`
  margin-top: 10px;
`;

export const OptionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Options = styled.View`
  background-color: ${({ theme }) => theme.colors.SECONDARY};
  padding: 10px;
  border-radius: 20px;
`;