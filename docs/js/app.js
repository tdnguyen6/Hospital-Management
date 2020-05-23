import { AdminPanel } from "./adminPanel.js";
import { DAO } from "./dataAccess.js";
import { MainTable } from "./mainTable.js";
import { TopPanel } from "./topPanel.js";
import { AddTable } from "./addTable.js";
import { Helper } from "./helper.js";
let daoSuite = {
    PatientDAO: new DAO("Patient", ["id"]),
    MedicalStaffDAO: new DAO("MedicalStaff", ["id"]),
    MedicalServiceDAO: new DAO("MedicalService", ["id"]),
    MedicineDAO: new DAO("Medicine", ["id"]),
    PrescriptionDAO: new DAO("Prescription", ["id"]),
    PrescriptionMedicineDAO: new DAO("PrescriptionMedicine", [
        "prescription",
        "medicine",
    ]),
    RoomDAO: new DAO("Room", ["number", "type"]),
    VisitDAO: new DAO("Visit", ["id"]),
};
async function run(dao) {
    await dao.fetchData();
    AddTable.display(dao.table);
    TopPanel.setUp(dao);
    if (Helper.isAdmin())
        AdminPanel.setUp(dao);
    MainTable.display(dao);
}
run(daoSuite["PrescriptionMedicineDAO"]);
let roleSpans = document.querySelectorAll(".role");
roleSpans.forEach((e) => (e.innerText =
    sessionStorage.user == null ? "Home" : sessionStorage.user));
let tableNameElement = document.querySelectorAll(".tableName");
tableNameElement.forEach((e) => {
    e.onclick = () => {
        let tableName = e.innerText.replace(/\s+/g, "");
        run(daoSuite[`${tableName}DAO`]);
    };
});
