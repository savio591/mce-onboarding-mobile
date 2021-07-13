import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import * as Yup from "yup";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { useAuth } from "../../hooks/useAuth";

import { Container, Title, BackButtonText } from "./styles";
import { api } from "../../services/api";
import { Keyboard } from "react-native";

export function EditProfile() {
  const { user, updateUserData } = useAuth();

  const [email, setEmail] = useState(user?.email);
  const [nome, setNome] = useState(user?.nome);
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const navigation = useNavigation();

  async function handleUpdateUser() {
    try {
      setValidationErrors({});

      const schema = Yup.object().shape({
        nome: Yup.string()
          .required("Nome obrigatório")
          .min(3, "Nome muito curto"),
        email: Yup.string()
          .required("Email obrigatório")
          .email("O email precisa ser válido"),
        senha: Yup.string(),
        confirmarSenha: Yup.string()
          .when("senha", {
            is: (value) => !!value.length,
            then: Yup.string().required("Confirmação da senha é obrigatória"),
            otherwise: Yup.string(),
          })
          .oneOf(
            [Yup.ref("senha"), undefined],
            "As senhas precisam ser iguais"
          ),
      });

      let data = { nome, email, senha, confirmarSenha };

      await schema.validate(data, { abortEarly: false });

      if (senha === "") data = { nome, email };
      else data = { nome, email, senha };

      await api.put(`/users/${user?.id}`, data);

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Perfil atualizado!",
      });

      Keyboard.dismiss();
      setSenha("");
      setConfirmarSenha("");

      updateUserData(user?.id);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          setValidationErrors((state) => {
            return {
              ...state,
              [error.path || ""]: error.message,
            };
          });
        });

        return Toast.show({
          type: "error",
          text1: "Erro",
          text2: err.inner[0].message,
        });
      }

      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possivel atualizar o perfil",
      });
    }
  }

  return (
    <Container>
      <Title>Editar perfil</Title>

      <Input
        placeholder="E-mail"
        keyboardType="email-address"
        selectTextOnFocus
        textContentType="emailAddress"
        autoCapitalize="none"
        autoCompleteType="email"
        error={!!validationErrors["email"]}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Input
        placeholder="Nome"
        selectTextOnFocus
        textContentType="name"
        autoCapitalize="words"
        autoCompleteType="name"
        error={!!validationErrors["nome"]}
        value={nome}
        onChangeText={(text) => setNome(text)}
      />

      <Input
        placeholder="Senha"
        textContentType="password"
        selectTextOnFocus
        secureTextEntry={!showPassword}
        error={!!validationErrors["senha"]}
        value={senha}
        onChangeText={(text) => setSenha(text)}
      >
        <TouchableWithoutFeedback
          onPress={() => setShowPassword((state) => !state)}
        >
          {showPassword ? (
            <Ionicons name="eye-off" color="rgba(3, 1, 76, 0.2)" size={24} />
          ) : (
            <Ionicons name="eye" color="rgba(3, 1, 76, 0.2)" size={24} />
          )}
        </TouchableWithoutFeedback>
      </Input>

      <Input
        placeholder="Confirmar senha"
        textContentType="password"
        selectTextOnFocus
        secureTextEntry={!showPasswordConfirmation}
        error={!!validationErrors["confirmarSenha"]}
        value={confirmarSenha}
        onChangeText={(text) => setConfirmarSenha(text)}
      >
        <TouchableWithoutFeedback
          onPress={() => setShowPasswordConfirmation((state) => !state)}
        >
          {showPasswordConfirmation ? (
            <Ionicons name="eye-off" color="rgba(3, 1, 76, 0.2)" size={24} />
          ) : (
            <Ionicons name="eye" color="rgba(3, 1, 76, 0.2)" size={24} />
          )}
        </TouchableWithoutFeedback>
      </Input>

      <Button onPress={handleUpdateUser}>Salvar</Button>

      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <BackButtonText>Voltar</BackButtonText>
      </TouchableWithoutFeedback>
    </Container>
  );
}
