import styled from "styled-components/native";

import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const Container = styled.View`
  width: 100%;
  border-bottom-width: 0.8px;
  border-bottom-color: ${({ isErrored }) =>
    isErrored ? colors.red : "rgba(3, 1, 76, 0.2)"};
  margin-bottom: 32px;
  flex-direction: row;
  align-items: center;
`;

export const InputText = styled.TextInput`
  flex: 1;
  height: 50px;
  margin-right: 5px;
  font-size: 16px;
  font-family: ${fonts.openSans400};
  color: ${colors.blue800};
`;
