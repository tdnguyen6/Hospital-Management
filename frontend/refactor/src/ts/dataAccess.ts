import { Helper } from "./helper.js";

export class DAO {
  static domain: string = "http://hms-api.atwebpages.com";
  static database: string = "hms";
  table: string;
  dataCache: {[url: string]: {}} = {};

  constructor(
    table: string,
    database: string = DAO.database,
    domain: string = DAO.domain
  ) {
    this.table = table;
    DAO.database = database;
    DAO.domain = domain;
  }

  async service(
    queries: string = "",
    method: string = "GET",
    body: {} = {}
  ): Promise<any> {
    let url: string = `${DAO.domain}/${DAO.database}/${this.table}?${queries}`;

    if (this.dataCache.hasOwnProperty(url)) {
      console.log("Using data Cache for url: " + url);
      return this.dataCache[url];
    }

    let json_resp;

    let opt: {method: string, header: {}, body: string | undefined} = {
      method: method,
      header: { "Content-Type": "application/json;charset=utf-8" },
      body: (method === "GET") ? undefined : JSON.stringify(body)
    };


    let InvisibleStack: HTMLElement[] = <HTMLElement[]> Helper.startLoading();

    try {
      let resp = await fetch(url, opt);
      json_resp =  await resp.json();
    } catch (err) {
      console.log(err);
      alert(err);
    } finally {
      Helper.stopLoading(InvisibleStack);
    }

    this.dataCache[url] = json_resp;

    return json_resp;
  }

  async getMessage(
    queries: string = "",
    method: string = "GET",
    body: {} = {}
  ): Promise<any> {
    let resp = await this.service(queries, method, body);
    return resp["message"];
  }

  async getData(
    queries: string = "",
    method: string = "GET",
    body: {} = {}
  ) {
    let resp = await this.service(queries, method, body);
    return resp["data"];
  }

  clearCache() {
    this.dataCache = {};
  }
}
