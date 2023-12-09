import { storage_keys } from "~global/constants";
import { secureStore } from "~utils/secureStorage";

export enum Permission {
  VisualizarTimeMaterialRequsicao = 1,
  GerenciarTimeMaterialRequisicao = 2,
  AprovarTimeMaterialRequisicaoComoEJA = 3,
  AprovarTimeMaterialRequisicaoComoClienteRequisitante = 4,
  AprovarTimeMaterialRequisicaoComoClienteFiscal = 5
}

export interface UserData {
  user: any;
  token: string;
  refresh: string;
  limit: string;
  permissions: Permission[];
}

export function setUserData(data: UserData) {
  return secureStore.setItem(storage_keys.USER_DATA, JSON.stringify(data));
}

export async function getUserData(): Promise<UserData | undefined> {
  const userData = await secureStore.getItem(storage_keys.USER_DATA);

  if (!userData) {
    return;
  }

  return JSON.parse(userData);
}

export async function deleteUserData() {
  const userData = await secureStore.getItem(storage_keys.USER_DATA);

  if (!userData) return;

  return secureStore.removeItem(storage_keys.USER_DATA);
}
