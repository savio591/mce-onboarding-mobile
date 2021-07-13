import React from "react";

import { Container, InputText } from "./styles";

export function Input({ error = false, children, ...rest }) {
  return (
    <Container isErrored={error}>
      <InputText {...rest} />
      {children}
    </Container>
  );
}
