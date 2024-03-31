import styled from "styled-components/native";
import Checkbox from "expo-checkbox";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.TERTIARY};
  padding: 0px 24px;
  justify-content: space-between;
`;

export const Form = styled.View``;

export const ContainerButtons = styled.View`
  min-width: 300px;
  max-width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
  align-self: center;
  align-items: center;
`;

export const CheckBoxContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export const CheckBox = styled(Checkbox)`
  width: 16px;
  height: 16px;
  border: #5b5b58;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 5px;
`;

export const TextRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* margin-left: 5px; */
`;

export const Footer = styled.View`
  margin-bottom: 40px;
`;
