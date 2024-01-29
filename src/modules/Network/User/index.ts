import RestAPI from "../apiModule"
import { InLogin, OutLogin } from "./userRequest.interface"

export function UserRequest() {
  const USER_URL = '/User'

  function login(data: InLogin): Promise<OutLogin> {
    return new Promise((resolve) => setInterval(() => {
      resolve({
        idUser: 1,
        email: 'email@email.com',
        name: 'name',
        about: 'sobre',
        photo: 'photUser'
      })
    }, 100))

    //return RestAPI.httpPost(`${USER_URL}/login`, data);
  }

  return {
    login
  }
}