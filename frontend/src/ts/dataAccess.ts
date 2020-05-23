import { Helper } from "./helper.js";

export class DAO {
  // static domain: string = "http://hms-api.atwebpages.com";
  static domain: string = "http://localhost:6969";
  static database: string = "hms";
  keys: string[] = [];
  table: string;
  dataCache: { [key: string]: {} } = {};
  editedContent: { [key: string]: any }[] = [];
  deletedIDs: {}[] = [];
  editingIDs: {}[] = [];
  defaultURL: string;
  currentURL: string;

  constructor(
    table: string,
    keys: string[],
    database: string = DAO.database,
    domain: string = DAO.domain
  ) {
    this.table = table;
    this.keys = keys;
    this.defaultURL = `${DAO.domain}/${DAO.database}/${this.table}`;
    this.currentURL = this.defaultURL;
    DAO.database = database;
    DAO.domain = domain;
  }

  async service(
    queries: string = "",
    method: string = "GET",
    body: {} | [] = {}
  ): Promise<any> {
    let url: string = `${this.defaultURL}${queries}`;
    let caching: boolean = false;
    if (method === "GET") {
      if (this.dataCache.hasOwnProperty(url)) {
        console.log("Using data Cache for url: " + url);
        return this.dataCache[url];
      } else {
        caching = true;
      }
    }

    let json_resp;
    let text_resp;

    let opt: { method: string; headers: {}; body: string | undefined } = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: method === "GET" ? undefined : JSON.stringify(body),
    };

    console.log(opt);

    let InvisibleStack: HTMLElement[] = <HTMLElement[]>Helper.startLoading();

    try {
      let resp = await fetch(url, opt);
      text_resp = await resp.clone().text();
      json_resp = await resp.json();
    } catch (err) {
      console.log(text_resp);
      console.log(err);
      alert(err);
    } finally {
      Helper.stopLoading(InvisibleStack);
    }

    if (caching) this.dataCache[url] = json_resp;

    return json_resp;
  }

  async fetchMessage(
    queries: string = "",
    method: string = "GET",
    body: {} | [] = {}
  ): Promise<any> {
    let resp = await this.service(queries, method, body);
    return resp["message"];
  }

  async fetchData(
    queries: string = "",
    method: string = "GET",
    body: {} | [] = {}
  ) {
    let resp = await this.service(queries, method, body);
    return resp["data"];
  }

  clearCache() {
    this.dataCache = {};
  }

  refresh() {
    this.deletedIDs = [];
    this.editingIDs = [];
    this.editedContent = [];
  }

  getSavedIDs() {
    let savedIDs: {}[] = [];
    for (let i = 0; i < this.editedContent.length; i++) {
      const content = this.editedContent[i];
      let savedKeys = {};
      this.keys.forEach((key) => {
        savedKeys[key] = Helper.sanitize(content[key]);
      });
      savedIDs.push(savedKeys);
    }
    return savedIDs;
  }

  getHeaders(): string[] {
    return Object.keys(this.dataCache[this.defaultURL]["data"][0]);
  }

  getKeysIndex(): number[] {
    let keyIndexes: number[] = <number[]>this.keys.map((key) => {
      if (this.getHeaders().includes(key))
        return this.getHeaders().indexOf(key);
    });
    return keyIndexes;
  }

  getData(): { [key: string]: any }[] {
    console.log(this.currentURL);
    // if (this.dataCache.hasOwnProperty(this.currentURL))
    return this.dataCache[this.currentURL]["data"];
    // return [];
  }
}
