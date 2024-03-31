import styled, { css } from "styled-components/native";
import { IButtonType } from ".";
import { scale } from "react-native-size-matters";

interface IType {
  type?: IButtonType;
  width?: number;
  opacity?: number;
}

const typePrimary = css`
  background-color: ${({ theme }) => theme.colors.PRIMARY};
`;

export const Container = styled.TouchableOpacity<IType>`
  width: ${({ width }) => (width ? `${width}px` : `100%`)};
  height: ${scale(49)}px;
  opacity: ${({ opacity }) => opacity};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-radius: 8px;
  ${({ type }) => type === "primary" && typePrimary};
`;