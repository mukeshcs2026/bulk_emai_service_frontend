
import api, { API_ENDPOINTS } from './api'


export interface CurrentUser {
  username: string;
  email: string;
  role: string;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface LoginPayload{
  username: string,
  password: string
}

export async function login(data: LoginPayload){
  const response = await api.post(API_ENDPOINTS.auth.login, data)
  return response.data

}

export async function register(data: RegisterPayload){
  const reponse = await api.post(API_ENDPOINTS.auth.register, data)
  return reponse.data
}

export async function logoutUser() {
  const response = await api.post(API_ENDPOINTS.auth.logout)

  return response.data
}
export async function getCurrentUser(): Promise<CurrentUser> {
  const response = await api.get(API_ENDPOINTS.auth.me);

  return response.data.data;
}