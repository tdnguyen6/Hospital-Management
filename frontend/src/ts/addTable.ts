import { Helper } from "./helper.js";

export class AddTable {
  static table: HTMLElement = <HTMLElement>document.getElementById("add-table");
  static headers: string[];
  static examples: any[];
  static addBtn: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("addBtn")
  );

  static commitBtn: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("commitAddBtn")
  );

  static display(tableName: string) {
    this.headers = addController[`header${tableName}`];
    this.examples = addController[`example${tableName}`];
    this.displayHeaders();
    this.responsiveHeaders();
    this.addFunction();
  }

  static responsiveHeaders() {
    let style: HTMLStyleElement = <HTMLStyleElement>(
      document.getElementById("responsive-header-add")
    );
    let styleSheet: CSSStyleSheet = <CSSStyleSheet>style.sheet;
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      styleSheet.deleteRule(i);
    }
    let rule =
      "@media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px)  {";
    for (let i = 0; i < this.headers.length; i++) {
      rule += `#add-table td:nth-of-type(${i + 1}):before { content: "${
        this.headers[i]
      }"; }\n`;
    }
    styleSheet.insertRule(rule);
  }

  static displayHeaders() {
    let thead: HTMLElement = document.createElement("thead");
    AddTable.table.appendChild(thead);
    let headerRow: HTMLElement = document.createElement("tr");
    thead.appendChild(headerRow);
    let exampleRow: HTMLElement = document.createElement("tr");
    thead.appendChild(exampleRow);
    Helper.fillOneRow(this.headers, headerRow, "th");
    Helper.fillOneRow(this.examples, exampleRow, "td");
  }

  static addFunction() {
    let tbody: HTMLElement;
    if (this.table.childElementCount < 2) {
      tbody = document.createElement("tbody");
      this.table.appendChild(tbody);
    } else {
      tbody = <HTMLElement>this.table.children[1];
    }

    this.addBtn.onclick = () => {
      let addingRow = document.createElement("tr");
      addingRow.setAttribute("contenteditable", "true");
      tbody.appendChild(addingRow);
      let content: string[] = [];
      for (let i = 0; i < this.headers.length; i++) {
        content.push("");
      }
      Helper.fillOneRow(content, addingRow, "td");
    };
  }
}

let MedicalService = {
  name: "serviceC",
  price: 1234,
  visits: [1, 2, 3],
  locations: [
    [1, "ER"],
    [2, "ICU"],
    /*         {
          "number": 1,
          "type": "ER"
      },
      {
          "number": 2,
          "type": "ICU"
      } */
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

function prepareMedicalService(input: { [key: string]: any }[] ): boolean {
  return false;
}
 
function prepareMedicalStaff(input: { [key: string]: any }[] ): boolean {
  return false;
}
 
function prepareMedicine(input: { [key: string]: any }[] ): boolean {
  return false;
}
 
function preparePatient(input: { [key: string]: any }[] ): boolean {
  return false;
}
 
function preparePrescription(input: { [key: string]: any }[] ): boolean {
  return false;
}
 
function preparePrescriptionMedicine(input: { [key: string]: any }[] ): boolean {
  return false;
}
 
function prepareRoom(input: { [key: string]: any }[] ): boolean {
  return false;
}
 
function prepareVisit(input: { [key: string]: any }[] ): boolean {
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
