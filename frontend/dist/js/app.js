import { Spinner } from "./spin.js";
import { addController } from "./addController.js";

let app = document.getElementById("app");
let loader = document.getElementById("loading");
let dataTable = app.children.data;
let pagination = app.children.pagination;
let edit = document.createElement("button");
let del = document.createElement("button");
let add = document.createElement("button");
let sortUpBtn = document.createElement("button");
let sortDownBtn = document.createElement("button");
let deletedIDs = [];
let editedIDs = [];
let editedContent = [];
let editedContentFirst = [];
let headers = [];
let sortAsc = [];
let sortDsc = [];
let tableName = "Patient";
let commitDelBtn = document.getElementById("commitDelBtn");
let commitEditBtn = document.getElementById("commitEditBtn");
let commitAddBtn = document.getElementById("commitAddBtn");

commitEditBtn.onclick = () => {
    let confirmed = confirm(`Are you sure you want to edit these ids: ${editedIDs}`);
    if (confirmed) {
        alert("yeah");
        // send PATCH request with data editedIDs
    }
}
commitDelBtn.onclick = () => {
    let confirmed = confirm(`Are you sure you want to delete these ids: ${deletedIDs}`);
    if (confirmed) {
        alert("yeah");
        // send DELETE request with data editedIDs
    }
}
commitAddBtn.onclick = () => {
    let confirmed = confirm();
    if (confirmed) {
        alert("yeah");
        console.log(newRecords());
    }
}

add.classList.add("add");
del.classList.add("del");
edit.classList.add("edit");
del.innerHTML = "DELETE " + '<i class="fas fa-trash-alt"></i>';
edit.innerHTML = "EDIT " + '<i class="fas fa-edit"></i>';
add.innerHTML = "ADD " + '<i class="fas fa-plus-square"></i>';

sortUpBtn.innerHTML = '<i class="fas fa-sort-up"></i>';
sortDownBtn.innerHTML = '<i class="fas fa-sort-down"></i>';

function isReadOnly() {
    if (sessionStorage.isReadOnly == null)
        return true;
    return JSON.parse(sessionStorage.isReadOnly);
}

function jsDom2HTML(element) {
    let wrap = document.createElement("div");
    wrap.appendChild(element.cloneNode(true));
    return wrap.innerHTML;
}

function rowToJSON(col, excludeRule = (col) => { return false }) {
    let res = {};
    let row = col.parentElement;
    let childrenArr = Array.from(row.children);

    for (let i = 0; i < childrenArr.length; i++) {
        if (!excludeRule(childrenArr[i])) {
            res[headers[i]] = childrenArr[i].innerText.replace(/(\r\n|\n|\r)/gm, "");
        }
    }
    return res;
}

function newRecords() {
    let res = [];
    let addTable = document.getElementById("add-table");
    let rows = Array.from(addTable.children).splice(2);
    rows.forEach(row => {
        res.push(rowToJSON(row.children[0]));
    });
    return res;
}

async function fetchAPI(table, conditions = {}, method = "GET", dataBody = {}) {
    let url = "http://hms-api.atwebpages.com/hms/" + table;
    // let url = "http://localhost:9999/hms/" + table;
    // let url = "../" + table + ".json";
    let entries = Object.entries(conditions);
    if (entries.length > 0) {
        url += "?";
        entries.forEach((e) => {
            url += e[0] + "=" + e[1];
            if (entries.indexOf(e) != entries.length - 1) {
                url += "&";
            }
        });
    }
    let data;

    showLoadingOnly();
    try {
        let resp = await fetch(url);
        let json_resp = await resp.json();
        data = json_resp.data;
    } catch (err) {
        console.log(err);
        alert(err);
    } finally {
        removeLoading();
    }
    return data;
}

function showLoadingOnly() {
    let spinner = document.createElement("div");
    createSpinner(spinner);
    loader.appendChild(spinner);
    Array.from(app.children).forEach(child => {
        child.classList.add("display-none");
    });
    loader.classList.remove("display-none");
}

function removeLoading() {
    let spinner = loader.children[1];
    loader.removeChild(spinner);
    Array.from(app.children).forEach(child => {
        child.classList.remove("display-none");
    });
    loader.classList.add("display-none");
    if (isReadOnly()) hideAdminFunctions();
}

function fillTableRow(datas, row, firstTime = false, isHeader = false) {
    datas.forEach((data) => {
        let elementType = isHeader ? "th" : "td";
        let col;
        if (firstTime) {
            col = document.createElement(elementType);
            // col.style.width = "min-content";
            row.appendChild(col);
        } else col = row.children[datas.indexOf(data)];
        col.innerHTML = data;
    });
}

function configHeaders(headers) {
    let headerRow = document.createElement("tr");
    dataTable.appendChild(headerRow);
    let content = [];
    headers.forEach(header => content.push(sortButtons(header)));
    fillTableRow(content, headerRow, true, true);
    return headers;
}

function configContent(datas) {
    for (let i = 0; i < datas.length; i++) {
        let dataContent = Object.values(datas[i]);
        if (!isReadOnly()) dataContent.push(jsDom2HTML(del) + jsDom2HTML(edit));
        let dataRow = document.createElement("tr");
        if (i >= 10) dataRow.classList.add("display-none");
        dataTable.appendChild(dataRow);
        fillTableRow(dataContent, dataRow, true);
    }
}

function responsiveHeader(headers, id) {
    let style = document.createElement("style");
    document.head.appendChild(style);
    let rule =
        "@media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px)  {";
    for (let i = 0; i < headers.length; i++) {
        const header = headers[i];
        rule += `#${id} td:nth-of-type(${i + 1}):before { content: "${header}"; }\n`;
    }
    rule += "}";
    style.sheet.insertRule(rule);
}

function configPagination(datas) {
    let num_of_paginations = Math.ceil(datas.length / 10);
    for (let i = 0; i < num_of_paginations; i++) {
        let button = document.createElement("button");
        pagination.appendChild(button);
        button.innerText = i;
        button.onclick = () => {
            let infoBanner = document.querySelector("#app p");
            let end = i * 10 + 9 > datas.length ? datas.length : i * 10 + 9;
            infoBanner.innerText = `Showing records ${i * 10} to ${end}`;
            let dataRows = Array.from(document.querySelectorAll("#data tr")).splice(1);
            dataRows.forEach((row) => {
                row.classList.add("display-none");
            });
            let displayRow = dataRows.splice(i * 10, 10);
            displayRow.forEach((row) => {
                if (!row.classList.contains("deleted"))
                    row.classList.remove("display-none");
            });
        };
    }
    pagination.children[0].click();
}

function configAdminFunctions() {
    let adminFunctions = document.getElementById("adminFunctions");
    adminFunctions.classList.remove("display-none");
}

function refreshEditedID() {
    let editedIDDisplay = document.getElementById("edited-id");
    if (editedIDs.length > 0)
        editedIDDisplay.innerText = editedIDs.sort((a, b) => a > b);
    else
        editedIDDisplay.innerText = "none";
}

function pushEditedID(id) {
    id = parseInt(id);
    if (!editedIDs.includes(id)) editedIDs.push(id);
    refreshEditedID();
}

function pushDeletedID(id) {
    id = parseInt(id);
    if (!deletedIDs.includes(id)) deletedIDs.push(id);
    let deletedIDDisplay = document.getElementById("deleted-id");
    deletedIDDisplay.innerHTML = deletedIDs.sort((a, b) => a > b);
}

function createSpinner(element) {
    var opts = {
        lines: 20, // The number of lines to draw
        length: 80, // The length of each line
        width: 15, // The line thickness
        radius: 10, // The radius of the inner circle
        scale: 1, // Scales overall size of the spinner
        corners: 1, // Corner roundness (0..1)
        color: '#000000', // CSS color or array of colors
        fadeColor: 'transparent', // CSS color or array of colors
        speed: 1, // Rounds per second
        rotate: 90, // The rotation offset
        animation: 'spinner-line-shrink', // The CSS animation name for the lines
        direction: 1, // 1: clockwise, -1: counterclockwise
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        className: 'spinner', // The CSS class to assign to the spinner
        top: '50%', // Top position relative to parent
        left: '50%', // Left position relative to parent
        shadow: '0 0 1px white', // Box-shadow for the lines
        position: 'absolute' // Element positioning
    };

    var spinner = new Spinner(opts).spin(element);
}

function configEditBtns() {
    let editBtns = document.querySelectorAll(".edit");
    editBtns.forEach((btn) => (btn.onclick = () => {
        let td = btn.parentElement;
        let tr = td.parentElement;
        let isEditable = tr.getAttribute("contenteditable");
        if (isEditable == null || isEditable == "false") {
            let before = rowToJSON(btn.parentElement, (col) => {
                return col == btn.parentElement;
            });
            if (isEditable == null) pushEditedContentFirst(before);
            tr.setAttribute("contenteditable", true);
            let idCol = tr.children[0];
            idCol.setAttribute("contenteditable", false);
            btn.innerHTML = "SAVE " + '<i class="far fa-check-circle"></i>';
        } else {
            tr.setAttribute("contenteditable", false);
            btn.innerHTML = "EDIT " + '<i class="fas fa-edit"></i>';
            let after = rowToJSON(btn.parentElement, (col) => {
                return col == btn.parentElement;
            });
            updateEditedContent(after);
        }
    }));
}

function pushEditedContentFirst(content) {
    if (!editedContentFirst.some(e => e.id === content.id)) {
        editedContentFirst.push(content);
    }
}

function updateEditedContent(content) {
    function removeCurrentEditedContent() {
        if (editedContent.some(e => e.id === content.id)) {
            let indexInEditedIDs = editedIDs.indexOf(content.id);
            editedIDs.splice(indexInEditedIDs, 1);
            editedContent = editedContent.filter(c => c.id !== content.id);
            refreshEditedID();
        }
    }

    removeCurrentEditedContent();

    for (let i = 0; i < editedContentFirst.length; i++) {
        if (editedContentFirst[i].id === content.id) {
            for (const key in content) {
                if (content.hasOwnProperty(key)) {
                    if (key !== "id" && editedContentFirst[i][key] === content[key]) {
                        delete content[key];
                    }
                }
            }
            break;
        }
    };

    if (Object.keys(content).length !== 1) {
        pushEditedID(content.id);
        editedContent.push(content);
    }
    console.log("Right after pushing: \n");
    console.log(editedContent);
}

function configDelBtns() {
    let delBtns = document.querySelectorAll(".del");
    delBtns.forEach(
        (btn) =>
            (btn.onclick = () => {
                let td = btn.parentElement;
                let tr = td.parentElement;
                tr.classList.add("display-none", "deleted");
                pushDeletedID(getRecordID(btn));
            })
    );
}

function configAddBtn() {
    let headers = addController[`header${tableName}`];
    let examples = addController[`example${tableName}`];
    let addBtn = document.getElementById("addBtn");
    let addTable = document.getElementById("add-table");
    let headerRow = document.createElement("tr");
    fillTableRow(headers, headerRow, true, true);
    addTable.appendChild(headerRow);
    let exampleRow = document.createElement("tr");
    fillTableRow(examples, exampleRow, true);
    addTable.appendChild(exampleRow);
    addBtn.onclick = () => {
        let addingRow = document.createElement("tr");
        addingRow.setAttribute("contenteditable", "true");
        addTable.appendChild(addingRow);
        let content = [];
        for (let i = 0; i < headers.length; i++) {
            content.push("");
        }
        fillTableRow(content, addingRow, true);
        responsiveHeader(headers, "add-table");
    };

}
function showAddTable(addBtn, headers) {
    let headersNoId = headers.filter(header => header !== "id");
    let addingTable = document.createElement("table");
    let headerRow = document.createElement("tr");
    fillTableRow(headersNoId, headerRow, true, true);
    addingTable.appendChild(headerRow);
    let addingRow = document.createElement("tr");
    addingRow.setAttribute("contenteditable", "true");
    addingTable.appendChild(addingRow);
    let content = [];
    for (let i = 0; i < headersNoId.length; i++) {
        content.push("");
    }
    fillTableRow(content, addingRow, true);
    addBtn.parentElement.appendChild(addingTable);
    // addDiv.children.clear();
    // responsiveHeader(headers, "adding");
}

function getRecordID(operationBtn) {
    let idColIndex;

    for (let i = 0; i < headers.length; i++) {
        const header = headers[i];
        if (header == "id") {
            idColIndex = headers.indexOf(header);
            break;
        }
    }

    let row = operationBtn.parentElement.parentElement;
    return row.children[idColIndex].innerText;
}

function display(datas) {
    headers = Object.keys(datas[0]);
    if (!isReadOnly()) headers.push("Operations");

    configHeaders(headers);
    configContent(datas);
    configPagination(datas);
    configSortButtons();

    if (!isReadOnly()) {
        configAdminFunctions();
        configAddBtn();
        configDelBtns();
        configEditBtns();
    }

    responsiveHeader(headers, "data");
}

function hideAdminFunctions() {
    document.getElementById("panelSeparator").classList.add("display-none");
    document.getElementById("adminFunctions").classList.add("display-none");
}

function sortButtons(header) {
    let headerSortDiv = document.createElement("div");
    headerSortDiv.classList.add("sort-btn-div");
    let headerDiv = document.createElement("div");
    let buttonDiv = document.createElement("div");
    headerSortDiv.appendChild(headerDiv);
    headerSortDiv.appendChild(buttonDiv);
    headerDiv.innerHTML = header;
    buttonDiv.appendChild(sortUpBtn);
    buttonDiv.appendChild(document.createElement("br"));
    buttonDiv.appendChild(sortDownBtn);
    return jsDom2HTML(headerSortDiv);
}

function configSortButtons() {
    let sortBtnDivs = document.querySelectorAll(".sort-btn-div");
    let resetSortingBtn = document.getElementById("reset-sorting");
    let sortingBtn = document.getElementById("sorting");
    sortBtnDivs.forEach(sortBtnDiv => {
        let header = sortBtnDiv.children[0].innerText;
        let upBtn = sortBtnDiv.children[1].children[0];
        let downBtn = sortBtnDiv.children[1].children[2];
        upBtn.onclick = () => {
            if (!sortAsc.includes(header)) sortAsc.push(header);
            downBtn.disabled = true;
            resetSortingBtn.disabled = false;
            sortingBtn.disabled = false;
        };

        downBtn.onclick = () => {
            if (!sortDsc.includes(header)) sortDsc.push(header);
            upBtn.disabled = true;
            resetSortingBtn.disabled = false;
            sortingBtn.disabled = false;
        };
    });
    resetSortingBtn.onclick = () => {
        sortBtnDivs.forEach(sortBtnDiv => {
            let upBtn = sortBtnDiv.children[1].children[0];
            let downBtn = sortBtnDiv.children[1].children[2];
            upBtn.disabled = false;
            downBtn.disabled = false;
            sortingBtn.disabled = true;
            resetSortingBtn.disabled = true;
        });
        sortAsc = [];
        sortDsc = [];
        rewriteTable();
    };

    sortingBtn.onclick = () => {
        rewriteTable(true);
    };
}

async function rewriteTable() {
    let sort = {};
    if (sortAsc.length > 0) sort["sortAsc"] = sortAsc;
    if (sortDsc.length > 0) sort["sortDsc"] = sortDsc;
    let datas = await fetchAPI(tableName, sort);
    for (let i = 0; i < datas.length; i++) {
        let dataContent = Object.values(datas[i]);
        let dataRow = dataTable.children[i + 1];
        fillTableRow(dataContent, dataRow);
    }
}
async function appRun(table) {
    let datas = await fetchAPI(table);
    display(datas, true);
}

appRun(tableName);
