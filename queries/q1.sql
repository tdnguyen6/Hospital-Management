USE FnMeRpbnbR;

SHOW TABLES;

CREATE TABLE employee (
    eid INT PRIMARY KEY,
    ename NVARCHAR(30),
    egender VARCHAR(7),
    edob DATE,
    role VARCHAR(7),
    edepartment VARCHAR(50)
);

CREATE TABLE patient (
    pid INT PRIMARY KEY,
    pname NVARCHAR(30),
    pgender VARCHAR(7),
    pdob DATE,
    did INT,
    dateIn DATETIME
);

CREATE TABLE room (
    rid INT PRIMARY KEY,
    rdepartment VARCHAR(50)
);

CREATE TABLE disease (
    did INT PRIMARY KEY,
    dname VARCHAR(30),
    medPrice INT
);

CREATE TABLE bill (
    bid INT PRIMARY KEY,
    genDate DATETIME,
    pid INT,
    totalPrice INT,
    status BOOL
);
