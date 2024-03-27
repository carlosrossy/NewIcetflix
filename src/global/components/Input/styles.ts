import styled, { css } from "styled-components/native";

interface IContainerProps {
  isErrored?: boolean;
  width?: string;
  height?: string;
}

export const Container = styled.View<IContainerProps>`
  /* margin-top: 24px; */
  width: ${({ width }) => (width ? width : `100%`)};
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContentInput = styled.View<IContainerProps>`
  width: ${({ width }) => (width ? width : `100%`)};
  height: ${({ height }) => (height ? height : `60px`)};
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.SECONDARY};
  border: 1.2px solid ${({ theme }) => theme.colors.SECONDARY};
  border-radius: 16px;
  ${(props) =>
    props.isErrored &&
    css`
      border: 2px solid;
      border-color: ${({ theme }) => theme.colors.RED};
    `}
`;

export const TextInputNative = styled.TextInput.attrs((props) => ({
  placeholderTextColor: props.theme.colors.WHITE,
}))`
  flex: 1;
  height: 42px;
  color: ${({ theme }) => theme.colors.WHITE};
  font-size: 16px;
`;

export const Icon = styled.View<{ isErrored: boolean }>`
  margin: 0px 12px;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.isErrored &&
    css`
      color: ${({ theme }) => theme.colors.RED};
    `}
`;

export const ButtonEye = styled.TouchableOpacity<IContainerProps>`
  /* margin-top: 5px; */
  margin-right: 10px;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.isErrored &&
    css`
      color: ${({ theme }) => theme.colors.RED};
    `}
`;
