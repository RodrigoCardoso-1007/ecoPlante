export const BASE_URL = `http://localhost:3000`;

export interface IRequest<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export default class RestAPI {
  static TOKEN = '';

  public static async httpMethod(method: string, url: string, body?: any) {
    return fetch(url, {
      method: method,
      body: JSON.stringify(body),
      credentials: 'same-origin',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': this.TOKEN,
      }
    });
  }

  public static httpGet = (url: string) => this.httpMethod("GET", url).then((res) => res.json());
  public static httpPost = (url: string, body: any) => this.httpMethod("POST", url, body).then((res) => res.json());
  public static httpPatch = (url: string, body: any) => this.httpMethod("PATCH", url, body).then((res) => res.json());
  public static httpDelete = (url: string) => this.httpMethod("DELETE", url).then((res) => res.json());

  public static updateToken(token: string) {
    this.TOKEN = token;
  }
}