import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import React, {
  useContext,
  useMemo,
  createContext,
  useState,
  useEffect
} from "react";

import { useAlert } from "./useAlert";
import { useLoading } from "./useLoading";

import { axios } from "~config/api";

import {
  UserData,
  deleteUserData,
  getUserData,
  setUserData
} from "~services/UserDataService";

interface IAuthContext {
  isLogged: boolean;
  SignIn: (
    userName: string,
    password: string,
  ) => void;
  SignOut: () => void;
  userData: UserData;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface AuthProviderProps {
  children: any;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const [userData, setStateUserData] = useState<UserData | undefined>(
    undefined
  );

  const alert = useAlert();
  const loading = useLoading();

  const checkConnection = () => {
    NetInfo.fetch().then((state) => {
      if (!isLogged && !state.isConnected) {
        alert.error("UNCONNECTED", { onClosed: () => checkConnection() });
      }
    });
  };

  const navigation = useNavigation<any>();

  useEffect(() => {
    const bootstrap = async () => {
      const userData = await getUserData();
      setStateUserData(userData);
      setIsLogged(!!userData);
      checkConnection();
    };

    bootstrap();
  }, []);

  const SignIn: IAuthContext["SignIn"] = async (
    userName,
    password
  ) => {
    if (!userName || !password) {
      alert.error("INVALID_FIELDS-REQUIRED");
      return;
    }

    const data = {
      login: userName,
      senha: password,
    };

    console.log(data)

    loading.show();

    // await axios
    //   .post("SegurancaUsuario/Autenticar", data)
    //   .then((res) => {
    //     console.log("useAuth", res.data.permissoes);
    //     const data = {
    //       user: userName,
    //       token: res.data.key,
    //       refresh: res.data.keyRefresh,
    //       limit: res.data.keyValidTo,
    //       permissions: res.data.permissoes //handlePermissions(res.data.permissoes)
    //     };
    //     setUserData(data).then(() => {
    //       setIsLogged(true);
    //       setStateUserData(data);
    //       navigation.navigate("HomeMenu");
    //       loading.hide();
    //       //console.log("permissions", handlePermissions(permissions));
    //     });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     loading.hide();
    //     alert.apiError(e);
    //   });
  };

  const SignOut = () => {
    deleteUserData();
    setIsLogged(false);
    navigation.navigate("Home");
  };

  const values = useMemo(
    () => ({
      isLogged,
      SignIn,
      SignOut,
    }),
    [isLogged]
  );

  return (
    // fix this types to correct type later
    <AuthContext.Provider value={{ ...values, userData } as any}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
