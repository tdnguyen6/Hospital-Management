import { Helper } from "./helper.js";
import { AdminPanel } from "./adminPanel.js";
import { DAO } from "./dataAccess.js";
export class MainTable {
  static table: HTMLElement = <HTMLElement>(
    document.getElementById("main-table")
  );
  static dao: DAO;

  static display(dao: DAO) {
    this.dao = dao;
    this.reset();
    this.displayHeaders();
    this.displayContentWithPagination();
  }

  static displayHeaders() {
    let thead: HTMLElement = document.createElement("thead");
    MainTable.table.appendChild(thead);
    let row: HTMLElement = document.createElement("tr");
    thead.appendChild(row);
    Helper.fillOneRow(this.dao.getHeaders(), row, "th");
    this.queryFunctions();
    if (Helper.isAdmin()) {
      let operationHeader = document.createElement("th");
      row.appendChild(operationHeader);
      operationHeader.innerText = "Operations";
    }
  }

  static manipFunctions() {
    let tbody = MainTable.table.children[1];
    for (let i = 0; i < tbody.childElementCount; i++) {
      let row = tbody.children[i];
      let manipCol = document.createElement("td");
      row.appendChild(manipCol);
      let rootDiv = document.createElement("div");
      rootDiv.classList.add("manip-col");
      manipCol.appendChild(rootDiv);
      let firstBtnDiv = document.createElement("div");
      let secondBtnDiv = document.createElement("div");
      rootDiv.appendChild(firstBtnDiv);
      rootDiv.appendChild(secondBtnDiv);
      let edit = document.createElement("button");
      let del = document.createElement("button");
      let save = document.createElement("button");
      let undo = document.createElement("button");
      del.innerHTML = 'DELETE <i class="fas fa-trash-alt"></i>';
      edit.innerHTML = 'EDIT <i class="fas fa-edit"></i>';
      save.innerHTML = "SAVE " + '<i class="far fa-check-circle"></i>';
      undo.innerHTML = "UNDO " + '<i class="fas fa-undo"></i>';

      firstBtnDiv.appendChild(edit);
      secondBtnDiv.appendChild(del);

      let keys: {} = {};
      this.dao.getKeysIndex().forEach((i) => {
        keys[this.dao.getHeaders()[i]] = Helper.sanitize(
          row.children[i].innerHTML
        );
      });
      edit.onclick = () => {
        firstBtnDiv.removeChild(edit);
        firstBtnDiv.appendChild(save);
        (<HTMLElement>row).contentEditable = "true";
        this.dao.getKeysIndex().forEach((i) => {
          (<HTMLElement>row.children[i]).contentEditable = "false";
        });
        if (
          !MainTable.dao.editingIDs
            .map((s) => JSON.stringify(s))
            .some((s) => s == JSON.stringify(keys))
        ) {
          MainTable.dao.editingIDs.push(keys);
          if (
            MainTable.dao
              .getSavedIDs()
              .map((s) => JSON.stringify(s))
              .some((s) => s == JSON.stringify(keys))
          ) {
            MainTable.dao.editedContent = MainTable.dao.editedContent.filter(
              (content) => !Helper.matchKeys(keys, content)
            );
          }
          AdminPanel.refresh();
          AdminPanel.supervise();
          console.log(this.dao.editedContent);
        }
      };
      save.onclick = () => {
        firstBtnDiv.removeChild(save);
        firstBtnDiv.appendChild(edit);
        (<HTMLElement>row).contentEditable = "false";
        let index = MainTable.dao.editingIDs.indexOf(keys);
        if (index >= 0) {
          MainTable.dao.editingIDs.splice(index, 1);
          let newContent: { [key: string]: any } = Helper.tableToJSON(
            MainTable.table,
            i,
            i
          )[0];
          delete newContent["Operations"];
          AdminPanel.addEditedContent(
            Helper.keepDiffereces(
              <{ [key: string]: any }>this.dao.getData().find((data) => {
                if (Helper.matchKeys(keys, data)) return data;
              }),
              newContent,
              this.dao
            ),
            this.dao
          );
          AdminPanel.refresh();
          AdminPanel.supervise();
          console.log(this.dao.editedContent);
        }
      };
      del.onclick = () => {
        secondBtnDiv.removeChild(del);
        secondBtnDiv.appendChild(undo);
        if (
          !this.dao.deletedIDs
            .map((s) => JSON.stringify(s))
            .some((s) => s == JSON.stringify(keys))
        ) {
          this.dao.deletedIDs.push(keys);
          AdminPanel.refresh();
          AdminPanel.supervise();
        }
      };
      undo.onclick = () => {
        secondBtnDiv.removeChild(undo);
        secondBtnDiv.appendChild(del);
        let index = this.dao.deletedIDs.indexOf(keys);
        if (index >= 0) {
          this.dao.deletedIDs.splice(index, 1);
          AdminPanel.refresh();
          AdminPanel.supervise();
        }
      };
    }
  }

  static queryFunctions() {
    let headerRow = MainTable.table.children[0].children[0];
    Array.from(headerRow.children).forEach((child) => {
      if (
        Array.from(headerRow.children).indexOf(child) <
        this.dao.getHeaders().length
      ) {
        child.innerHTML = "";
        let rootDiv = document.createElement("div");
        rootDiv.classList.add("rootDiv");
        let sortUpBtn = document.createElement("button");
        sortUpBtn.innerHTML = '<i class="fas fa-sort-up"></i>';
        let sortDownBtn = document.createElement("button");
        sortDownBtn.innerHTML = '<i class="fas fa-sort-down"></i>';
        let sortDiv = document.createElement("div");
        sortDiv.classList.add("innerDiv");
        let searchBtn = document.createElement("button");
        searchBtn.innerHTML = '<i class="fab fa-searchengin"></i>';
        let searchDiv = document.createElement("div");
        searchDiv.classList.add("innerDiv");
        searchDiv.innerHTML = this.dao.getHeaders()[
          Array.from(headerRow.children).indexOf(child)
        ];
        let searchBtnDiv = document.createElement("div");
        searchBtnDiv.appendChild(searchBtn);
        searchDiv.appendChild(searchBtnDiv);
        sortDiv.appendChild(sortUpBtn);
        sortDiv.appendChild(sortDownBtn);

        rootDiv.appendChild(searchDiv);
        rootDiv.appendChild(sortDiv);
        child.appendChild(rootDiv);

        sortUpBtn.onclick = () => {
          if (sortUpBtn.classList.contains("sortDir")) {
            sortUpBtn.classList.remove("sortDir");
          } else {
            sortUpBtn.classList.add("sortDir");
            sortDownBtn.classList.remove("sortDir");
          }
        };

        sortDownBtn.onclick = () => {
          if (sortDownBtn.classList.contains("sortDir")) {
            sortDownBtn.classList.remove("sortDir");
          } else {
            sortDownBtn.classList.add("sortDir");
            sortUpBtn.classList.remove("sortDir");
          }
        };

        let searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.onblur = () => {
          if (
            Array.from(searchBtnDiv.children).includes(searchInput) &&
            searchInput.value === ""
          ) {
            searchBtnDiv.removeChild(searchInput);
            searchBtnDiv.appendChild(searchBtn);
          }
        };

        searchBtn.onclick = () => {
          if (Array.from(searchBtnDiv.children).includes(searchBtn)) {
            searchBtnDiv.removeChild(searchBtn);
            searchBtnDiv.appendChild(searchInput);
            searchInput.focus();
          }
        };
      }
    });
  }

  static displayContent(datas: {}[], start: number, end: number) {
    let tbody: HTMLElement = <HTMLElement>MainTable.table.children[1];
    if (tbody == null) {
      tbody = document.createElement("tbody");
      MainTable.table.appendChild(tbody);
    }
    let num = end - start + 1;

    Helper.dynamicResize(num, tbody, "tr");

    for (let i = 0; i < num; i++) {
      let dataContent: string[] = Object.values(datas[i + start]);
      Helper.fillOneRow(dataContent, <HTMLElement>tbody.children[i]);
    }
  }

  static displayContentWithPagination() {
    let recordsPerPage: number = parseInt(
      (<HTMLInputElement>document.getElementById("pagination-input")).value
    );
    if (isNaN(recordsPerPage) || recordsPerPage <= 0) {
      recordsPerPage = this.dao.getData().length;
    }
    let num_of_paginations: number = Math.ceil(
      this.dao.getData().length / recordsPerPage
    );
    let pagination: HTMLElement = <HTMLElement>(
      document.getElementById("pagination")
    );

    Helper.dynamicResize(num_of_paginations, pagination, "button");

    for (let i = 0; i < num_of_paginations; i++) {
      (<HTMLElement>pagination.children[i]).innerText = "" + i;
      (<HTMLElement>pagination.children[i]).onclick = () => {
        let end =
          (i + 1) * recordsPerPage - 1 > this.dao.getData().length - 1
            ? this.dao.getData().length - 1
            : (i + 1) * recordsPerPage - 1;
        this.displayContent(this.dao.getData(), i * recordsPerPage, end);
        if (Helper.isAdmin()) {
          this.manipFunctions();
          AdminPanel.supervise();
        }
      };
    }
    (<HTMLElement>pagination.children[0]).click();
    this.responsiveHeaders();
  }

  static responsiveHeaders() {
    let style: HTMLStyleElement = <HTMLStyleElement>(
      document.getElementById("responsive-header-main")
    );
    let styleSheet: CSSStyleSheet = <CSSStyleSheet>style.sheet;
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      styleSheet.deleteRule(i);
    }
    let rule =
      "@media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px)  {";
    for (let i = 0; i < this.dao.getHeaders().length; i++) {
      rule += `#main-table td:nth-of-type(${i + 1}):before { content: "${
        this.dao.getHeaders()[i]
      }"; }\n`;
    }
    if (Helper.isAdmin())
      rule += `#main-table td:nth-of-type(${
        this.dao.getHeaders().length + 1
      }):before { content: "Operations"; }\n`;
    rule += "}";
    styleSheet.insertRule(rule);
  }

  static reset() {
    for (let i = 0; i < MainTable.table.childElementCount; i++) {
      this.table.children[i].remove();
    }
  }
}
