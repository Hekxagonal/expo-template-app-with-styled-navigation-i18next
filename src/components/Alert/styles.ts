import { Dialog as PaperDialog, Paragraph } from "react-native-paper";
import styled from "styled-components/native";

export const Container = styled(PaperDialog)`
  border-radius: 10px;
`;

interface TitleProps {
  isRed?: boolean;
}

export const Title = styled(PaperDialog.Title)<TitleProps>`
  color: ${({ isRed }) => (isRed ? "#B82525" : "black")};
`;

export const ContentContainer = styled(PaperDialog.Content)``;

export const ButtonWrapper = styled(PaperDialog.Content)``;

export const Text = styled(Paragraph)`
  color: black;
`;
