import { Text as PaperText, Modal as PaperModal } from "react-native-paper";
import styled from "styled-components/native";

export const Container = styled(PaperModal)`
  align-items: center;
`;

export const ContentContainer = styled.View`
  background: white;
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

export const Text = styled(PaperText)`
  color: black;
  margin-top: 20px;
`;
