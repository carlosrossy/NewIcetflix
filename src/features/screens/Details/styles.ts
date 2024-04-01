import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.TERTIARY};
  /* padding: 0px 24px; */
`;

export const MovieImage = styled.Image`
  width: 100%;
  height: 600px;
  border-radius: 6px;
  margin-right: 10px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
`;

export const Details = styled.View`
  position: absolute;
  top: 50%;
  left: 24px;
  right: 24px;
  background-color: ${({ theme }) => theme.colors.SECONDARY};
  border-radius: 48px;
  margin-top: -270px;
  padding: 26px 20px;
`;

export const Buttons = styled.View`
  position: absolute;
  top: 20px;
  left: 24px;
  right: 24px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;


export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.SECONDARY};
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

export const CastImage = styled.Image`
  width: 76px;
  height: 76px;
  border-radius: 100px;
`;

export const ActorContainer = styled.View`
  margin-right: 15px;
  align-items: center;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ButtonTeaser = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #1F1F1F;
  padding: 8px 12px; 
  flex-direction: row;
  width: 180px;
  border-radius: 50px;
`;