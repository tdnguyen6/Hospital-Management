import { DataTable } from "./dataTable.js";

export class AdminPanel {
  static editedContent: { [key: string]: any }[] = [];
  static deletedIDs: number[] = [];
  static editingIDs: number[] = [];
  static deletedDisplay: HTMLElement = <HTMLElement>(
    document.getElementById("deleted-id")
  );
  static editedDisplay: HTMLElement = <HTMLElement>(
    document.getElementById("edited-id")
  );

  static supervise() {
    let tbody: HTMLElement = <HTMLElement>DataTable.table.children[1];

    for (let i = 0; i < tbody.childElementCount; i++) {
      let row: HTMLElement = <HTMLElement>tbody.children[i];
      this.superviseDelete(row);
      this.superviseEdit(row);
    }
  }

  static superviseDelete(row: HTMLElement) {
    if (row.classList.contains("deleted")) row.classList.remove("deleted");
    let id: string = row.children[0].innerHTML;
    if (this.deletedIDs.includes(parseInt(id))) {
      row.classList.add("deleted");
      let btn =
        row.children[row.childElementCount - 1].children[0].children[1]
          .children[0];
      if (btn.innerHTML.includes("DELETE")) (<HTMLButtonElement>btn).click();
    }
  }

  static superviseEdit(row: HTMLElement) {
    if (row.classList.contains("editing")) row.classList.remove("editing");
    if (row.classList.contains("saved")) row.classList.remove("saved");
    let id: string = row.children[0].innerHTML;
    if (this.editingIDs.includes(parseInt(id))) {
      row.classList.add("editing");
      let btn =
        row.children[row.childElementCount - 1].children[0].children[0]
          .children[0];
      if (btn.innerHTML.includes("EDIT")) (<HTMLButtonElement>btn).click();
    }
    if (this.getSavedIDs().includes(parseInt(id))) {
      row.classList.add("saved");
      let btn =
        row.children[row.childElementCount - 1].children[0].children[0]
          .children[0];
      if (btn.innerHTML.includes("SAVE")) (<HTMLButtonElement>btn).click();
    }
  }

  static getSavedIDs() {
    let savedIDs: number[] = [];
    for (let i = 0; i < this.editedContent.length; i++) {
      const content = this.editedContent[i];
      savedIDs.push(parseInt(content.id));
    }
    return savedIDs;
  }

  static addEditedContent(newContent: { [key: string]: any }) {
    if (Object.keys(newContent).length < 1) return;
    let found: number = -1;
    for (let i = 0; i < this.editedContent.length; i++) {
      let content = this.editedContent[i];
      if (content.id === newContent.id) {
        this.editedContent[i] = newContent;
        found = i;
        break;
      }
    }
    if (found < 0 && Object.keys(newContent).length > 1) {
      this.editedContent.push(newContent);
      // this.editingIDs = this.editingIDs.filter(e => e != newContent["id"]);
    }

    if (found >= 0 && Object.keys(newContent).length === 1) {
      this.editedContent.splice(found, 1);
    }
  }

  static refresh() {
    this.editingIDs.sort((a, b) => a - b);
    this.deletedIDs.sort((a, b) => a - b);
    this.deletedDisplay.innerText = <string>(
      (this.deletedIDs.length > 0 ? this.deletedIDs : "none")
    );
    this.editedDisplay.innerText = <string>(
      (this.editedContent.length > 0 ? this.getSavedIDs() : "none")
    );
  }
}
