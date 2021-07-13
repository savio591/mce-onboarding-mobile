import styled from "styled-components/native";

import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 26px;
`;

export const Title = styled.Text`
  text-transform: uppercase;
  color: ${colors.blue800};
  font-family: ${fonts.openSans700};
  font-size: 36px;
  margin-bottom: 48px;
`;

export const ParagraphText = styled.Text`
  font-size: 14px;
  font-family: ${fonts.openSans400};
  color: ${colors.blue800};
  margin-top: 32px;
`;

export const ParagraphLinkText = styled.Text`
  color: ${colors.cyan};
`;
