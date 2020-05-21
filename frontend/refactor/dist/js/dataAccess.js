import { Helper } from "./helper.js";
let DAO = /** @class */ (() => {
    class DAO {
        constructor(table, database = DAO.database, domain = DAO.domain) {
            this.dataCache = {};
            this.table = table;
            DAO.database = database;
            DAO.domain = domain;
        }
        async service(queries = "", method = "GET", body = {}) {
            let url = `${DAO.domain}/${DAO.database}/${this.table}?${queries}`;
            if (this.dataCache.hasOwnProperty(url)) {
                console.log("Using data Cache for url: " + url);
                return this.dataCache[url];
            }
            let json_resp;
            let opt = {
                method: method,
                header: { "Content-Type": "application/json;charset=utf-8" },
                body: (method === "GET") ? undefined : JSON.stringify(body)
            };
            let InvisibleStack = Helper.startLoading();
            try {
                let resp = await fetch(url, opt);
                json_resp = await resp.json();
            }
            catch (err) {
                console.log(err);
                alert(err);
            }
            finally {
                Helper.stopLoading(InvisibleStack);
            }
            this.dataCache[url] = json_resp;
            return json_resp;
        }
        async getMessage(queries = "", method = "GET", body = {}) {
            let resp = await this.service(queries, method, body);
            return resp["message"];
        }
        async getData(queries = "", method = "GET", body = {}) {
            let resp = await this.service(queries, method, body);
            return resp["data"];
        }
        clearCache() {
            this.dataCache = {};
        }
    }
    DAO.domain = "http://hms-api.atwebpages.com";
    DAO.database = "hms";
    return DAO;
})();
export { DAO };
