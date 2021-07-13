import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { Container, Title, ParagraphText, ParagraphLinkText } from "./styles";

export function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  async function handleRecover() {
    try {
      setValidationErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required("Email obrigatório")
          .email("O email precisa ser válido"),
      });

      const data = { email };

      await schema.validate(data, { abortEarly: false });

      recover(data);

      Toast.show({
        type: "success",
        text1: "Verifique o seu email com o token de acesso!",
      });

      navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          setValidationErrors((state) => {
            return { ...state, [error.path || ""]: error.message };
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
        text2: "Não foi possivel criar token de acesso.",
      });
    }
  }

  return (
    <Container>
      <Title>Esqueci minha senha</Title>

      <Input
        placeholder="E-mail"
        keyboardType="email-address"
        selectTextOnFocus
        textContentType="emailAddress"
        autoCapitalize="none"
        autoCompleteType="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Button onPress={handleRecover}>Enviar código</Button>

      <ParagraphText>
        Já possui uma conta?{" "}
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <ParagraphLinkText>Entrar</ParagraphLinkText>
        </TouchableWithoutFeedback>
      </ParagraphText>
    </Container>
  );
}
