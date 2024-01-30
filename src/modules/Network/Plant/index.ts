import RestAPI, { BASE_URL, IRequest } from "../apiModule"
import { InPlant, OutPlant } from "./plantRequest.interface"

export function PlantRequest() {

  function getByUser(): Promise<IRequest<OutPlant[]>> {
    return RestAPI.httpGet(`${BASE_URL}/plants`).then(response => response)
  }

  function create(data: InPlant): Promise<IRequest<OutPlant>> {
    return RestAPI.httpPost(`${BASE_URL}/plant`, data).then((response) => response);
  }

  function update(data: InPlant): Promise<IRequest<string>> {
    return RestAPI.httpPatch(`${BASE_URL}/plant`, data).then((response) => response);
  }

  function deleteItem(id: number): Promise<IRequest<string>> {
    return RestAPI.httpDelete(`${BASE_URL}/plant/${id}`).then((response) => response);
  }

  return {
    getByUser,
    create,
    update,
    deleteItem
  }
}