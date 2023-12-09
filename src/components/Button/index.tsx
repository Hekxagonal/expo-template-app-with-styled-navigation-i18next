import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { ButtonProps as PaperButtonProps } from "react-native-paper";

import * as S from "./styles";

import { Text, TextProps } from "~components/Text";

export interface ButtonProps
  extends Omit<PaperButtonProps, "theme" | "children"> {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  compact?: boolean;
  loading?: boolean;
  borderRadius?: string;
  margin?: string;
  textProps?: TextProps;
  text?: string | null;
  extraIcon?: boolean;
}

export const Button = ({ text, textProps, ...props }: ButtonProps) => {
  return (
    <S.Button {...props}>
      <Text
        {...textProps}
        color={props.textColor || textProps?.color || "white"}
      >
        {text}
      </Text>
    </S.Button>
  );
};
