import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.purple};
  border-radius: 8px;
`;

export const ButtonText = styled.Text`
  text-transform: uppercase;
  font-family: ${fonts.openSans600};
  color: ${colors.white};
  font-size: 16px;
`;
