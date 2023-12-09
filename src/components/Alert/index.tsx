import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  GestureHandlerRootView
} from "react-native-gesture-handler";
import { Portal } from "react-native-paper";

import * as S from "./styles";

import { Button } from "~components/Button";
import getErrorLabel from "~utils/getErrorLabel";

export interface AlertProps {
  visible?: boolean;
  onClose?: () => void;
  title?: string;
  text?: string | null;
  closeButtonText?: string | null;
  isError?: boolean;
  actions?: (props: any) => React.ReactNode;
}

export const Alert = ({
  visible,
  onClose = () => undefined,
  title,
  text,
  closeButtonText,
  isError,
  actions
}: AlertProps) => {
  const { i18n } = useTranslation();
  const [error] = React.useState(
    () => (isError ? getErrorLabel(i18n, text || "UNKNOWN_ERROR") : undefined)
    //getErrorLabel(t, !error && !text && !title ? "UNKNOWN_ERROR" : error)
  );

  return visible ? (
    <Portal>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <S.Container
          style={{ backgroundColor: "#f5f5f5" }}
          visible={visible}
          onDismiss={onClose}
        >
          <S.Title isRed={!!isError}>{error?.title || title}</S.Title>
          <S.ContentContainer>
            <ScrollView>
              <S.Text>{error?.msg || text}</S.Text>
            </ScrollView>
          </S.ContentContainer>
          <S.ButtonWrapper>
            {!!actions && actions({ close: onClose })}
            <Button
              mode="outlined"
              text={closeButtonText || t("actions.close")}
              textColor="black"
              onPress={() => {
                onClose();
              }}
            />
          </S.ButtonWrapper>
        </S.Container>
      </GestureHandlerRootView>
    </Portal>
  ) : undefined;
};
