import { Helper } from "./helper.js";
let AddTable = /** @class */ (() => {
    class AddTable {
        static display(tableName) {
            this.reset();
            this.headers = addController[`header${tableName}`];
            this.examples = addController[`example${tableName}`];
            this.displayHeaders();
            this.responsiveHeaders();
            this.addFunction();
        }
        static responsiveHeaders() {
            let style = (document.getElementById("responsive-header-add"));
            let styleSheet = style.sheet;
            for (let i = 0; i < styleSheet.cssRules.length; i++) {
                styleSheet.deleteRule(i);
            }
            let rule = "@media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px)  {";
            for (let i = 0; i < this.headers.length; i++) {
                rule += `#add-table td:nth-of-type(${i + 1}):before { content: "${this.headers[i]}"; }\n`;
            }
            styleSheet.insertRule(rule);
        }
        static displayHeaders() {
            let thead = document.createElement("thead");
            AddTable.table.appendChild(thead);
            let headerRow = document.createElement("tr");
            thead.appendChild(headerRow);
            let exampleRow = document.createElement("tr");
            thead.appendChild(exampleRow);
            Helper.fillOneRow(this.headers, headerRow, "th");
            Helper.fillOneRow(this.examples, exampleRow, "td");
        }
        static addFunction() {
            let tbody;
            if (this.table.childElementCount < 2) {
                tbody = document.createElement("tbody");
                this.table.appendChild(tbody);
            }
            else {
                tbody = this.table.children[1];
            }
            this.addBtn.onclick = () => {
                let addingRow = document.createElement("tr");
                addingRow.setAttribute("contenteditable", "true");
                tbody.appendChild(addingRow);
                let content = [];
                for (let i = 0; i < this.headers.length; i++) {
                    content.push("");
                }
                Helper.fillOneRow(content, addingRow, "td");
            };
        }
        static reset() {
            while (this.table.childElementCount > 0) {
                this.table.children[0].remove();
            }
        }
    }
    AddTable.table = document.getElementById("add-table");
    AddTable.addBtn = (document.getElementById("addBtn"));
    AddTable.commitBtn = (document.getElementById("commitAddBtn"));
    return AddTable;
})();
export { AddTable };
let MedicalService = {
    name: "serviceC",
    price: 1234,
    visits: [1, 2, 3],
    locations: [
        [1, "ER"],
        [2, "ICU"],
    ],
};
let MedicalStaff = {
    ssn: "774-23-0561",
    name: "TestNurse",
    gender: "Male",
    dob: "1982-10-01",
    phone: "(447) 9458136",
    role: "Nurse",
    yearOfExperience: 4,
    assignedRoom: [5, "ICU"],
    /* {
        "number": 5,
        "type": "ICU"
    }, */
    specialty: "Anaesthetics",
    prescriptions: [1, 2, 3, 4, 5, 6],
};
let Medicine = {
    name: "Test Medicine",
    origin: "Armenia",
    price: 327,
    expireDay: "2023-05-07",
};
let Patient = {
    ssn: "146-17-9160",
    name: "Test Patient",
    gender: "Male",
    dob: "1960-06-28",
    phone: "(865) 6224415",
    visits: [1, 2, 3, 4, 5],
};
let Prescription = {
    totalCost: 969696,
    prescribeFor: 6,
    prescribedBy: 9,
};
let PrescriptionMedicine = {
    prescription: 11,
    medicine: 11,
    quantity: 69,
};
let Room = {
    number: 1,
    type: "ER",
    medicalService: 2,
    assignedStaffs: [1, 2, 3],
};
let Visit = {
    payMethod: "card",
    byPatient: 51,
};
function prepareMedicalService(input) {
    return false;
}
function prepareMedicalStaff(input) {
    return false;
}
function prepareMedicine(input) {
    return false;
}
function preparePatient(input) {
    return false;
}
function preparePrescription(input) {
    return false;
}
function preparePrescriptionMedicine(input) {
    return false;
}
function prepareRoom(input) {
    return false;
}
function prepareVisit(input) {
    return false;
}
const addController = {
    headerMedicalService: Object.keys(MedicalService),
    headerMedicalStaff: Object.keys(MedicalStaff),
    headerMedicine: Object.keys(Medicine),
    headerPatient: Object.keys(Patient),
    headerPrescription: Object.keys(Prescription),
    headerPrescriptionMedicine: Object.keys(PrescriptionMedicine),
    headerRoom: Object.keys(Room),
    headerVisit: Object.keys(Visit),
    exampleMedicalService: Object.values(MedicalService),
    exampleMedicalStaff: Object.values(MedicalStaff),
    exampleMedicine: Object.values(Medicine),
    examplePatient: Object.values(Patient),
    examplePrescription: Object.values(Prescription),
    examplePrescriptionMedicine: Object.values(PrescriptionMedicine),
    exampleRoom: Object.values(Room),
    exampleVisit: Object.values(Visit),
    prepareMedicalService: prepareMedicalService,
    prepareMedicalStaff: prepareMedicalStaff,
    prepareMedicine: prepareMedicine,
    preparePatient: preparePatient,
    preparePrescription: preparePrescription,
    preparePrescriptionMedicine: preparePrescriptionMedicine,
    prepareRoom: prepareRoom,
    prepareVisit: prepareVisit
};
