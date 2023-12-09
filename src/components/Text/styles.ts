import { Text as PaperText } from "react-native-paper";
import styled from "styled-components/native";

export interface StyledTextProps {
  color?: string;
  weight?: "light" | "medium" | "regular" | "semibold" | "thin";
  size?: string;
  spacing?: string;
}

export const Text = styled(PaperText)<StyledTextProps>`
  ${({ color }) => (color ? `color:${color};` : "")}
  font-family: Montserrat-${({ weight }) => weight || "regular"};
  ${({ size }) => (size ? `font-size:${size};` : "")}
  ${({ spacing }) => (spacing ? `letter-spacing:${spacing};` : "")}
  margin: 4px 0px 8px 0px;
`;
