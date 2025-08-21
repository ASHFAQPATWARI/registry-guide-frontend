import { http } from "@/api/http";
import endpoints from "@/constants/endpoints";
import { IAppleLoginRequest, IAppleLoginResponse } from "@/types";

export const fetchLoginTokens = async (url: string, payload: IAppleLoginRequest) => {
  return await http.post<IAppleLoginResponse>(`${endpoints.login.index}/${url}`, payload);
};