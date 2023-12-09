import React, { useContext, useMemo, createContext, useState } from "react";

import { Loading } from "~components/Loading";

export interface ILoadingContext {
  hide: () => void;
  show: () => void;
  toggle: (boolean: boolean) => void;
  visible: boolean;
}

const LoadingContext = createContext<ILoadingContext>({} as ILoadingContext);

interface LoadingProviderProps {
  children: any;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const hide = () => {
    setVisible(false);
  };

  const show = () => {
    setVisible(true);
  };

  const toggle = (boolean: boolean) => {
    setVisible((old) => (typeof boolean === "undefined" ? !old : boolean));
  };

  const values = useMemo(() => ({ hide, show, toggle }), []);

  return (
    <LoadingContext.Provider value={{ ...values, visible }}>
      <Loading visible={visible} />
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
