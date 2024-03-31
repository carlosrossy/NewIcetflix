import styled from "styled-components/native";
import Checkbox from "expo-checkbox";

interface Itype {
  top?: number;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.TERTIARY};
  padding: 0px 24px;
  justify-content: space-between;
`;

export const Header = styled.View<Itype>`
  top: ${({ top }) => top};
  /* padding: 0px 23px; */
  flex-direction: row;
  align-items: center;
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

export const ContainerPhoto = styled.TouchableOpacity`
  width: 170px;
  height: 170px;
  border: 1px solid ${({ theme }) => theme.colors.PRIMARY};
  background-color: ${({ theme }) => theme.colors.SECONDARY};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const Image = styled.Image.attrs({
  resizeMode: "cover",
})`
  height: 170px;
  width: 170px;
  border-radius: 8px;
`;

export const View = styled.View`
  align-items: center;
  justify-content: center;
`;

