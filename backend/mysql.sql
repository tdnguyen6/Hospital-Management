CREATE TABLE MedicalService (
     id INT AUTO_INCREMENT NOT NULL, 
     name VARCHAR(50) NOT NULL, 
     price INT NOT NULL, 
     noOfPatients INT NOT NULL, 
     noOfRooms INT NOT NULL, 
     PRIMARY KEY(id)
) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB;

CREATE TABLE Room (
     number INT NOT NULL, 
     type VARCHAR(50) NOT NULL, 
     noOfStaffs INT NOT NULL, 
     medicalService_id INT DEFAULT NULL, 
     INDEX IDX_D2ADFEA51AEE5591 (medicalService_id), 
     PRIMARY KEY(number, type)
) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB;

CREATE TABLE Visit (
     id INT AUTO_INCREMENT NOT NULL, 
     prescription_id INT DEFAULT NULL, 
     totalCost INT NOT NULL, 
     payMethod VARCHAR(4) NOT NULL, 
     paid TINYINT(1) NOT NULL, 
     checkIn DATETIME NOT NULL, 
     checkOut DATETIME NOT NULL, 
     byPatient_id INT DEFAULT NULL, 
     requestedService_id INT DEFAULT NULL, 
     INDEX IDX_82BFC63DFD8DA151 (byPatient_id), 
     INDEX IDX_82BFC63D1FE3EB26 (requestedService_id), 
     UNIQUE INDEX UNIQ_82BFC63D93DB413D (prescription_id), 
     PRIMARY KEY(id)
) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB;

CREATE TABLE Prescription (
     id INT AUTO_INCREMENT NOT NULL, 
     totalCost INT NOT NULL, 
     prescribeFor INT NOT NULL, 
     prescribedBy_id INT DEFAULT NULL, 
     INDEX IDX_78E632124ED775C (prescribedBy_id), 
     PRIMARY KEY(id)
) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB;

CREATE TABLE MedicalStaff (
     id INT AUTO_INCREMENT NOT NULL, 
     ssn VARCHAR(30) NOT NULL, 
     name VARCHAR(30) NOT NULL, 
     gender VARCHAR(7) NOT NULL, 
     dob DATE NOT NULL, 
     age INT NOT NULL, 
     phone VARCHAR(12) NOT NULL, 
     role VARCHAR(30) NOT NULL, 
     yearOfExperience INT NOT NULL, 
     specialty VARCHAR(30) NOT NULL, 
     assignRoomNo INT DEFAULT NULL, 
     assignRoomType VARCHAR(50) DEFAULT NULL, 
     INDEX IDX_9548DD5D8962AD80E7D5589B (assignRoomNo, assignRoomType), 
     PRIMARY KEY(id)
) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB;

CREATE TABLE PrescriptionMedicine (
     prescription_id INT NOT NULL, 
     medicine_id INT NOT NULL, 
     quantity INT NOT NULL, 
     INDEX IDX_B858D5D393DB413D (prescription_id), 
     INDEX IDX_B858D5D32F7D140A (medicine_id), 
     PRIMARY KEY(prescription_id, medicine_id)
) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB;

CREATE TABLE Medicine (
     id INT AUTO_INCREMENT NOT NULL, 
     name VARCHAR(30) NOT NULL, 
     origin VARCHAR(30) NOT NULL, 
     price INT NOT NULL, 
     expireDay DATE NOT NULL, 
     PRIMARY KEY(id)
) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB;

CREATE TABLE Patient (
     id INT AUTO_INCREMENT NOT NULL, 
     ssn VARCHAR(30) NOT NULL, 
     name VARCHAR(30) NOT NULL, 
     gender VARCHAR(7) NOT NULL, 
     dob DATE NOT NULL, 
     age INT NOT NULL, 
     phone VARCHAR(12) NOT NULL, 
     noOfVisits INT NOT NULL, 
     PRIMARY KEY(id)
) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB;

ALTER TABLE Room ADD CONSTRAINT FK_D2ADFEA51AEE5591 FOREIGN KEY (medicalService_id) REFERENCES MedicalService (id);
ALTER TABLE Visit ADD CONSTRAINT FK_82BFC63DFD8DA151 FOREIGN KEY (byPatient_id) REFERENCES Patient (id);
ALTER TABLE Visit ADD CONSTRAINT FK_82BFC63D1FE3EB26 FOREIGN KEY (requestedService_id) REFERENCES MedicalService (id);
ALTER TABLE Visit ADD CONSTRAINT FK_82BFC63D93DB413D FOREIGN KEY (prescription_id) REFERENCES Prescription (id);
ALTER TABLE Prescription ADD CONSTRAINT FK_78E632124ED775C FOREIGN KEY (prescribedBy_id) REFERENCES MedicalStaff (id);
ALTER TABLE MedicalStaff ADD CONSTRAINT FK_9548DD5D8962AD80E7D5589B FOREIGN KEY (assignRoomNo, assignRoomType) REFERENCES Room (number, type);
ALTER TABLE PrescriptionMedicine ADD CONSTRAINT FK_B858D5D393DB413D FOREIGN KEY (prescription_id) REFERENCES Prescription (id) ON DELETE CASCADE;
ALTER TABLE PrescriptionMedicine ADD CONSTRAINT FK_B858D5D32F7D140A FOREIGN KEY (medicine_id) REFERENCES Medicine (id) ON DELETE CASCADE;
