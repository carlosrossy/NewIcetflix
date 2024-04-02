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

export const ContainerPhoto = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image.attrs({
  resizeMode: "cover",
})`
  height: 170px;
  width: 170px;
  border-radius: 100px;
`;


export const CameraButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.SECONDARY};
  align-items: center;
  border-radius: 100px;
  position: absolute;
  top: 120px;
  right: 100px;
  z-index: 1;
`;