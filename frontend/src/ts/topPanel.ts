import { MainTable } from "./mainTable.js";
import { Helper } from "./helper.js";
import { DAO } from "./dataAccess.js";
import { AdminPanel } from "./adminPanel.js";
export class TopPanel {
  static dao: DAO;
  static paginationInput: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("pagination-input")
  );
  static run: HTMLElement = <HTMLElement>document.getElementById("run");
  static reset: HTMLElement = <HTMLElement>document.getElementById("reset");
  static setUp(dao: DAO) {
    this.dao = dao;
    TopPanel.paginationInput.onchange = () => {
      MainTable.displayContentWithPagination();
    };
    this.setUpRunReset();
  }

  static setUpRunReset() {
    TopPanel.run.onclick = () => {
      let queries: string[] = [];
      let sortAsc: string[] = [];
      let sortDsc: string[] = [];
      let headerRow = MainTable.table.children[0].children[0];
      let end: number = Helper.isAdmin()
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
        if (
          (<HTMLButtonElement>upBtn).classList.contains("sortDir") ||
          (<HTMLButtonElement>downBtn).classList.contains("sortDir")
        ) {
          if ((<HTMLButtonElement>upBtn).classList.contains("sortDir"))
            sortAsc.push(this.dao.getHeaders()[i]);
          else sortDsc.push(this.dao.getHeaders()[i]);
        }
      }
      if (sortAsc.length > 0) queries.push(`sortAsc=${sortAsc}`);
      if (sortDsc.length > 0) queries.push(`sortDsc=${sortDsc}`);
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
