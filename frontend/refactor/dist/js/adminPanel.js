import { DataTable } from "./dataTable.js";
let AdminPanel = /** @class */ (() => {
    class AdminPanel {
        static supervise() {
            let tbody = DataTable.table.children[1];
            for (let i = 0; i < tbody.childElementCount; i++) {
                let row = tbody.children[i];
                this.superviseDelete(row);
                this.superviseEdit(row);
            }
        }
        static superviseDelete(row) {
            if (row.classList.contains("deleted"))
                row.classList.remove("deleted");
            let id = row.children[0].innerHTML;
            if (this.deletedIDs.includes(parseInt(id))) {
                row.classList.add("deleted");
                let btn = row.children[row.childElementCount - 1].children[0].children[1]
                    .children[0];
                if (btn.innerHTML.includes("DELETE"))
                    btn.click();
            }
        }
        static superviseEdit(row) {
            if (row.classList.contains("editing"))
                row.classList.remove("editing");
            if (row.classList.contains("saved"))
                row.classList.remove("saved");
            let id = row.children[0].innerHTML;
            if (this.editingIDs.includes(parseInt(id))) {
                row.classList.add("editing");
                let btn = row.children[row.childElementCount - 1].children[0].children[0]
                    .children[0];
                if (btn.innerHTML.includes("EDIT"))
                    btn.click();
            }
            if (this.getSavedIDs().includes(parseInt(id))) {
                row.classList.add("saved");
                let btn = row.children[row.childElementCount - 1].children[0].children[0]
                    .children[0];
                if (btn.innerHTML.includes("SAVE"))
                    btn.click();
            }
        }
        static getSavedIDs() {
            let savedIDs = [];
            for (let i = 0; i < this.editedContent.length; i++) {
                const content = this.editedContent[i];
                savedIDs.push(parseInt(content.id));
            }
            return savedIDs;
        }
        static addEditedContent(newContent) {
            if (Object.keys(newContent).length < 1)
                return;
            let found = -1;
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
            this.deletedDisplay.innerText = ((this.deletedIDs.length > 0 ? this.deletedIDs : "none"));
            this.editedDisplay.innerText = ((this.editedContent.length > 0 ? this.getSavedIDs() : "none"));
        }
    }
    AdminPanel.editedContent = [];
    AdminPanel.deletedIDs = [];
    AdminPanel.editingIDs = [];
    AdminPanel.deletedDisplay = (document.getElementById("deleted-id"));
    AdminPanel.editedDisplay = (document.getElementById("edited-id"));
    return AdminPanel;
})();
export { AdminPanel };
