import { AxiosError } from "axios";
import React, { useContext, useMemo, createContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { Alert, AlertProps } from "~components/Alert";

export interface IAlertContext {
  error: (error: string, props?: Omit<AlertProps, "isOpen">) => () => void;
  notify: (props: Omit<AlertProps, "isOpen">) => () => void;
  apiError: (
    e: AxiosError<{ erros: string[] }>,
    props?: Omit<AlertProps, "isOpen">
  ) => void;
  visible: boolean;
}

const AlertContext = createContext<IAlertContext>({} as IAlertContext);

interface AlertProviderProps {
  children: any;
}

interface AlertState {
  visible: boolean;
  isError: boolean;
  props?: Omit<AlertProps, "isOpen">;
}

const defaultAlertState: AlertState = {
  visible: false,
  isError: false
};

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alertState, setAlertState] = useState<AlertState>(defaultAlertState);

  const { t } = useTranslation();

  const closeAlertPopup = () => {
    setAlertState(defaultAlertState);
  };

  const error: IAlertContext["error"] = (error, props = {}) => {
    console.log("error", error);
    if (!error) return closeAlertPopup;
    setAlertState({
      visible: true,
      isError: true,
      props: {
        closeButtonText: t("actions.try_again"),
        text: error,
        ...props
      }
    });

    return closeAlertPopup;
  };

  const internalError = (code?: string, props?: Omit<AlertProps, "isOpen">) => {
    if (!code) return error("UNKNOWN_ERROR", props);
    switch (code) {
      default:
        return error(code, props);
      case "ERR_NETWORK":
        return error("UNCONNECTED-SERVER-UNREACHABLE", props);
      case "Internal Server Error":
        return error("UNCONNECTED-INTERNAL_SERVER_ERROR", props);
    }
  };

  const apiError: IAlertContext["apiError"] = (e, props) => {
    console.log("API_ERROR:", e.code);
    const errorResponse = e.response?.data.erros[0];
    return internalError(errorResponse || e.code, props);
  };

  const notify: IAlertContext["notify"] = (props) => {
    setAlertState({
      visible: true,
      isError: false,
      props
    });

    return closeAlertPopup;
  };

  const values = useMemo(
    () => ({ error, notify, apiError }),
    [alertState.visible]
  );

  return (
    <AlertContext.Provider value={{ ...values, visible: alertState.visible }}>
      {alertState.visible && (
        <Alert
          {...alertState.props}
          visible={alertState.visible}
          isError={alertState.isError}
          onClose={() => {
            closeAlertPopup();
            alertState.props?.onClose && alertState.props?.onClose();
          }}
        />
      )}
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
