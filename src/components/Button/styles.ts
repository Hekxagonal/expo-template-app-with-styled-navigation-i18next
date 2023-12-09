import { Button as PaperButton } from "react-native-paper";
import styled from "styled-components/native";

interface ButtonProps {
  borderRadius?: string;
  margin?: string;
}

export const Button = styled(PaperButton)<ButtonProps>`
  height: 50px;
  margin: ${({ margin }) => margin || "20px 0 0 0"};
  border-radius: ${({ borderRadius }) => borderRadius || "10px"};
  padding: 0;
  justify-content: center;
`;
