import { AdminPanel } from "./adminPanel.js";
import { DAO } from "./dataAccess.js";
import { MainTable } from "./mainTable.js";
import { TopPanel } from "./topPanel.js";
import { AddTable } from "./addTable.js";
export { tableName };
let tableName = "MedicalStaff";
let MyDAO = new DAO(tableName, ["id"]);
async function run() {
    await MyDAO.fetchData();
    TopPanel.setUp(MyDAO);
    AdminPanel.setUp(MyDAO);
    MainTable.display(MyDAO);
    AddTable.display(MyDAO.table);
}
// MyDAO.fetchData("", "DELETE", [55]);
run();
