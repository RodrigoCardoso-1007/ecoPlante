import RestAPI, { BASE_URL, IRequest } from "../apiModule"
import { InRegister, OutRegister } from "./plantRequest.interface"

export function RegisterRequest() {

  function getByPlant(idPlant: number): Promise<IRequest<OutRegister[]>> {
    return RestAPI.httpGet(`${BASE_URL}/registers/${idPlant}`).then(response => response)
  }

  function create(data: InRegister): Promise<IRequest<OutRegister>> {
    return RestAPI.httpPost(`${BASE_URL}/register`, data).then((response) => response);
  }

  function update(data: string, id: number): Promise<IRequest<string>> {
    return RestAPI.httpPatch(`${BASE_URL}/register/${id}`, { description: data }).then((response) => response);
  }

  function deleteItem(id: number): Promise<IRequest<string>> {
    return RestAPI.httpDelete(`${BASE_URL}/register/${id}`).then((response) => response);
  }

  return {
    getByPlant,
    create,
    update,
    deleteItem
  }
}