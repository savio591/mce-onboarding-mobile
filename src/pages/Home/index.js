import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import { useAuth } from "../../hooks/useAuth";

import { colors } from "../../styles/colors";

import developerActivityImg from "../../assets/developer-activity.png";

import {
  Container,
  Header,
  LogoutButton,
  LogoutButtonText,
  ProfileContent,
  ProfileContentImage,
  ProfileUserContent,
  UserWelcomeText,
  UserWelcomeSpanText,
  UserEmail,
  EditProfileButton,
  EditProfileButtonText,
} from "./styles";

export function Home() {
  const { user, signOut } = useAuth();

  const navigation = useNavigation();

  async function handleLoggout() {
    try {
      await signOut();

      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possivel deslogar do app",
      });
    }
  }

  return (
    <Container>
      <Header>
        <LogoutButton onPress={handleLoggout}>
          <LogoutButtonText>Logout</LogoutButtonText>

          <Ionicons name="md-arrow-back" color={colors.blue500} size={25} />
        </LogoutButton>
      </Header>

      <ProfileContent>
        <ProfileContentImage source={developerActivityImg} />

        <ProfileUserContent>
          <UserWelcomeText>
            Bem vindo,{" "}
            <UserWelcomeSpanText>
              {user?.nome.split(" ")[0]}
            </UserWelcomeSpanText>
          </UserWelcomeText>

          <UserEmail>{user?.email}</UserEmail>

          <EditProfileButton onPress={() => navigation.navigate("EditProfile")}>
            <EditProfileButtonText>Editar perfil</EditProfileButtonText>
          </EditProfileButton>
        </ProfileUserContent>
      </ProfileContent>
    </Container>
  );
}
