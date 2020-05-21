import { DataTable } from "./dataTable.js";
import { Helper } from "./helper.js";
import { MyDAO } from "./app.js";
let TopPanel = /** @class */ (() => {
    class TopPanel {
        static setUp(table) {
            TopPanel.paginationInput.onchange = () => {
                table.displayContentWithPagination();
            };
        }
        static setUpRunReset(table) {
            TopPanel.run.onclick = () => {
                let queries = [];
                let sortAsc = [];
                let sortDsc = [];
                let headerRow = DataTable.table.children[0].children[0];
                let end = Helper.isAdmin() ? headerRow.childElementCount - 1 : headerRow.childElementCount;
                for (let i = 0; i < end; i++) {
                    let rootDiv = headerRow.children[i].children[0];
                    let searchDiv = rootDiv.children[0];
                    let sortDiv = rootDiv.children[1];
                    let upBtn = sortDiv.children[0];
                    let downBtn = sortDiv.children[1];
                    let searchBtn = searchDiv.children[0].children[0];
                    if (searchBtn instanceof HTMLInputElement) {
                        queries.push(`${table.headers[i]}=${searchBtn.value}`);
                    }
                    if (upBtn.disabled ||
                        downBtn.disabled) {
                        if (upBtn.disabled)
                            sortDsc.push(table.headers[i]);
                        else
                            sortAsc.push(table.headers[i]);
                    }
                }
                queries.push(`sortAsc=${sortAsc}`);
                queries.push(`sortDsc=${sortDsc}`);
                let queryString = queries.join("&");
                queryString = Helper.sanitize(queryString);
                MyDAO.getData(queryString).then(datas => {
                    table.datas = datas;
                    table.displayContentWithPagination();
                });
            };
            TopPanel.reset.onclick = () => {
                MyDAO.getData().then(datas => {
                    table.datas = datas;
                    table.displayContentWithPagination();
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
