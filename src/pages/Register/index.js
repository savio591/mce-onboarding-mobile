import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { validateCPF } from "validations-br";
import * as Yup from "yup";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { Container, Title, ParagraphText, ParagraphLinkText } from "./styles";

import { api } from "../../services/api";

export function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const navigation = useNavigation();

  async function handleSaveRegister() {
    try {
      setValidationErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required("Email obrigatório")
          .email("O email precisa ser válido"),
        nome: Yup.string().required("Nome obrigatório"),
        cpf: Yup.string()
          .required("CPF obrigatório")
          .test("isCpf", "CPF inválido", (value) => validateCPF(String(value))),
        senha: Yup.string()
          .required("Senha obrigatória")
          .min(6, "A senha precisa ter no mínimo 6 caracteres"),
        confirmarSenha: Yup.string().oneOf(
          [Yup.ref("senha"), null],
          "As senhas precisam ser iguais"
        ),
      });

      let data = { nome, email, cpf, senha, confirmarSenha };

      await schema.validate(data, { abortEarly: false });

      await api.post("/users", data);

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Cadastro realizado com sucesso",
      });

      navigation.goBack();
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
        text2: "Não foi possivel realizar o cadastro, tente novamente.",
      });
    }
  }

  return (
    <Container>
      <Title>Cadastre-se</Title>

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
        placeholder="CPF"
        keyboardType="numeric"
        selectTextOnFocus
        autoCapitalize="none"
        error={!!validationErrors["cpf"]}
        value={cpf}
        onChangeText={(text) => setCpf(text)}
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

      <Button onPress={handleSaveRegister}>Cadastrar</Button>

      <ParagraphText>
        Já possui uma conta?{" "}
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <ParagraphLinkText>Entrar</ParagraphLinkText>
        </TouchableWithoutFeedback>
      </ParagraphText>
    </Container>
  );
}
