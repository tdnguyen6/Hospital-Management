import { MainTable } from "./mainTable.js";
import { Helper } from "./helper.js";
import { TopPanel } from "./topPanel.js";
import { AddTable } from "./addTable.js";
let AdminPanel = /** @class */ (() => {
    class AdminPanel {
        static setUp(dao) {
            this.dao = dao;
            if (Helper.isAdmin()) {
                this.adminPanel.classList.remove("display-none");
                this.refresh();
            }
            else {
                this.adminPanel.classList.add("display-none");
            }
            this.setUpCommitBtns();
        }
        static setUpCommitBtns() {
            AddTable.commitBtn.onclick = () => {
                let addedContent = Helper.tableToJSON(AddTable.table);
                addedContent.forEach((content) => {
                    Object.entries(content).forEach((entry) => {
                        if (entry[0].match(/locations/i) != null) {
                            let res = [];
                            entry[1].split(";").forEach((e) => {
                                let room = e.split(",");
                                res.push({
                                    number: Helper.sanitize(room[0]),
                                    type: Helper.sanitize(room[1]),
                                });
                            });
                            content[entry[0]] = res;
                        }
                        else if (entry[0].match(/room/i) != null) {
                            let res = {};
                            let room = entry[1].split(",");
                            content[entry[0]] = {
                                number: Helper.sanitize(room[0]),
                                type: Helper.sanitize(room[1]),
                            };
                        }
                        else if (entry[1].toString().includes(",")) {
                            content[entry[0]] = entry[1].split(",").map(Number);
                        }
                    });
                });
                if (addedContent.length <= 0)
                    alert("No added content");
                else {
                    let ok = confirm(`Are you sure you want to add those content?`);
                    if (ok) {
                        this.dao
                            .fetchMessage("", "POST", addedContent)
                            .then((mess) => alert(mess))
                            .then(() => this.dao.clearCache())
                            .then(() => (this.dao.deletedIDs = []))
                            .then(() => TopPanel.reset.click());
                    }
                }
            };
            this.commitEditBtn.onclick = () => {
                if (this.dao.getSavedIDs().length <= 0)
                    alert("No deleted IDs found!");
                else {
                    let ok = confirm(`Are you sure you want to edit these ids: ${Helper.ObjArrToString(this.dao.getSavedIDs())}?`);
                    if (ok) {
                        this.dao
                            .fetchMessage("", "PATCH", this.dao.editedContent)
                            .then((mess) => alert(mess))
                            .then(() => this.dao.clearCache())
                            .then(() => (this.dao.deletedIDs = []))
                            .then(() => TopPanel.reset.click());
                    }
                }
            };
            this.commitDelBtn.onclick = () => {
                if (this.dao.deletedIDs.length <= 0)
                    alert("No deleted IDs found!");
                else {
                    let ok = confirm(`Are you sure you want to delete these ids: ${Helper.ObjArrToString(this.dao.deletedIDs)}?`);
                    if (ok) {
                        this.dao
                            .fetchMessage("", "DELETE", this.dao.deletedIDs)
                            .then((mess) => alert(mess))
                            .then(() => this.dao.clearCache())
                            .then(() => (this.dao.deletedIDs = []))
                            .then(() => TopPanel.reset.click());
                    }
                }
            };
        }
        static supervise() {
            let tbody = MainTable.table.children[1];
            for (let i = 0; i < tbody.childElementCount; i++) {
                let row = tbody.children[i];
                this.superviseDelete(row);
                this.superviseEdit(row);
            }
        }
        static superviseDelete(row) {
            if (row.classList.contains("deleted"))
                row.classList.remove("deleted");
            let keys = {};
            this.dao.getKeysIndex().forEach((i) => {
                keys[this.dao.getHeaders()[i]] = Helper.sanitize(row.children[i].innerHTML);
            });
            if (this.dao.deletedIDs
                .map((s) => JSON.stringify(s))
                .some((s) => s == JSON.stringify(keys))) {
                // if (this.dao.deletedIDs.includes(keys)) {
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
            let keys = {};
            this.dao.getKeysIndex().forEach((i) => {
                keys[this.dao.getHeaders()[i]] = Helper.sanitize(row.children[i].innerHTML);
            });
            if (this.dao.editingIDs
                .map((s) => JSON.stringify(s))
                .some((s) => s == JSON.stringify(keys))) {
                // if (this.dao.editingIDs.includes(keys)) {
                row.classList.add("editing");
                let btn = row.children[row.childElementCount - 1].children[0].children[0]
                    .children[0];
                if (btn.innerHTML.includes("EDIT"))
                    btn.click();
            }
            if (this.dao
                .getSavedIDs()
                .map((s) => JSON.stringify(s))
                .some((s) => s == JSON.stringify(keys))) {
                row.classList.add("saved");
                let btn = row.children[row.childElementCount - 1].children[0].children[0]
                    .children[0];
                if (btn.innerHTML.includes("SAVE"))
                    btn.click();
                for (let i = 0; i < this.dao.getHeaders().length; i++) {
                    const header = this.dao.getHeaders()[i];
                    const rowEditedContent = this.dao.editedContent.find((data) => {
                        if (Helper.matchKeys(keys, data))
                            return data;
                    });
                    if (rowEditedContent === null || rowEditedContent === void 0 ? void 0 : rowEditedContent.hasOwnProperty(header)) {
                        row.children[i].innerHTML = rowEditedContent[header];
                    }
                }
            }
        }
        static addEditedContent(newContent, dao) {
            if (Object.keys(newContent).length < 1)
                return;
            let found = -1;
            for (let i = 0; i < this.dao.editedContent.length; i++) {
                let content = this.dao.editedContent[i];
                if (Helper.matchKeys(dao.keys, newContent)) {
                    this.dao.editedContent[i] = newContent;
                    found = i;
                    break;
                }
            }
            if (found < 0 && Object.keys(newContent).length > dao.keys.length) {
                this.dao.editedContent.push(newContent);
                // this.editingIDs = this.editingIDs.filter(e => e != newContent["id"]);
            }
            if (found >= 0 && Object.keys(newContent).length <= dao.keys.length) {
                this.dao.editedContent.splice(found, 1);
            }
        }
        static refresh() {
            this.dao.editingIDs.sort((a, b) => a[0] - b[0]);
            this.dao.deletedIDs.sort((a, b) => a[0] - b[0]);
            this.deletedDisplay.innerText = ((this.dao.deletedIDs.length > 0
                ? Helper.ObjArrToString(this.dao.deletedIDs)
                : "none"));
            this.editedDisplay.innerText = ((this.dao.editedContent.length > 0
                ? Helper.ObjArrToString(this.dao.getSavedIDs())
                : "none"));
        }
    }
    AdminPanel.deletedDisplay = (document.getElementById("deleted-id"));
    AdminPanel.editedDisplay = (document.getElementById("edited-id"));
    AdminPanel.adminPanel = (document.getElementById("adminPanel"));
    AdminPanel.commitEditBtn = (document.getElementById("commitEditBtn"));
    AdminPanel.commitDelBtn = (document.getElementById("commitDelBtn"));
    return AdminPanel;
})();
export { AdminPanel };
