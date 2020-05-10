PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE MedicalService (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(50) NOT NULL, price INTEGER NOT NULL, noOfPatients INTEGER NOT NULL, noOfRooms INTEGER NOT NULL);
INSERT INTO MedicalService VALUES(1,'clinical evaluation',100,9,2);
INSERT INTO MedicalService VALUES(2,'endoscopic management of bleeding',200,13,5);
INSERT INTO MedicalService VALUES(3,'endoscopy',300,8,2);
INSERT INTO MedicalService VALUES(4,'endoscopic ultrasound',400,17,3);
INSERT INTO MedicalService VALUES(5,'enhanced urinalysis',500,3,4);
INSERT INTO MedicalService VALUES(6,'xploratory laparotomy',600,16,1);
INSERT INTO MedicalService VALUES(7,'flow cytometry',700,2,3);
INSERT INTO MedicalService VALUES(8,'Fluorodeoxyglucose positron emission',800,7,1);
INSERT INTO MedicalService VALUES(9,'gastric decontamination',900,18,3);
INSERT INTO MedicalService VALUES(10,'haemodialysis',1000,2,5);
INSERT INTO MedicalService VALUES(11,'radiographical',1100,4,3);
INSERT INTO MedicalService VALUES(12,'radiotherapy',1200,18,2);
INSERT INTO MedicalService VALUES(13,'rapid antigen detection test',1300,11,3);
INSERT INTO MedicalService VALUES(14,'direct antiglobulin (Coombs'') test',1400,16,5);
INSERT INTO MedicalService VALUES(15,'Faecal occult blood testing',1500,12,5);
INSERT INTO MedicalService VALUES(16,'full blood count (FBC)',1600,17,4);
INSERT INTO MedicalService VALUES(17,'Gamma Phage Assay',1700,9,2);
INSERT INTO MedicalService VALUES(18,'LFT LFTs (liver function tests)',1800,15,2);
INSERT INTO MedicalService VALUES(19,'liver function tests',1900,14,2);
INSERT INTO MedicalService VALUES(20,'monospot test',2000,20,5);
INSERT INTO MedicalService VALUES(21,'serviceX',6969,0,0);
INSERT INTO MedicalService VALUES(27,'service27',272727,2,4);
INSERT INTO MedicalService VALUES(28,'service28',1234,3,2);
INSERT INTO MedicalService VALUES(29,'service29',1234,3,2);
INSERT INTO MedicalService VALUES(30,'serviceA',1234,3,2);
INSERT INTO MedicalService VALUES(31,'serviceB',1234,3,2);
INSERT INTO MedicalService VALUES(32,'serviceC',1234,3,2);
INSERT INTO MedicalService VALUES(33,'serviceA',1234,3,2);
INSERT INTO MedicalService VALUES(34,'serviceB',1234,3,2);
INSERT INTO MedicalService VALUES(35,'serviceA',1234,3,2);
INSERT INTO MedicalService VALUES(36,'serviceB',1234,3,2);
INSERT INTO MedicalService VALUES(37,'serviceA',1234,0,0);
CREATE TABLE MedicalStaff (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ssn VARCHAR(30) NOT NULL, name VARCHAR(30) NOT NULL, gender VARCHAR(7) NOT NULL, dob DATE NOT NULL, age INTEGER NOT NULL, phone VARCHAR(12) NOT NULL, role VARCHAR(30) NOT NULL, yearOfExperience INTEGER NOT NULL, specialty VARCHAR(30) NOT NULL, assignRoomNo INTEGER DEFAULT NULL, assignRoomType VARCHAR(50) DEFAULT NULL, CONSTRAINT FK_9548DD5D8962AD80E7D5589B FOREIGN KEY (assignRoomNo, assignRoomType) REFERENCES Room (number, type) NOT DEFERRABLE INITIALLY IMMEDIATE);
INSERT INTO MedicalStaff VALUES(1,'774-23-0561','Cass Whordley','Male','1982-10-01',37,'(447) 9458136','Nurse',4,'Anaesthetics',1,'ER');
INSERT INTO MedicalStaff VALUES(2,'339-58-5826','Stanford Simmonds','Male','1984-11-03',35,'(380) 2544076','Doctor',4,'Anaesthetics',2,'ER');
INSERT INTO MedicalStaff VALUES(3,'301-22-5366','Jeromy Biggerdike','Male','1982-09-01',37,'(283) 4414619','Doctor',2,'Neurology',3,'ER');
INSERT INTO MedicalStaff VALUES(4,'511-98-4308','Benyamin Teggin','Male','1980-11-29',39,'(806) 4609609','Nurse',5,'Cardiology',4,'ER');
INSERT INTO MedicalStaff VALUES(5,'514-59-4529','Cathryn Goodson','Female','1986-10-30',33,'(379) 1170435','Nurse',5,'Anaesthetics',5,'ER');
INSERT INTO MedicalStaff VALUES(6,'765-02-0978','Jessalyn Panner','Female','1990-09-12',29,'(481) 8691844','Wardboy',3,'Cardiology',6,'ER');
INSERT INTO MedicalStaff VALUES(7,'808-86-0481','Shelley Marlow','Female','1969-05-06',51,'(337) 8165907','Doctor',4,'Cardiology',7,'ER');
INSERT INTO MedicalStaff VALUES(8,'267-96-2866','Colene Well','Female','1969-06-25',50,'(558) 6721554','Nurse',2,'Neurology',8,'ER');
INSERT INTO MedicalStaff VALUES(9,'385-38-1728','Kienan Skate','Male','1999-02-02',21,'(898) 9965570','Doctor',3,'Ear nose and throat',9,'ER');
INSERT INTO MedicalStaff VALUES(10,'131-09-5075','Lyndsey Dumbrill','Female','1983-08-10',36,'(168) 9203304','Wardboy',4,'Anaesthetics',10,'ER');
INSERT INTO MedicalStaff VALUES(11,'119-93-0249','Linet Aneley','Female','1968-11-06',51,'(551) 4970563','Doctor',2,'Neurology',11,'ER');
INSERT INTO MedicalStaff VALUES(12,'835-49-7938','Waring Wetherick','Male','1967-12-24',52,'(310) 8519888','Wardboy',5,'Ear nose and throat',12,'ER');
INSERT INTO MedicalStaff VALUES(13,'816-48-6801','Goddart Samson','Male','1982-02-17',38,'(368) 2942169','Doctor',3,'Ear nose and throat',13,'ER');
INSERT INTO MedicalStaff VALUES(14,'159-29-8926','Jamill Hawkin','Male','1986-04-06',34,'(272) 6509093','Nurse',5,'Neurology',14,'ER');
INSERT INTO MedicalStaff VALUES(15,'628-57-8697','Babbette Neath','Female','1987-11-11',32,'(624) 9089085','Nurse',2,'Cardiology',15,'ER');
INSERT INTO MedicalStaff VALUES(16,'124-85-4677','Valera Melson','Female','1996-12-08',23,'(311) 1575759','Doctor',3,'Neurology',16,'ER');
INSERT INTO MedicalStaff VALUES(17,'508-81-4612','Charla Josilowski','Female','1994-12-12',25,'(355) 3692545','Nurse',4,'Anaesthetics',17,'ER');
INSERT INTO MedicalStaff VALUES(18,'329-10-0325','Sadie Dranfield','Female','1969-06-18',50,'(727) 8887725','Nurse',5,'Anaesthetics',18,'ER');
INSERT INTO MedicalStaff VALUES(19,'554-50-9029','Joannes Collopy','Female','1981-05-19',38,'(519) 5784679','Wardboy',3,'Ear nose and throat',19,'ER');
INSERT INTO MedicalStaff VALUES(20,'647-97-2207','Lina Leagas','Female','1976-10-12',43,'(616) 1554219','Doctor',3,'Neurology',20,'ER');
INSERT INTO MedicalStaff VALUES(21,'469-40-7181','Cristina Eykelhof','Female','1984-01-28',36,'(386) 5916469','Wardboy',2,'Anaesthetics',1,'Operating Theater');
INSERT INTO MedicalStaff VALUES(22,'408-83-0235','Brittani Paggitt','Female','1992-09-21',27,'(825) 9383238','Nurse',3,'Anaesthetics',2,'Operating Theater');
INSERT INTO MedicalStaff VALUES(23,'566-39-3704','Stefania Jefford','Female','1968-09-15',51,'(837) 4775473','Wardboy',5,'Neurology',3,'Operating Theater');
INSERT INTO MedicalStaff VALUES(24,'342-65-2710','Collette Oughton','Female','1969-06-09',50,'(177) 7659675','Wardboy',2,'Anaesthetics',4,'Operating Theater');
INSERT INTO MedicalStaff VALUES(25,'309-13-2919','Corey Ardy','Female','1995-12-12',24,'(930) 3596751','Doctor',5,'Neurology',5,'Operating Theater');
INSERT INTO MedicalStaff VALUES(26,'422-29-3187','Imogen Daftor','Female','1960-09-24',59,'(182) 8954018','Doctor',5,'Cardiology',6,'Operating Theater');
INSERT INTO MedicalStaff VALUES(27,'266-98-0317','Pietro Hydes','Male','1968-06-30',51,'(547) 5470837','Wardboy',4,'Anaesthetics',7,'Operating Theater');
INSERT INTO MedicalStaff VALUES(28,'894-04-5441','Milli Elsley','Female','1982-10-22',37,'(724) 8780113','Doctor',2,'Anaesthetics',8,'Operating Theater');
INSERT INTO MedicalStaff VALUES(29,'460-12-5995','Colas Dougary','Male','1979-06-12',40,'(377) 2484633','Nurse',2,'Ear nose and throat',9,'Operating Theater');
INSERT INTO MedicalStaff VALUES(30,'596-78-3745','Oates Shapter','Male','1999-11-05',20,'(129) 2151626','Nurse',3,'Cardiology',10,'Operating Theater');
INSERT INTO MedicalStaff VALUES(31,'812-21-9978','Leah Ambrogini','Female','1961-02-03',59,'(876) 6556962','Wardboy',5,'Cardiology',11,'Operating Theater');
INSERT INTO MedicalStaff VALUES(32,'324-29-7148','Amandy Pickavant','Female','1969-12-26',50,'(463) 7879414','Wardboy',5,'Ear nose and throat',12,'Operating Theater');
INSERT INTO MedicalStaff VALUES(33,'126-50-6277','Emmit Brackpool','Male','1978-11-18',41,'(491) 6682384','Nurse',5,'Cardiology',13,'Operating Theater');
INSERT INTO MedicalStaff VALUES(34,'236-27-4359','Ellsworth Culwen','Male','1972-09-16',47,'(821) 8788823','Nurse',5,'Anaesthetics',14,'Operating Theater');
INSERT INTO MedicalStaff VALUES(35,'890-83-2019','Corey Broggio','Male','1971-08-30',48,'(985) 2399276','Nurse',4,'Neurology',15,'Operating Theater');
INSERT INTO MedicalStaff VALUES(36,'536-93-6414','Dorita Marthen','Female','1976-03-01',44,'(405) 7245781','Nurse',2,'Ear nose and throat',16,'Operating Theater');
INSERT INTO MedicalStaff VALUES(37,'767-41-3677','Hinda Statter','Female','1990-06-22',29,'(157) 9830531','Wardboy',4,'Neurology',17,'Operating Theater');
INSERT INTO MedicalStaff VALUES(38,'336-38-9441','Sallyanne Schole','Female','1969-03-12',51,'(654) 5187292','Doctor',4,'Cardiology',18,'Operating Theater');
INSERT INTO MedicalStaff VALUES(39,'520-64-5863','Fancie Hamson','Female','1983-03-19',37,'(323) 1118547','Wardboy',4,'Ear nose and throat',19,'Operating Theater');
INSERT INTO MedicalStaff VALUES(40,'707-15-9007','Tani Peepall','Female','1975-10-25',44,'(462) 5771480','Nurse',4,'Cardiology',20,'Operating Theater');
INSERT INTO MedicalStaff VALUES(41,'392-31-1706','Lemmy Oxtiby','Male','1985-08-21',34,'(196) 8485643','Doctor',4,'Anaesthetics',1,'ICU');
INSERT INTO MedicalStaff VALUES(42,'483-82-3682','Abbott Reddish','Male','1964-08-15',55,'(608) 6167614','Doctor',2,'Neurology',2,'ICU');
INSERT INTO MedicalStaff VALUES(43,'446-42-9849','Myranda Wyrall','Female','1985-04-26',35,'(975) 3138752','Nurse',2,'Anaesthetics',3,'ICU');
INSERT INTO MedicalStaff VALUES(44,'601-89-6032','Giovanni Inde','Male','1963-12-29',56,'(310) 7328763','Nurse',3,'Cardiology',4,'ICU');
INSERT INTO MedicalStaff VALUES(45,'416-42-0702','Wynn Pietruszewicz','Male','1984-06-13',35,'(970) 3457087','Wardboy',2,'Neurology',5,'ICU');
INSERT INTO MedicalStaff VALUES(46,'376-74-5751','Rodie Howle','Female','1976-04-10',44,'(201) 2897041','Wardboy',4,'Cardiology',6,'ICU');
INSERT INTO MedicalStaff VALUES(47,'224-05-5519','Muriel Moncur','Female','1987-01-27',33,'(166) 1130103','Nurse',5,'Cardiology',7,'ICU');
INSERT INTO MedicalStaff VALUES(48,'411-94-8339','Padget Wyman','Male','1974-07-04',45,'(417) 8303139','Doctor',5,'Anaesthetics',8,'ICU');
INSERT INTO MedicalStaff VALUES(49,'457-11-7868','Norean Croke','Female','1976-10-23',43,'(845) 7611286','Doctor',5,'Cardiology',9,'ICU');
INSERT INTO MedicalStaff VALUES(50,'574-52-8381','Gerhardine Mouget','Female','1997-04-06',23,'(693) 2085219','Nurse',5,'Anaesthetics',10,'ICU');
INSERT INTO MedicalStaff VALUES(51,'774-23-0561','TestNurse','Male','1982-10-01',37,'(447) 9458136','Nurse',4,'Anaesthetics',5,'ICU');
INSERT INTO MedicalStaff VALUES(52,'774-23-0561','Test Doctor','Male','1982-10-01',37,'(447) 9458136','Doctor',4,'Anaesthetics',5,'ICU');
CREATE TABLE Medicine (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(30) NOT NULL, origin VARCHAR(30) NOT NULL, price INTEGER NOT NULL, expireDay DATE NOT NULL);
INSERT INTO Medicine VALUES(1,'hydrocodone','Ukraine',282,'2023-03-20');
INSERT INTO Medicine VALUES(2,'Benzocaine','Cyprus',271,'2025-03-21');
INSERT INTO Medicine VALUES(3,'repaglinide','Croatia',482,'2024-03-12');
INSERT INTO Medicine VALUES(4,'Guaifenesin','Armenia',327,'2023-05-07');
INSERT INTO Medicine VALUES(5,'amlodipine','China',662,'2023-03-14');
INSERT INTO Medicine VALUES(6,'Avobenzone','China',600,'2021-02-19');
INSERT INTO Medicine VALUES(7,'Ethynodiol','Armenia',146,'2022-10-04');
INSERT INTO Medicine VALUES(8,'Alcohol','Indonesia',367,'2023-10-28');
INSERT INTO Medicine VALUES(9,'Acetaminophen','China',224,'2021-05-12');
INSERT INTO Medicine VALUES(10,'Helium','Thailand',771,'2023-07-29');
INSERT INTO Medicine VALUES(11,'SODIUMCHLORIDE','Argentina',932,'2021-12-09');
INSERT INTO Medicine VALUES(12,'Enalapril','Brazil',613,'2023-06-01');
INSERT INTO Medicine VALUES(13,'Nortriptyline','Portugal',727,'2025-04-09');
INSERT INTO Medicine VALUES(14,'Acetaminophen','China',465,'2021-10-27');
INSERT INTO Medicine VALUES(15,'ESTROGENS','United States',936,'2021-12-31');
INSERT INTO Medicine VALUES(16,'Simvastatin','Palestinian Territory',518,'2025-10-30');
INSERT INTO Medicine VALUES(17,'LISINOPRIL','Indonesia',731,'2021-11-20');
INSERT INTO Medicine VALUES(18,'Vancomycin','Russia',359,'2023-01-13');
INSERT INTO Medicine VALUES(19,'Colistimethate','China',218,'2022-03-14');
INSERT INTO Medicine VALUES(20,'Witch','Russia',952,'2022-12-21');
INSERT INTO Medicine VALUES(21,'Megestrol','Iraq',442,'2021-11-23');
INSERT INTO Medicine VALUES(22,'Sodium','China',595,'2023-02-05');
INSERT INTO Medicine VALUES(23,'Acetaminophen','China',670,'2024-05-12');
INSERT INTO Medicine VALUES(24,'Naproxen','Madagascar',482,'2022-12-22');
INSERT INTO Medicine VALUES(25,'Lamotrigine','Argentina',675,'2023-01-23');
INSERT INTO Medicine VALUES(26,'DIMETHICONE','Honduras',137,'2024-07-27');
INSERT INTO Medicine VALUES(27,'Benzocaine','China',134,'2022-01-07');
INSERT INTO Medicine VALUES(28,'AVOBENZONEOCTINOXATE','Chile',854,'2024-07-08');
INSERT INTO Medicine VALUES(29,'Octinoxate','China',476,'2024-11-21');
INSERT INTO Medicine VALUES(30,'Lidocaine','Brazil',150,'2022-03-05');
INSERT INTO Medicine VALUES(31,'Nortriptyline','Philippines',370,'2025-10-24');
INSERT INTO Medicine VALUES(32,'FERRUM','United States',692,'2021-12-07');
INSERT INTO Medicine VALUES(33,'simvastatin','Myanmar',164,'2025-08-24');
INSERT INTO Medicine VALUES(34,'Medroxyprogesterone','Indonesia',605,'2025-05-09');
INSERT INTO Medicine VALUES(35,'Rivastigmine','Dominican Republic',197,'2024-02-07');
INSERT INTO Medicine VALUES(36,'Diphenhydramine','Russia',295,'2021-04-25');
INSERT INTO Medicine VALUES(37,'Candesartan','Malaysia',254,'2023-03-13');
INSERT INTO Medicine VALUES(38,'acetaminophen','Ethiopia',304,'2020-12-17');
INSERT INTO Medicine VALUES(39,'Diclofenac','Syria',161,'2024-08-20');
INSERT INTO Medicine VALUES(40,'Tricolsan','Ukraine',958,'2025-07-12');
INSERT INTO Medicine VALUES(41,'butalbital','Czech Republic',722,'2025-10-24');
INSERT INTO Medicine VALUES(42,'Guaifenesin','Poland',796,'2023-09-11');
INSERT INTO Medicine VALUES(43,'Mirtazapine','Finland',826,'2021-04-05');
INSERT INTO Medicine VALUES(44,'DEXTROSE','China',302,'2024-06-02');
INSERT INTO Medicine VALUES(45,'Acetaminophen','Argentina',892,'2025-04-16');
INSERT INTO Medicine VALUES(46,'HYDROMORPHONE','China',750,'2022-05-09');
INSERT INTO Medicine VALUES(47,'HYDROCODONE','Poland',266,'2025-06-23');
INSERT INTO Medicine VALUES(48,'Ranitidine','Argentina',841,'2025-10-02');
INSERT INTO Medicine VALUES(49,'lamotrigine','Indonesia',278,'2023-11-09');
INSERT INTO Medicine VALUES(50,'TITANIUM','Sweden',171,'2021-10-16');
INSERT INTO Medicine VALUES(51,'Test Medicine','Armenia',327,'2023-05-07');
CREATE TABLE Patient (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ssn VARCHAR(30) NOT NULL, name VARCHAR(30) NOT NULL, gender VARCHAR(7) NOT NULL, dob DATE NOT NULL, age INTEGER NOT NULL, phone VARCHAR(12) NOT NULL, noOfVisits INTEGER NOT NULL);
INSERT INTO Patient VALUES(1,'173-01-6440','Corby Janosevic','Male','1961-03-06',59,'(883) 5945079',28);
INSERT INTO Patient VALUES(2,'391-52-3626','Deane Elgar','Male','1963-12-04',56,'(853) 8066778',25);
INSERT INTO Patient VALUES(3,'225-28-3284','Sharona Matkin','Female','2013-11-02',6,'(957) 3148124',15);
INSERT INTO Patient VALUES(4,'279-38-2458','Diego Francescotti','Male','1979-02-10',41,'(772) 6731977',22);
INSERT INTO Patient VALUES(5,'146-17-9160','Vasili Struther','Male','1960-06-28',59,'(865) 6224415',29);
INSERT INTO Patient VALUES(6,'818-43-5291','Sigismond Woollacott','Male','1976-08-23',43,'(639) 4324112',21);
INSERT INTO Patient VALUES(7,'352-88-1319','Adi Cordobes','Female','1971-11-14',48,'(887) 2125981',7);
INSERT INTO Patient VALUES(8,'284-18-1555','Guntar Dine-Hart','Male','1986-07-03',33,'(786) 5103129',7);
INSERT INTO Patient VALUES(9,'851-36-4931','Humphrey Testo','Male','1973-08-27',46,'(964) 6922354',2);
INSERT INTO Patient VALUES(10,'336-66-7511','Susie Paoletto','Female','2005-03-31',15,'(515) 5866387',30);
INSERT INTO Patient VALUES(11,'847-40-3720','Morganica Brito','Female','2015-09-08',4,'(208) 1553683',24);
INSERT INTO Patient VALUES(12,'606-19-3816','Vernor Dikle','Male','1967-11-18',52,'(671) 6213008',29);
INSERT INTO Patient VALUES(13,'265-85-7336','Wallache Verryan','Male','2009-11-28',10,'(680) 9228653',11);
INSERT INTO Patient VALUES(14,'571-68-4365','Kaine Dudek','Male','2014-06-28',5,'(653) 9865884',18);
INSERT INTO Patient VALUES(15,'827-86-0690','Justinn MacAughtrie','Female','2017-03-16',3,'(167) 3725154',6);
INSERT INTO Patient VALUES(16,'513-64-2897','Brandice Sturgis','Female','2013-01-21',7,'(880) 5825410',15);
INSERT INTO Patient VALUES(17,'225-09-1410','Abran Milch','Male','1991-12-11',28,'(524) 5602734',7);
INSERT INTO Patient VALUES(18,'750-60-7317','Hillery Sanches','Male','1965-10-22',54,'(209) 7019043',11);
INSERT INTO Patient VALUES(19,'321-11-0008','Fletcher Crozier','Male','1988-04-20',32,'(949) 7144542',25);
INSERT INTO Patient VALUES(20,'284-37-9489','Eula Passey','Female','1988-02-16',32,'(856) 7476937',13);
INSERT INTO Patient VALUES(21,'342-66-4071','Park Roos','Male','1987-08-21',32,'(604) 3973345',21);
INSERT INTO Patient VALUES(22,'601-38-1070','Mal Scrafton','Male','1995-12-06',24,'(717) 5067074',14);
INSERT INTO Patient VALUES(23,'531-03-7029','Ferdinande Kettridge','Female','1982-12-02',37,'(346) 3988266',2);
INSERT INTO Patient VALUES(24,'447-91-9769','Angelina Dowden','Female','2005-11-04',14,'(940) 3428798',21);
INSERT INTO Patient VALUES(25,'461-28-2529','Brigitte Morison','Female','2019-02-18',1,'(859) 6475243',1);
INSERT INTO Patient VALUES(26,'148-19-6308','Laetitia Castaner','Female','1987-12-21',32,'(415) 5036295',20);
INSERT INTO Patient VALUES(27,'432-96-7960','Charley Ashcroft','Male','1960-02-12',60,'(836) 4326169',28);
INSERT INTO Patient VALUES(28,'343-85-1832','Lynnelle Cocher','Female','1968-10-11',51,'(776) 9405386',8);
INSERT INTO Patient VALUES(29,'558-98-0904','Clarence Remington','Male','2017-03-05',3,'(207) 4287355',19);
INSERT INTO Patient VALUES(30,'495-38-1644','Fedora Edgcombe','Female','1994-10-06',25,'(809) 7929023',8);
INSERT INTO Patient VALUES(31,'241-40-7682','Jordan Barnewall','Female','1999-08-30',20,'(152) 2701791',12);
INSERT INTO Patient VALUES(32,'219-35-1406','Stanfield Bliss','Male','1998-11-16',21,'(845) 1578087',26);
INSERT INTO Patient VALUES(33,'770-35-6249','Georgie Bayford','Male','1961-01-20',59,'(242) 5717059',7);
INSERT INTO Patient VALUES(34,'161-43-6646','Demetri Dudson','Male','2004-01-10',16,'(781) 3761705',9);
INSERT INTO Patient VALUES(35,'734-94-1605','Mikkel Ibbetson','Male','1967-11-01',52,'(466) 2997840',2);
INSERT INTO Patient VALUES(36,'103-52-1183','Tedra Bingell','Female','1987-05-22',32,'(675) 3352577',24);
INSERT INTO Patient VALUES(37,'633-26-2221','Selie Arstingall','Female','2015-12-06',4,'(397) 1767599',6);
INSERT INTO Patient VALUES(38,'664-70-2411','Ravid Blackie','Male','1996-06-26',23,'(310) 8710881',19);
INSERT INTO Patient VALUES(39,'106-94-2516','Rube Percy','Male','2016-08-03',3,'(975) 7252959',5);
INSERT INTO Patient VALUES(40,'429-16-0713','Claudell Melia','Male','1974-08-08',45,'(941) 3487669',19);
INSERT INTO Patient VALUES(41,'426-37-1331','Thorin Crier','Male','1992-04-11',28,'(384) 4431132',22);
INSERT INTO Patient VALUES(42,'858-74-7751','Barbi Measham','Female','2006-04-23',14,'(416) 6655593',7);
INSERT INTO Patient VALUES(43,'592-73-9290','Rogers Rablan','Male','1983-11-30',36,'(137) 7951967',19);
INSERT INTO Patient VALUES(44,'774-40-0348','Maighdiln Grimsdell','Female','2009-03-13',11,'(486) 4811324',21);
INSERT INTO Patient VALUES(45,'129-49-7088','Guillemette Milsted','Female','1986-11-05',33,'(658) 8827394',6);
INSERT INTO Patient VALUES(46,'352-26-1116','Ossie McLese','Male','1979-05-18',40,'(750) 4725000',9);
INSERT INTO Patient VALUES(47,'357-81-1724','Hendrick Thompsett','Male','1967-11-03',52,'(607) 6910390',7);
INSERT INTO Patient VALUES(48,'730-82-9874','Corrinne L'' Anglois','Female','2011-08-15',8,'(891) 8900404',27);
INSERT INTO Patient VALUES(49,'286-01-0555','Neala Cast','Female','1986-12-01',33,'(312) 4218608',9);
INSERT INTO Patient VALUES(50,'390-04-5274','Bell Curl','Female','1999-01-26',21,'(751) 4240002',18);
INSERT INTO Patient VALUES(51,'146-17-9160','Test Patient','Male','1960-06-28',59,'(865) 6224415',5);
INSERT INTO Patient VALUES(52,'146-17-9160','Test Patient No Age','Male','1960-06-28',59,'(865) 6224415',5);
CREATE TABLE Prescription (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, totalCost INTEGER NOT NULL, prescribeFor INTEGER NOT NULL, prescribedBy_id INTEGER DEFAULT NULL, CONSTRAINT FK_78E632124ED775C FOREIGN KEY (prescribedBy_id) REFERENCES MedicalStaff (id) NOT DEFERRABLE INITIALLY IMMEDIATE);
INSERT INTO Prescription VALUES(1,735,1,1);
INSERT INTO Prescription VALUES(2,974,2,2);
INSERT INTO Prescription VALUES(3,2648,3,3);
INSERT INTO Prescription VALUES(4,3730,4,4);
INSERT INTO Prescription VALUES(5,2239,5,5);
INSERT INTO Prescription VALUES(6,2464,6,6);
INSERT INTO Prescription VALUES(7,1427,7,7);
INSERT INTO Prescription VALUES(8,2075,8,8);
INSERT INTO Prescription VALUES(9,3574,9,9);
INSERT INTO Prescription VALUES(10,793,10,10);
INSERT INTO Prescription VALUES(11,1714,11,11);
INSERT INTO Prescription VALUES(12,1278,12,12);
INSERT INTO Prescription VALUES(13,4459,13,13);
INSERT INTO Prescription VALUES(14,2542,14,14);
INSERT INTO Prescription VALUES(15,2093,15,15);
INSERT INTO Prescription VALUES(16,972,16,16);
INSERT INTO Prescription VALUES(17,3491,17,17);
INSERT INTO Prescription VALUES(18,4886,18,18);
INSERT INTO Prescription VALUES(19,563,19,19);
INSERT INTO Prescription VALUES(20,552,20,20);
INSERT INTO Prescription VALUES(21,4155,21,1);
INSERT INTO Prescription VALUES(22,3374,22,2);
INSERT INTO Prescription VALUES(23,1232,23,3);
INSERT INTO Prescription VALUES(24,335,24,4);
INSERT INTO Prescription VALUES(25,3727,25,5);
INSERT INTO Prescription VALUES(26,4775,26,6);
INSERT INTO Prescription VALUES(27,913,27,7);
INSERT INTO Prescription VALUES(28,984,28,8);
INSERT INTO Prescription VALUES(29,813,29,9);
INSERT INTO Prescription VALUES(30,4096,30,10);
INSERT INTO Prescription VALUES(31,291,31,11);
INSERT INTO Prescription VALUES(32,3459,32,12);
INSERT INTO Prescription VALUES(33,4811,33,13);
INSERT INTO Prescription VALUES(34,1772,34,14);
INSERT INTO Prescription VALUES(35,2349,35,15);
INSERT INTO Prescription VALUES(36,3942,36,16);
INSERT INTO Prescription VALUES(37,2173,37,17);
INSERT INTO Prescription VALUES(38,3878,38,18);
INSERT INTO Prescription VALUES(39,4791,39,19);
INSERT INTO Prescription VALUES(40,3068,40,20);
INSERT INTO Prescription VALUES(41,4875,41,1);
INSERT INTO Prescription VALUES(42,4478,42,2);
INSERT INTO Prescription VALUES(43,1270,43,3);
INSERT INTO Prescription VALUES(44,2157,44,4);
INSERT INTO Prescription VALUES(45,3265,45,5);
INSERT INTO Prescription VALUES(46,749,46,6);
INSERT INTO Prescription VALUES(47,2401,47,7);
INSERT INTO Prescription VALUES(48,4278,48,8);
INSERT INTO Prescription VALUES(49,1610,49,9);
INSERT INTO Prescription VALUES(50,2576,50,10);
INSERT INTO Prescription VALUES(51,969696,1,9);
CREATE TABLE PrescriptionMedicine (prescription_id INTEGER NOT NULL, medicine_id INTEGER NOT NULL, quantity INTEGER NOT NULL, PRIMARY KEY(prescription_id, medicine_id), CONSTRAINT FK_B858D5D393DB413D FOREIGN KEY (prescription_id) REFERENCES Prescription (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_B858D5D32F7D140A FOREIGN KEY (medicine_id) REFERENCES Medicine (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE);
INSERT INTO PrescriptionMedicine VALUES(13,41,4);
INSERT INTO PrescriptionMedicine VALUES(31,6,3);
INSERT INTO PrescriptionMedicine VALUES(16,47,7);
INSERT INTO PrescriptionMedicine VALUES(14,45,6);
INSERT INTO PrescriptionMedicine VALUES(20,25,8);
INSERT INTO PrescriptionMedicine VALUES(20,28,4);
INSERT INTO PrescriptionMedicine VALUES(28,15,7);
INSERT INTO PrescriptionMedicine VALUES(36,32,4);
INSERT INTO PrescriptionMedicine VALUES(5,3,5);
INSERT INTO PrescriptionMedicine VALUES(41,1,2);
INSERT INTO PrescriptionMedicine VALUES(39,5,7);
INSERT INTO PrescriptionMedicine VALUES(12,27,6);
INSERT INTO PrescriptionMedicine VALUES(27,38,1);
INSERT INTO PrescriptionMedicine VALUES(24,21,5);
INSERT INTO PrescriptionMedicine VALUES(36,34,6);
INSERT INTO PrescriptionMedicine VALUES(32,45,1);
INSERT INTO PrescriptionMedicine VALUES(5,46,6);
INSERT INTO PrescriptionMedicine VALUES(16,6,4);
INSERT INTO PrescriptionMedicine VALUES(23,27,8);
INSERT INTO PrescriptionMedicine VALUES(36,39,5);
INSERT INTO PrescriptionMedicine VALUES(21,3,10);
INSERT INTO PrescriptionMedicine VALUES(3,42,2);
INSERT INTO PrescriptionMedicine VALUES(6,10,9);
INSERT INTO PrescriptionMedicine VALUES(24,30,5);
INSERT INTO PrescriptionMedicine VALUES(4,22,7);
INSERT INTO PrescriptionMedicine VALUES(12,5,8);
INSERT INTO PrescriptionMedicine VALUES(31,27,4);
INSERT INTO PrescriptionMedicine VALUES(8,34,2);
INSERT INTO PrescriptionMedicine VALUES(9,17,8);
INSERT INTO PrescriptionMedicine VALUES(2,13,0);
INSERT INTO PrescriptionMedicine VALUES(46,3,5);
INSERT INTO PrescriptionMedicine VALUES(36,15,7);
INSERT INTO PrescriptionMedicine VALUES(37,42,5);
INSERT INTO PrescriptionMedicine VALUES(39,14,8);
INSERT INTO PrescriptionMedicine VALUES(22,42,5);
INSERT INTO PrescriptionMedicine VALUES(7,12,7);
INSERT INTO PrescriptionMedicine VALUES(43,30,5);
INSERT INTO PrescriptionMedicine VALUES(14,31,3);
INSERT INTO PrescriptionMedicine VALUES(28,23,9);
INSERT INTO PrescriptionMedicine VALUES(5,7,4);
INSERT INTO PrescriptionMedicine VALUES(28,28,9);
INSERT INTO PrescriptionMedicine VALUES(16,37,4);
INSERT INTO PrescriptionMedicine VALUES(37,21,10);
INSERT INTO PrescriptionMedicine VALUES(35,5,0);
INSERT INTO PrescriptionMedicine VALUES(27,49,10);
INSERT INTO PrescriptionMedicine VALUES(43,2,9);
INSERT INTO PrescriptionMedicine VALUES(6,44,6);
INSERT INTO PrescriptionMedicine VALUES(41,2,4);
INSERT INTO PrescriptionMedicine VALUES(50,1,7);
INSERT INTO PrescriptionMedicine VALUES(40,5,1);
INSERT INTO PrescriptionMedicine VALUES(14,24,9);
INSERT INTO PrescriptionMedicine VALUES(2,5,9);
INSERT INTO PrescriptionMedicine VALUES(31,9,7);
INSERT INTO PrescriptionMedicine VALUES(16,20,9);
INSERT INTO PrescriptionMedicine VALUES(12,22,3);
INSERT INTO PrescriptionMedicine VALUES(23,19,6);
INSERT INTO PrescriptionMedicine VALUES(6,39,5);
INSERT INTO PrescriptionMedicine VALUES(24,20,6);
INSERT INTO PrescriptionMedicine VALUES(16,9,5);
INSERT INTO PrescriptionMedicine VALUES(43,19,6);
INSERT INTO PrescriptionMedicine VALUES(32,40,7);
INSERT INTO PrescriptionMedicine VALUES(49,31,2);
INSERT INTO PrescriptionMedicine VALUES(19,30,9);
INSERT INTO PrescriptionMedicine VALUES(41,21,6);
INSERT INTO PrescriptionMedicine VALUES(7,47,6);
INSERT INTO PrescriptionMedicine VALUES(31,16,6);
INSERT INTO PrescriptionMedicine VALUES(36,18,5);
INSERT INTO PrescriptionMedicine VALUES(27,35,3);
INSERT INTO PrescriptionMedicine VALUES(12,28,3);
INSERT INTO PrescriptionMedicine VALUES(5,10,1);
INSERT INTO PrescriptionMedicine VALUES(5,41,2);
INSERT INTO PrescriptionMedicine VALUES(38,17,5);
INSERT INTO PrescriptionMedicine VALUES(45,7,5);
INSERT INTO PrescriptionMedicine VALUES(23,42,10);
INSERT INTO PrescriptionMedicine VALUES(24,33,1);
INSERT INTO PrescriptionMedicine VALUES(42,47,3);
INSERT INTO PrescriptionMedicine VALUES(10,38,2);
INSERT INTO PrescriptionMedicine VALUES(30,37,5);
INSERT INTO PrescriptionMedicine VALUES(39,8,3);
INSERT INTO PrescriptionMedicine VALUES(10,4,6);
INSERT INTO PrescriptionMedicine VALUES(3,38,1);
INSERT INTO PrescriptionMedicine VALUES(23,45,8);
INSERT INTO PrescriptionMedicine VALUES(22,47,3);
INSERT INTO PrescriptionMedicine VALUES(15,22,8);
INSERT INTO PrescriptionMedicine VALUES(27,31,8);
INSERT INTO PrescriptionMedicine VALUES(43,7,1);
INSERT INTO PrescriptionMedicine VALUES(13,19,8);
INSERT INTO PrescriptionMedicine VALUES(49,18,10);
INSERT INTO PrescriptionMedicine VALUES(47,36,3);
INSERT INTO PrescriptionMedicine VALUES(3,20,5);
INSERT INTO PrescriptionMedicine VALUES(2,20,3);
INSERT INTO PrescriptionMedicine VALUES(43,28,3);
INSERT INTO PrescriptionMedicine VALUES(38,13,1);
INSERT INTO PrescriptionMedicine VALUES(15,9,2);
INSERT INTO PrescriptionMedicine VALUES(22,31,6);
INSERT INTO PrescriptionMedicine VALUES(41,7,5);
INSERT INTO PrescriptionMedicine VALUES(42,9,9);
INSERT INTO PrescriptionMedicine VALUES(19,26,6);
INSERT INTO PrescriptionMedicine VALUES(10,10,69);
CREATE TABLE Room (number INTEGER NOT NULL, type VARCHAR(50) NOT NULL, noOfStaffs INTEGER NOT NULL, medicalService_id INTEGER DEFAULT NULL, PRIMARY KEY(number, type), CONSTRAINT FK_D2ADFEA51AEE5591 FOREIGN KEY (medicalService_id) REFERENCES MedicalService (id) NOT DEFERRABLE INITIALLY IMMEDIATE);
INSERT INTO Room VALUES(1,'ER',1,7);
INSERT INTO Room VALUES(2,'ER',2,3);
INSERT INTO Room VALUES(3,'ER',3,8);
INSERT INTO Room VALUES(4,'ER',4,6);
INSERT INTO Room VALUES(5,'ER',5,4);
INSERT INTO Room VALUES(6,'ER',6,1);
INSERT INTO Room VALUES(7,'ER',7,7);
INSERT INTO Room VALUES(8,'ER',8,3);
INSERT INTO Room VALUES(9,'ER',9,2);
INSERT INTO Room VALUES(10,'ER',10,7);
INSERT INTO Room VALUES(11,'ER',11,1);
INSERT INTO Room VALUES(12,'ER',12,6);
INSERT INTO Room VALUES(13,'ER',13,2);
INSERT INTO Room VALUES(14,'ER',14,8);
INSERT INTO Room VALUES(15,'ER',15,6);
INSERT INTO Room VALUES(16,'ER',16,8);
INSERT INTO Room VALUES(17,'ER',17,6);
INSERT INTO Room VALUES(18,'ER',18,1);
INSERT INTO Room VALUES(19,'ER',19,7);
INSERT INTO Room VALUES(20,'ER',20,7);
INSERT INTO Room VALUES(1,'Operating Theater',21,5);
INSERT INTO Room VALUES(2,'Operating Theater',22,3);
INSERT INTO Room VALUES(3,'Operating Theater',23,3);
INSERT INTO Room VALUES(4,'Operating Theater',24,1);
INSERT INTO Room VALUES(5,'Operating Theater',25,3);
INSERT INTO Room VALUES(6,'Operating Theater',26,10);
INSERT INTO Room VALUES(7,'Operating Theater',27,2);
INSERT INTO Room VALUES(8,'Operating Theater',28,8);
INSERT INTO Room VALUES(9,'Operating Theater',29,9);
INSERT INTO Room VALUES(10,'Operating Theater',30,1);
INSERT INTO Room VALUES(11,'Operating Theater',31,10);
INSERT INTO Room VALUES(12,'Operating Theater',32,7);
INSERT INTO Room VALUES(13,'Operating Theater',33,8);
INSERT INTO Room VALUES(14,'Operating Theater',34,2);
INSERT INTO Room VALUES(15,'Operating Theater',35,1);
INSERT INTO Room VALUES(16,'Operating Theater',36,8);
INSERT INTO Room VALUES(17,'Operating Theater',37,2);
INSERT INTO Room VALUES(18,'Operating Theater',38,2);
INSERT INTO Room VALUES(19,'Operating Theater',39,7);
INSERT INTO Room VALUES(20,'Operating Theater',40,9);
INSERT INTO Room VALUES(1,'ICU',41,4);
INSERT INTO Room VALUES(2,'ICU',42,1);
INSERT INTO Room VALUES(3,'ICU',43,7);
INSERT INTO Room VALUES(4,'ICU',44,6);
INSERT INTO Room VALUES(5,'ICU',45,3);
INSERT INTO Room VALUES(6,'ICU',46,3);
INSERT INTO Room VALUES(7,'ICU',47,2);
INSERT INTO Room VALUES(8,'ICU',48,6);
INSERT INTO Room VALUES(9,'ICU',49,10);
INSERT INTO Room VALUES(10,'ICU',50,6);
INSERT INTO Room VALUES(69,'ER',4,3);
CREATE TABLE Visit (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, prescription_id INTEGER DEFAULT NULL, totalCost INTEGER NOT NULL, payMethod VARCHAR(4) NOT NULL, paid BOOLEAN NOT NULL, checkIn DATETIME NOT NULL, checkOut DATETIME DEFAULT NULL, byPatient_id INTEGER DEFAULT NULL, requestedService_id INTEGER DEFAULT NULL, CONSTRAINT FK_82BFC63DFD8DA151 FOREIGN KEY (byPatient_id) REFERENCES Patient (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_82BFC63D1FE3EB26 FOREIGN KEY (requestedService_id) REFERENCES MedicalService (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_82BFC63D93DB413D FOREIGN KEY (prescription_id) REFERENCES Prescription (id) NOT DEFERRABLE INITIALLY IMMEDIATE);
INSERT INTO Visit VALUES(1,50,3550,'card',0,'2017-11-7 03:54:27','2020-10-29 16:10:16',1,1);
INSERT INTO Visit VALUES(2,49,121,'card',0,'2016-10-20 01:13:27','2020-9-9 10:55:02',2,2);
INSERT INTO Visit VALUES(3,48,2522,'card',0,'2020-4-6 06:42:34','2018-4-14 20:03:23',3,3);
INSERT INTO Visit VALUES(4,47,2979,'card',0,'2020-7-25 13:49:01','2016-1-26 04:08:20',4,4);
INSERT INTO Visit VALUES(5,46,1559,'card',0,'2020-7-4 14:38:50','2018-12-25 13:43:33',5,5);
INSERT INTO Visit VALUES(6,45,2833,'card',0,'2017-10-12 08:06:12','2020-1-2 09:38:04',6,6);
INSERT INTO Visit VALUES(7,44,345,'cash',0,'2016-5-9 20:10:44','2017-1-4 15:14:52',7,7);
INSERT INTO Visit VALUES(8,43,640,'cash',0,'2016-12-16 00:15:49','2017-6-23 09:13:00',8,8);
INSERT INTO Visit VALUES(9,42,1898,'card',1,'2019-9-23 18:33:43','2017-2-1 00:35:42',9,9);
INSERT INTO Visit VALUES(10,41,3203,'cash',0,'2020-7-19 01:11:28','2019-5-8 06:36:22',10,10);
INSERT INTO Visit VALUES(11,40,3336,'card',1,'2016-6-21 19:09:40','2020-9-8 22:13:54',11,11);
INSERT INTO Visit VALUES(12,39,4717,'card',0,'2017-11-16 13:05:43','2020-8-14 19:07:43',12,12);
INSERT INTO Visit VALUES(13,38,3291,'card',1,'2016-10-25 08:11:34','2016-6-22 17:57:01',13,13);
INSERT INTO Visit VALUES(14,37,2096,'cash',1,'2019-4-11 11:38:01','2018-4-19 04:50:53',14,14);
INSERT INTO Visit VALUES(15,36,634,'cash',0,'2020-12-26 02:21:59','2017-4-26 10:08:16',15,15);
INSERT INTO Visit VALUES(16,35,4554,'cash',1,'2016-8-11 07:19:50','2017-3-23 08:37:10',16,16);
INSERT INTO Visit VALUES(17,34,4885,'cash',1,'2016-7-22 08:56:20','2019-2-14 09:47:11',17,17);
INSERT INTO Visit VALUES(18,33,1659,'cash',0,'2019-5-5 20:01:41','2017-7-13 14:01:19',18,18);
INSERT INTO Visit VALUES(19,32,4705,'cash',0,'2016-2-10 01:56:36','2015-8-28 16:32:01',19,19);
INSERT INTO Visit VALUES(20,31,4229,'cash',1,'2016-9-1 17:10:07','2019-3-12 02:12:58',20,20);
INSERT INTO Visit VALUES(21,30,3243,'card',0,'2020-9-29 07:45:32','2019-5-14 17:31:08',21,1);
INSERT INTO Visit VALUES(22,29,3547,'card',1,'2016-11-30 00:18:22','2015-10-11 17:26:14',22,2);
INSERT INTO Visit VALUES(23,28,4993,'cash',0,'2020-9-25 10:57:43','2016-7-28 23:14:25',23,3);
INSERT INTO Visit VALUES(24,27,2902,'cash',0,'2019-8-25 16:57:19','2015-11-29 00:32:38',24,4);
INSERT INTO Visit VALUES(25,26,2397,'card',1,'2018-7-12 06:59:54','2015-1-7 11:59:45',25,5);
INSERT INTO Visit VALUES(26,25,3665,'cash',0,'2019-7-30 03:34:05','2019-1-4 11:09:47',26,6);
INSERT INTO Visit VALUES(27,24,3306,'cash',0,'2015-11-3 06:59:13','2017-5-25 10:26:12',27,7);
INSERT INTO Visit VALUES(28,23,841,'card',1,'2016-5-17 07:15:19','2015-5-16 02:34:23',28,8);
INSERT INTO Visit VALUES(29,22,2878,'cash',1,'2016-9-21 19:06:25','2020-10-6 12:59:50',29,9);
INSERT INTO Visit VALUES(30,21,4874,'cash',0,'2015-10-20 07:25:50','2016-1-15 14:06:00',30,10);
INSERT INTO Visit VALUES(31,20,3235,'card',1,'2020-5-6 15:20:58','2019-4-23 13:18:15',31,11);
INSERT INTO Visit VALUES(32,19,2617,'cash',0,'2020-8-8 00:50:14','2020-1-7 20:52:49',32,12);
INSERT INTO Visit VALUES(33,18,3934,'cash',0,'2019-7-13 21:58:55','2019-10-23 02:43:17',33,13);
INSERT INTO Visit VALUES(34,17,1840,'cash',1,'2015-8-21 02:59:38','2015-4-19 11:43:13',34,14);
INSERT INTO Visit VALUES(35,16,349,'card',1,'2016-3-30 10:20:13','2015-3-17 15:03:02',35,15);
INSERT INTO Visit VALUES(36,15,3440,'card',1,'2017-7-15 04:21:01','2018-8-14 06:24:48',36,16);
INSERT INTO Visit VALUES(37,14,2964,'cash',0,'2018-2-27 00:42:07','2015-2-13 11:25:51',37,17);
INSERT INTO Visit VALUES(38,13,1408,'card',1,'2020-12-5 06:50:00','2017-3-11 14:07:04',38,18);
INSERT INTO Visit VALUES(39,12,2721,'cash',0,'2015-10-30 07:33:35','2018-9-14 17:27:17',39,19);
INSERT INTO Visit VALUES(40,11,369,'card',0,'2016-10-30 03:53:24','2017-11-22 04:39:29',40,20);
INSERT INTO Visit VALUES(41,10,1702,'cash',0,'2015-7-8 09:07:23','2017-2-29 10:37:37',41,1);
INSERT INTO Visit VALUES(42,9,1792,'cash',0,'2018-4-24 06:16:46','2015-7-29 13:47:01',42,2);
INSERT INTO Visit VALUES(43,8,408,'cash',1,'2015-9-20 23:51:10','2016-1-3 23:06:52',43,3);
INSERT INTO Visit VALUES(44,7,3102,'card',1,'2015-5-23 16:42:52','2020-2-11 14:40:28',44,4);
INSERT INTO Visit VALUES(45,6,1346,'cash',1,'2016-6-17 07:29:43','2016-4-6 13:22:12',45,5);
INSERT INTO Visit VALUES(46,5,1814,'cash',0,'2018-7-16 15:49:50','2016-9-30 03:48:13',46,6);
INSERT INTO Visit VALUES(47,4,2619,'cash',0,'2020-6-17 11:51:49','2020-7-17 05:49:54',47,7);
INSERT INTO Visit VALUES(48,3,3313,'cash',1,'2020-3-16 13:25:47','2016-7-18 16:04:49',48,8);
INSERT INTO Visit VALUES(49,2,3488,'card',1,'2019-10-6 23:28:29','2020-9-8 13:57:21',49,9);
INSERT INTO Visit VALUES(50,1,505,'card',1,'2019-12-27 03:47:25','2020-9-19 14:34:58',50,10);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('Prescription',51);
INSERT INTO sqlite_sequence VALUES('Medicine',51);
INSERT INTO sqlite_sequence VALUES('MedicalStaff',52);
INSERT INTO sqlite_sequence VALUES('MedicalService',37);
INSERT INTO sqlite_sequence VALUES('Patient',52);
INSERT INTO sqlite_sequence VALUES('Visit',50);
CREATE INDEX IDX_9548DD5D8962AD80E7D5589B ON MedicalStaff (assignRoomNo, assignRoomType);
CREATE INDEX IDX_78E632124ED775C ON Prescription (prescribedBy_id);
CREATE INDEX IDX_B858D5D393DB413D ON PrescriptionMedicine (prescription_id);
CREATE INDEX IDX_B858D5D32F7D140A ON PrescriptionMedicine (medicine_id);
CREATE INDEX IDX_D2ADFEA51AEE5591 ON Room (medicalService_id);
CREATE INDEX IDX_82BFC63DFD8DA151 ON Visit (byPatient_id);
CREATE INDEX IDX_82BFC63D1FE3EB26 ON Visit (requestedService_id);
CREATE UNIQUE INDEX UNIQ_82BFC63D93DB413D ON Visit (prescription_id);
COMMIT;
