import RestAPI, { BASE_URL, IRequest } from "../apiModule"
import { CreateAccount, InLogin, OutLogin, InUpdate } from "./userRequest.interface"

export function UserRequest() {
  async function login(data: InLogin): Promise<IRequest<OutLogin>> {
    const response = await RestAPI.httpPost(`${BASE_URL}/login`, data).then((response) => response);

    // @ts-ignore
    if (response.success && response.data)
      RestAPI.updateToken(response.data.token)

    return response
  }

  function create(data: CreateAccount): Promise<IRequest<OutLogin>> {
    return RestAPI.httpPost(`${BASE_URL}/user`, data).then((response) => response);
  }

  function update(data: InUpdate): Promise<IRequest<InUpdate>> {
    return RestAPI.httpPatch(`${BASE_URL}/user`, data).then((response) => response);
  }

  async function removeToken() {
    RestAPI.updateToken('')
  }

  return {
    login,
    create,
    removeToken,
    update
  }
}