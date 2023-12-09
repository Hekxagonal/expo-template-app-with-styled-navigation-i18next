import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { TextProps as PaperTextProps } from "react-native-paper";

import * as S from "./styles";

export interface TextProps
  extends S.StyledTextProps,
    Omit<PaperTextProps, "theme" | "children"> {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export const Text = ({ children, style, ...props }: TextProps) => {
  return (
    <S.Text style={style} {...props}>
      {children}
    </S.Text>
  );
};
