-- Create a database with the name of insuranceDatabase
-- Here are all the current tables with primary and foreign key constraints

DROP DATABASE IF EXISTS insuranceDatabase;
CREATE DATABASE insuranceDatabase;
USE insuranceDatabase; 

-- Client Table 
CREATE TABLE insuranceDatabase.Clients (
	id INT UNSIGNED auto_increment NOT NULL,
	firstName varchar(100) NOT NULL,
	lastName varchar(100) NOT NULL,
	dob DATE NULL,
	address varchar(255) NULL,
	city varchar(100) NULL,
	state CHAR(2) NULL,
	zip INT UNSIGNED NULL,
	county varchar(100) NULL,
	smoker BOOL NULL,
	hbp BOOL NULL,
	cancer BOOL NULL,
	diabetes BOOL NULL,
	copd BOOL NULL,
	life BOOL NULL,
	cell varchar(21) NULL,
	home varchar(21) NULL,
	spouse BOOL NULL,
	medicareId varchar(100) NULL,
	partA varchar(100) NULL,
	partB varchar(100) NULL,
	ssid varchar(11) NULL,
	medicalNotes varchar(550) NULL,
	CONSTRAINT Clients_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- Company Table
CREATE TABLE insuranceDatabase.Companies (
	id INT UNSIGNED auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	CONSTRAINT Companies_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- Commissions Table
CREATE TABLE insuranceDatabase.Commissions (
	id INT UNSIGNED auto_increment NOT NULL,
	appDate DATE NOT NULL,
	effectDate DATE NULL,
	medicarePlan varchar(100) NULL,
	`type` varchar(25) NULL,
	policy varchar(100) NULL,
	jan DECIMAL(14,4) NULL,
	feb DECIMAL(14,4) NULL,
	mar DECIMAL(14,4) NULL,
	apr DECIMAL(14,4) NULL,
	may DECIMAL(14,4) NULL,
	jun DECIMAL(14,4) NULL,
	jul DECIMAL(14,4) NULL,
	aug DECIMAL(14,4) NULL,
	sep DECIMAL(14,4) NULL,
	oct DECIMAL(14,4) NULL,
	nov DECIMAL(14,4) NULL,
	`dec` DECIMAL(14,4) NULL,
	notes varchar(550) NULL,
	clientId INT UNSIGNED NOT NULL,
	companyId INT UNSIGNED NOT NULL,
	CONSTRAINT Commissions_PK PRIMARY KEY (id),
	CONSTRAINT Commissions_ClientId FOREIGN KEY (clientId) REFERENCES insuranceDatabase.Clients(id),
	CONSTRAINT Commissions_CompanyId FOREIGN KEY (companyId) REFERENCES insuranceDatabase.Companies(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- Users Table
CREATE TABLE insuranceDatabase.Users (
	id INT UNSIGNED auto_increment NOT NULL,
	firstName varchar(100) NOT NULL,
	lastName varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	CONSTRAINT Users_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- Client Notes Table
CREATE TABLE insuranceDatabase.ClientNotes (
	id INT UNSIGNED auto_increment NOT NULL,
	title varchar(100) NOT NULL,
	description varchar(1200) NULL,
	client_id INT UNSIGNED NOT NULL,
	CONSTRAINT ClientNotes_PK PRIMARY KEY (id),
	CONSTRAINT ClientNotes_ClientId FOREIGN KEY (client_id) REFERENCES insuranceDatabase.Clients(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;














CREATE TABLE people (
	id INT UNSIGNED auto_increment NOT NULL,
	firstName varchar(100) NOT NULL,
	lastName varchar(100) NOT NULL,
	email varchar(100),
	hobby varchar(100),
	CONSTRAINT people_PK PRIMARY KEY (id)
)

CREATE TABLE places (
	id INT UNSIGNED auto_increment NOT NULL,
	place varchar(100),
	state varchar(100),
	CONSTRAINT places_PK PRIMARY KEY (id)
)

INSERT INTO people (firstName, lastName, email, hobby)
VALUES	
	('Ben', 'Wary', 'scrutinybaby@gmail.com', 'chips, pennies, napkins'),
	('Jerry', 'Terry', 'sweetboy11@gmail.com', 'space'),
	('Harry', 'Baldwin', 'hypervigilance@yahoo.com', 'sports'),
	('Jeffery', 'Dallas', 'bmobro@gmail.com', 'go out on adventures'),
	('Madison', 'Batman', 'hahehaheha@somemail.com', 'fishing'),
	('Jamie', 'Sanders', 'goofygoober@heehaw.com', 'cars'),
	('Kyler', 'Hyuga', 'alwaysWatchingWazowski@dumbledonk.com', 'pokemon in yu gi oh'),
	('Hagred', 'KaminaElectra', 'caretakerdogbarker@gmail.com', 'indubitably');

INSERT INTO places (place, state)
VALUES
	('Some silly park', 'Wyoming'),
	('Salty Spitoon', 'Bikini Bottom'),
	('Mount Miyoboku', 'Somewhere');

SELECT * FROM people WHERE CONCAT(firstName, ' ', lastName) LIKE '%Ben%';

SELECT id, CONCAT(firstName,' ',lastName) AS name 
FROM people WHERE CONCAT(firstName,' ',lastName) LIKE '%Ben%'
UNION
SELECT id, place
FROM places;


/* Insurance Database jazz */

-- Find all companies/people where the name is what the user searched
SELECT id, CONCAT(firstName,' ',lastName) AS name
FROM Clients WHERE CONCAT(firstName,' ',lastName) LIKE '%?%'
UNION
SELECT id, name
FROM Companies WHERE name LIKE '%?%';

-- Grab all the data for a specific company
SELECT *
FROM Commissions
INNER JOIN Clients
	ON Commissions.client_id = Clients.id
INNER JOIN Companies
	ON Commissions.companyId = Companies.id
WHERE Companies.id=?;

-- Grab all the data for a specific client
SELECT *
FROM Commissions
INNER JOIN Clients
	ON Commissions.client_id = Clients.id
INNER JOIN Companies
	ON Commissions.companyId = Companies.id
WHERE Clients.id=?;

-- Grab the client's notes where clientid=clientid
SELECT *
FROM ClientNotes
WHERE  client_id=?;

-- Grab the most recent commissions by date - This is the BookOfBusiness Hub
SELECT *
FROM Commissions
INNER JOIN Clients
	ON Commissions.client_id = Clients.id
INNER JOIN Companies
	ON Commissions.companyId = Companies.id
ORDER BY Commissions.appDate DESC;

