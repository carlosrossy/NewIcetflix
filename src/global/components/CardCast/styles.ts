import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 20px;
  width: 175px; 
`;

export const CastImage = styled.Image.attrs({
  resizeMode: "cover",
})`
  width: 100%; 
  height: 160px;
  border-top-right-radius: 19px;
  border-top-left-radius: 19px;
`;

export const Info = styled.View`
  padding: 10px 10px;
`;