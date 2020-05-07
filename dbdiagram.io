//----------------------------------------------//

TABLE MedicalService as ms {
  id INT [pk, increment]
  name VARCHAR [NOT NULL]
  price INT [NOT NULL]
  noOfPatients INT [NOT NULL]
  noOfRooms INT [NOT NULL]
}

//----------------------------------------------//

TABLE MedicalStaff {
  id INT [pk, increment, NOT NULL]
  ssn VARCHAR [NOT NULL]
  name VARCHAR [NOT NULL]
  gender VARCHAR [NOT NULL]
  dob DATE [NOT NULL]
  age INT [NOT NULL]
  phone VARCHAR [NOT NULL]
  yearOfExperience INT [NOT NULL]
  specialty VARCHAR [NOT NULL]
  assignRoomNo INT
  assignRoomType VARCHAR 
}

//----------------------------------------------//

TABLE Medicine {
    id INT [pk, increment, NOT NULL]
    name VARCHAR [NOT NULL]
    origin VARCHAR [NOT NULL]
    price INT [NOT NULL]
    expireDay DATE [NOT NULL]
}

//----------------------------------------------//

TABLE Patient {
    id INT [pk, increment, NOT NULL]
    ssn VARCHAR [NOT NULL]
    name VARCHAR [NOT NULL]
    gender VARCHAR [NOT NULL]
    dob DATE [NOT NULL]
    age INT [NOT NULL]
    phone VARCHAR [NOT NULL]
    noOfVisits INT [NOT NULL]
}

//----------------------------------------------//

TABLE Prescription {
    id INT [pk, increment, NOT NULL]
    totalCost INT [NOT NULL]
    prescribeFor INT [NOT NULL]
    prescribedBy_id INT [NOT NULL]
}

//----------------------------------------------//

TABLE PrescriptionMedicine {
    prescriptions_id INT [pk, NOT NULL]
    medicines_id INT [pk, NOT NULL]
    quantity INT [NOT NULL]
}

//----------------------------------------------//

TABLE Room {
    number INT [pk, NOT NULL]
    type VARCHAR [pk, NOT NULL]
    noOfStaffs INT [NOT NULL]
    medicalService_id INT
}

//----------------------------------------------//

TABLE Visit {
    id INT [pk, increment, NOT NULL]
    prescription_id INT
    totalCost INT [NOT NULL]
    payMethod VARCHAR [NOT NULL]
    paid TINYINT [NOT NULL]
    checkIn DATETIME [NOT NULL]
    checkOut DATETIME [NOT NULL]
    byPatient_id INT
    requestedService_id INT
}

Ref: MedicalStaff.assignRoomType > Room.type
Ref: MedicalStaff.assignRoomNo > Room.number
Ref: Prescription.prescribedBy_id > MedicalStaff.id
Ref: PrescriptionMedicine.prescriptions_id > Prescription.id
Ref: PrescriptionMedicine.medicines_id > Medicine.id
Ref: Room.medicalService_id > MedicalService.id
Ref: Visit.byPatient_id > Patient.id
Ref: Visit.requestedService_id > MedicalService.id
Ref: Visit.prescription_id > Prescription.id