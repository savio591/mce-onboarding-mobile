import React from "react";

import { Container, ButtonText } from "./styles";

export function Button({ children, ...rest }) {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
}
