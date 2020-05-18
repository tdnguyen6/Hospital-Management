
 The following SQL statements will be executed:

CREATE TABLE MedicalService (
 id INT IDENTITY NOT NULL, 
 name NVARCHAR(50) NOT NULL, 
 price INT NOT NULL, 
 noOfPatients INT NOT NULL, 
 noOfRooms INT NOT NULL, 
 PRIMARY KEY (id)
);
 
CREATE TABLE Room (
 number INT NOT NULL, 
 type NVARCHAR(50) NOT NULL, 
 noOfStaffs INT NOT NULL, 
 medicalService_id INT, 
 PRIMARY KEY (number, type)
);

CREATE INDEX IDX_D2ADFEA51AEE5591 ON Room (medicalService_id);

CREATE TABLE Visit (
 id INT IDENTITY NOT NULL, 
 prescription_id INT, 
 totalCost INT NOT NULL, 
 payMethod NVARCHAR(4) NOT NULL, 
 paid BIT NOT NULL, 
 checkIn DATETIME2(6) NOT NULL, 
 checkOut DATETIME2(6), 
 byPatient_id INT, 
 requestedService_id INT, 
 PRIMARY KEY (id)
);

CREATE INDEX IDX_82BFC63DFD8DA151 ON Visit (byPatient_id);
CREATE INDEX IDX_82BFC63D1FE3EB26 ON Visit (requestedService_id);
CREATE UNIQUE INDEX UNIQ_82BFC63D93DB413D ON Visit (prescription_id) WHERE prescription_id IS NOT NULL;
     
CREATE TABLE Prescription (
 id INT IDENTITY NOT NULL, 
 totalCost INT NOT NULL, 
 prescribeFor INT NOT NULL, 
 prescribedBy_id INT, 
 PRIMARY KEY (id)
);
     
CREATE INDEX IDX_78E632124ED775C ON Prescription (prescribedBy_id);

CREATE TABLE MedicalStaff (
 id INT IDENTITY NOT NULL, 
 ssn NVARCHAR(30) NOT NULL, 
 name NVARCHAR(30) NOT NULL, 
 gender NVARCHAR(7) NOT NULL, 
 dob DATE NOT NULL, 
 age INT NOT NULL, 
 phone NVARCHAR(12) NOT NULL, 
 role NVARCHAR(30) NOT NULL, 
 yearOfExperience INT NOT NULL, 
 specialty NVARCHAR(30) NOT NULL, 
 assignRoomNo INT, 
 assignRoomType NVARCHAR(50), 
 PRIMARY KEY (id)
);

CREATE INDEX IDX_9548DD5D8962AD80E7D5589B ON MedicalStaff (assignRoomNo, assignRoomType);

CREATE TABLE PrescriptionMedicine (
 prescription_id INT NOT NULL, 
 medicine_id INT NOT NULL, 
 quantity INT NOT NULL, 
 PRIMARY KEY (prescription_id, medicine_id)
);
     
CREATE INDEX IDX_B858D5D393DB413D ON PrescriptionMedicine (prescription_id);
CREATE INDEX IDX_B858D5D32F7D140A ON PrescriptionMedicine (medicine_id);

CREATE TABLE Medicine (
 id INT IDENTITY NOT NULL, 
 name NVARCHAR(30) NOT NULL, 
 origin NVARCHAR(30) NOT NULL, 
 price INT NOT NULL, 
 expireDay DATE NOT NULL, 
 PRIMARY KEY (id)
);

CREATE TABLE Patient (
 id INT IDENTITY NOT NULL, 
 ssn NVARCHAR(30) NOT NULL, 
 name NVARCHAR(30) NOT NULL, 
 gender NVARCHAR(7) NOT NULL, 
 dob DATE NOT NULL, 
 age INT NOT NULL, 
 phone NVARCHAR(12) NOT NULL, 
 noOfVisits INT NOT NULL, 
 PRIMARY KEY (id)
);
     
ALTER TABLE Room ADD CONSTRAINT FK_D2ADFEA51AEE5591 FOREIGN KEY (medicalService_id) REFERENCES MedicalService (id);
ALTER TABLE Visit ADD CONSTRAINT FK_82BFC63DFD8DA151 FOREIGN KEY (byPatient_id) REFERENCES Patient (id);
ALTER TABLE Visit ADD CONSTRAINT FK_82BFC63D1FE3EB26 FOREIGN KEY (requestedService_id) REFERENCES MedicalService (id);
ALTER TABLE Visit ADD CONSTRAINT FK_82BFC63D93DB413D FOREIGN KEY (prescription_id) REFERENCES Prescription (id);
ALTER TABLE Prescription ADD CONSTRAINT FK_78E632124ED775C FOREIGN KEY (prescribedBy_id) REFERENCES MedicalStaff (id);
ALTER TABLE MedicalStaff ADD CONSTRAINT FK_9548DD5D8962AD80E7D5589B FOREIGN KEY (assignRoomNo, assignRoomType) REFERENCES Room (number, type);
ALTER TABLE PrescriptionMedicine ADD CONSTRAINT FK_B858D5D393DB413D FOREIGN KEY (prescription_id) REFERENCES Prescription (id) ON DELETE CASCADE;
ALTER TABLE PrescriptionMedicine ADD CONSTRAINT FK_B858D5D32F7D140A FOREIGN KEY (medicine_id) REFERENCES Medicine (id) ON DELETE CASCADE;
