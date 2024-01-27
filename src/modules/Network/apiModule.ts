import axios from "axios";

export default class RestAPI {
  private static API = axios.create({
    baseURL: "http://localhost",
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })

  public static async httpMethod(method: string, url: string, body?: any) {
    return this.API.request({
      method: method,
      url: url,
      params: body || {}
    })
  }

  public static httpGet = (url: string) => this.httpMethod("GET", url);
  public static httpPost = (url: string, body: any) => this.httpMethod("POST", url, body);
  public static httpPut = (url: string, body: any) => this.httpMethod("PUT", url, body);
  public static httpDelete = (url: string, body: any) => this.httpMethod("DELETE", url, body);
}