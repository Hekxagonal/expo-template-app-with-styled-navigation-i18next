import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Portal } from "react-native-paper";

import * as S from "./styles";

interface LoadingProps {
  label?: string;
  visible?: boolean;
}

export const Loading = ({ label, visible }: LoadingProps) => {
  const { t } = useTranslation();

  return (
    <Portal>
      <S.Container visible={!!visible} dismissable={false}>
        <S.ContentContainer>
          <ActivityIndicator size="large" />
          <S.Text>{label || t("common.loading")}</S.Text>
        </S.ContentContainer>
      </S.Container>
    </Portal>
  );
};
