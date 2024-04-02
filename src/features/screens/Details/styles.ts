import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.TERTIARY};
`;

export const MovieImage = styled.Image`
  width: 100%;
  height: 450px;
  border-radius: 6px;
  margin-right: 10px;
`;

export const Details = styled.View`
  background-color: ${({ theme }) => theme.colors.SECONDARY};
  /* border-radius: 48px; */
  margin-top: -170px;
  padding: 26px 20px;
  margin-bottom: 20px;
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
  padding: 8px 22px; 
  flex-direction: row;
  border-radius: 50px;
`;

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Star = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding: 5px 10px;
  justify-content: center;
  border-radius: 20px;
`;

export const Genre = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding: 5px 10px;
  justify-content: center;
  border-radius: 20px;
`;