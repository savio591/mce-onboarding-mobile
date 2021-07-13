import styled from "styled-components/native";
import { Platform, StatusBar } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RectButton } from "react-native-gesture-handler";

import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const Container = styled.View`
  flex: 1;
  padding-top: ${Platform.OS === "android"
    ? `${StatusBar.currentHeight ?? 0 + 36}px`
    : `${getStatusBarHeight() + 36}px`};
  background-color: ${colors.background};
`;

export const Header = styled.View`
  height: 80px;
  padding: 0 18px;
`;

export const LogoutButton = styled(RectButton)`
  align-items: center;
  width: 60px;
`;

export const LogoutButtonText = styled.Text`
  font-family: ${fonts.poppins500};
  font-size: 16px;
`;

export const ProfileContent = styled.View`
  background-color: ${colors.white};
  height: 100%;
  margin-top: 200px;
  border-radius: 40px;
  align-items: center;
`;

export const ProfileContentImage = styled.Image`
  margin-top: -152px;
  width: 304px;
  height: 304px;
`;

export const ProfileUserContent = styled.View`
  flex: 1;
  padding: 0 60px;
`;

export const UserWelcomeText = styled.Text`
  margin-top: 40px;
  font-family: ${fonts.poppins600};
  font-size: 22px;
  color: ${colors.black};
  text-align: center;
`;

export const UserWelcomeSpanText = styled.Text`
  color: ${colors.purple};
`;

export const UserEmail = styled.Text`
  background-color: ${colors.purpleLight};
  border-radius: 5px;
  margin-top: 8px;
  padding: 3px 0;
  text-align: center;
  color: ${colors.purple};
  font-family: ${fonts.poppins400};
  font-size: 14px;
`;

export const EditProfileButton = styled(RectButton)`
  margin-top: 50px;
  background-color: ${colors.purpleLight};
  height: 55px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;

export const EditProfileButtonText = styled.Text`
  font-family: ${fonts.poppins600};
  font-size: 17px;
  color: ${colors.black};
`;
