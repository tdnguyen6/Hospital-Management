let MedicalService = {
    "name": "serviceC",
    "price": 1234,
    "visits": [1, 2, 3],
    "locations": [
        [1, "ER"],
        [2, "ICU"]
/*         {
            "number": 1,
            "type": "ER"
        },
        {
            "number": 2,
            "type": "ICU"
        } */
    ]
};

let MedicalStaff = {
    "ssn": "774-23-0561",
    "name": "TestNurse",
    "gender": "Male",
    "dob": "1982-10-01",
    "phone": "(447) 9458136",
    "role": "Nurse",
    "yearOfExperience": 4,
    "assignedRoom": [5, "ICU"],
    /* {
        "number": 5,
        "type": "ICU"
    }, */
    "specialty": "Anaesthetics",
    "prescriptions": [1, 2, 3, 4, 5, 6]
};

let Medicine = {
    "name": "Test Medicine",
    "origin": "Armenia",
    "price": 327,
    "expireDay": "2023-05-07"
};
let Patient = {
    "ssn": "146-17-9160",
    "name": "Test Patient",
    "gender": "Male",
    "dob": "1960-06-28",
    "phone": "(865) 6224415",
    "visits": [1, 2, 3, 4, 5]
};
let Prescription = {
    "totalCost": 969696,
    "prescribeFor": 6,
    "prescribedBy": 9
};
let PrescriptionMedicine = {
    "prescription": 11,
    "medicine": 11,
    "quantity": 69
};
let Room = {
    "number" : 1,
    "type": "ER",
    "medicalService" : 2,
    "assignedStaffs" : [1, 2, 3]
};
let Visit = {
    "payMethod": "card",
    "byPatient": 51
};

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
}

export { addController };