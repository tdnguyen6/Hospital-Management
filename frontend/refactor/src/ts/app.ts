import { AdminPanel } from "./adminPanel.js";
import { DAO } from "./dataAccess.js";
import { DataTable } from "./dataTable.js";
import { TopPanel } from "./topPanel.js";

export { tableName };
export { MyDAO };

let tableName = "Patient";
let MyDAO : DAO = new DAO(tableName);

async function test() {
  let data = await MyDAO.getData();
  let dataTable = new DataTable(data);
  // console.log(Helper.tableToJSON(DataTable.table, 2, 3));
  TopPanel.setUp(dataTable);
  TopPanel.setUpRunReset(dataTable);
  AdminPanel.refresh();
}


test();
