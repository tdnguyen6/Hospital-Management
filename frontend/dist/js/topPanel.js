import { MainTable } from "./mainTable.js";
import { Helper } from "./helper.js";
import { AdminPanel } from "./adminPanel.js";
let TopPanel = /** @class */ (() => {
    class TopPanel {
        static setUp(dao) {
            this.dao = dao;
            TopPanel.paginationInput.onchange = () => {
                MainTable.displayContentWithPagination();
            };
            this.setUpRunReset();
        }
        static setUpRunReset() {
            TopPanel.run.onclick = () => {
                let queries = [];
                let sortAsc = [];
                let sortDsc = [];
                let headerRow = MainTable.table.children[0].children[0];
                let end = Helper.isAdmin()
                    ? headerRow.childElementCount - 1
                    : headerRow.childElementCount;
                for (let i = 0; i < end; i++) {
                    let rootDiv = headerRow.children[i].children[0];
                    let searchDiv = rootDiv.children[0];
                    let sortDiv = rootDiv.children[1];
                    let upBtn = sortDiv.children[0];
                    let downBtn = sortDiv.children[1];
                    let searchBtn = searchDiv.children[0].children[0];
                    if (searchBtn instanceof HTMLInputElement) {
                        queries.push(`${this.dao.getHeaders()[i]}=${searchBtn.value}`);
                    }
                    if (upBtn.classList.contains("sortDir") ||
                        downBtn.classList.contains("sortDir")) {
                        if (upBtn.classList.contains("sortDir"))
                            sortAsc.push(this.dao.getHeaders()[i]);
                        else
                            sortDsc.push(this.dao.getHeaders()[i]);
                    }
                }
                if (sortAsc.length > 0)
                    queries.push(`sortAsc=${sortAsc}`);
                if (sortDsc.length > 0)
                    queries.push(`sortDsc=${sortDsc}`);
                let queryString = queries.join("&");
                queryString = `?${queryString}`;
                queryString = Helper.sanitize(queryString);
                this.dao.service(queryString).then(() => {
                    this.dao.currentURL = this.dao.defaultURL + queryString;
                    MainTable.displayContentWithPagination();
                });
            };
            TopPanel.reset.onclick = () => {
                this.dao.service().then(() => {
                    this.dao.refresh();
                    this.dao.currentURL = this.dao.defaultURL;
                    MainTable.displayContentWithPagination();
                    MainTable.queryFunctions();
                    AdminPanel.refresh();
                    AdminPanel.supervise();
                });
            };
        }
    }
    TopPanel.paginationInput = (document.getElementById("pagination-input"));
    TopPanel.run = document.getElementById("run");
    TopPanel.reset = document.getElementById("reset");
    return TopPanel;
})();
export { TopPanel };
