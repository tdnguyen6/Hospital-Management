import { DataTable } from "./dataTable.js";
import { Helper } from "./helper.js";
import { MyDAO } from "./app.js";
export class TopPanel {
  static paginationInput: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("pagination-input")
  );
  static run: HTMLElement = <HTMLElement>document.getElementById("run");
  static reset: HTMLElement = <HTMLElement>document.getElementById("reset");
  static setUp(table: DataTable) {
    TopPanel.paginationInput.onchange = () => {
      table.displayContentWithPagination();
    };
  }

  static setUpRunReset(table: DataTable) {
    TopPanel.run.onclick = () => {
      let queries: string[] = [];
      let sortAsc: string[] = []
      let sortDsc: string[] = [];
      let headerRow = DataTable.table.children[0].children[0];
      let end: number = Helper.isAdmin() ? headerRow.childElementCount - 1 : headerRow.childElementCount;
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
        if (
          (<HTMLButtonElement>upBtn).disabled ||
          (<HTMLButtonElement>downBtn).disabled
        ) {
          if ((<HTMLButtonElement>upBtn).disabled)
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
