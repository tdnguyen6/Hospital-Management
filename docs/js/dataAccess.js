import { Helper } from "./helper.js";
let DAO = /** @class */ (() => {
    class DAO {
        constructor(table, keys, database = DAO.database, domain = DAO.domain) {
            this.keys = [];
            this.dataCache = {};
            this.editedContent = [];
            this.deletedIDs = [];
            this.editingIDs = [];
            this.table = table;
            this.keys = keys;
            this.defaultURL = `${DAO.domain}/${DAO.database}/${this.table}`;
            this.currentURL = this.defaultURL;
            DAO.database = database;
            DAO.domain = domain;
        }
        async service(queries = "", method = "GET", body = {}) {
            let url = `${this.defaultURL}${queries}`;
            let caching = false;
            if (method === "GET") {
                if (this.dataCache.hasOwnProperty(url)) {
                    console.log("Using data Cache for url: " + url);
                    return this.dataCache[url];
                }
                else {
                    caching = true;
                }
            }
            let json_resp;
            let text_resp;
            let opt = {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Origin": "*"
                },
                body: method === "GET" ? undefined : JSON.stringify(body),
            };
            console.log(opt);
            let InvisibleStack = Helper.startLoading();
            try {
                let resp = await fetch(url, opt);
                text_resp = await resp.clone().text();
                json_resp = await resp.json();
            }
            catch (err) {
                console.log(text_resp);
                console.log(err);
                // alert(err);
            }
            finally {
                Helper.stopLoading(InvisibleStack);
            }
            if (caching)
                this.dataCache[url] = json_resp;
            return json_resp;
        }
        async fetchMessage(queries = "", method = "GET", body = {}) {
            let resp = await this.service(queries, method, body);
            return resp["message"];
        }
        async fetchData(queries = "", method = "GET", body = {}) {
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
            let savedIDs = [];
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
        getHeaders() {
            return Object.keys(this.dataCache[this.defaultURL]["data"][0]);
        }
        getKeysIndex() {
            let keyIndexes = this.keys.map((key) => {
                if (this.getHeaders().includes(key))
                    return this.getHeaders().indexOf(key);
            });
            return keyIndexes;
        }
        getData() {
            console.log(this.currentURL);
            // if (this.dataCache.hasOwnProperty(this.currentURL))
            return this.dataCache[this.currentURL]["data"];
            // return [];
        }
    }
    // static domain: string = "http://hms-api.atwebpages.com";
    // DAO.domain = "https://cors-anywhere.herokuapp.com/http://hms-api.atwebpages.com";
    DAO.domain = "http://localhost:9999";
    // static domain: string = "http://localhost:6969";
    // static domain: string = "http://172.22.156.171/~tidu/hms/backend";
    DAO.database = "hms";
    return DAO;
})();
export { DAO };
