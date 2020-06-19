-- Create a database with the name of insuranceDatabase
-- Here are all the current tables with primary and foreign key constraints

-- User Table - the admins working with all their client information
CREATE TABLE insuranceDatabase.Users (
	id INT UNSIGNED auto_increment NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	lastName varchar(100) NOT NULL,
	firstName varchar(100) NOT NULL,
	CONSTRAINT Users_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

-- Base Client Table
CREATE TABLE insuranceDatabase.Clients (
	id INT UNSIGNED auto_increment NOT NULL,
	lastName varchar(100) NULL,
	firstName varchar(100) NULL,
	CONSTRAINT Clients_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

-- Client Information Table
CREATE TABLE insuranceDatabase.ClientInformation (
	id INT UNSIGNED auto_increment NOT NULL,
	address varchar(255) NULL,
	city varchar(100) NULL,
	state varchar(2) NULL,
	zip INT NULL,
	clientId INT UNSIGNED NOT NULL,
	CONSTRAINT ClientInformation_PK PRIMARY KEY (id),
	CONSTRAINT ClientInformation_FK_clientId FOREIGN KEY (clientId) REFERENCES insuranceDatabase.Clients(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

-- Company Table
CREATE TABLE insuranceDatabase.Company (
	id INTEGER UNSIGNED auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	`type` varchar(10) NULL,
	prem DOUBLE NULL,
	mode varchar(10) NULL,
	payment DOUBLE NULL,
	appDate TIMESTAMP NULL,
	effectDate TIMESTAMP NULL,
	policy varchar(100) NULL,
	clientId INTEGER UNSIGNED NOT NULL,
	CONSTRAINT Company_PK PRIMARY KEY (id),
	CONSTRAINT Company_FK_clientId FOREIGN KEY (clientId) REFERENCES insuranceDatabase.Clients(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- Business Book Table
CREATE TABLE insuranceDatabase.BusinessBook (
	id INT UNSIGNED auto_increment NOT NULL,
	dob TIMESTAMP NULL,
	appDate TIMESTAMP NULL,
	`new` BOOL NULL,
	effectDate TIMESTAMP NULL,
	plan varchar(100) NULL,
	`type` varchar(10) NULL,
	policy varchar(100) NULL,
	prem DOUBLE NULL,
	mode varchar(10) NULL,
	commPD DOUBLE NULL,
	datePD TIMESTAMP NULL,
	clientId INT UNSIGNED NOT NULL,
	companyId INT UNSIGNED NOT NULL,
	CONSTRAINT BusinessBook_PK PRIMARY KEY (id),
	CONSTRAINT BusinessBook_FK_clientId FOREIGN KEY (clientId) REFERENCES insuranceDatabase.Clients(id),
	CONSTRAINT BusinessBook_FK_companyId FOREIGN KEY (companyId) REFERENCES insuranceDatabase.Company(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- Client Notes Table
CREATE TABLE insuranceDatabase.ClientNotes (
	id INT UNSIGNED auto_increment NOT NULL,
	description varchar(5200) NULL,
	clientId INT UNSIGNED NOT NULL,
	CONSTRAINT ClientNotes_PK PRIMARY KEY (id),
	CONSTRAINT ClientNotes_FK_clientId FOREIGN KEY (clientId) REFERENCES insuranceDatabase.Clients(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

-- Commission Report Table
CREATE TABLE insuranceDatabase.CommReport (
	id INT UNSIGNED auto_increment NOT NULL,
	jan DOUBLE NULL,
	feb DOUBLE NULL,
	mar DOUBLE NULL,
	apr DOUBLE NULL,
	may DOUBLE NULL,
	jun DOUBLE NULL,
	jul DOUBLE NULL,
	aug DOUBLE NULL,
	sep DOUBLE NULL,
	oct DOUBLE NULL,
	nov DOUBLE NULL,
	`dec` DOUBLE NULL,
	total DOUBLE NULL,
	companyId INT UNSIGNED NOT NULL,
	CONSTRAINT CommReport_PK PRIMARY KEY (id),
	CONSTRAINT CommReport_FK_companyId FOREIGN KEY (companyId) REFERENCES insuranceDatabase.Clients(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- Commission by Company Table
CREATE TABLE insuranceDatabase.CommByCompany (
	id INT UNSIGNED auto_increment NOT NULL,
	commissionId INT UNSIGNED NOT NULL,
	effectDate TIMESTAMP NULL,
	`type` varchar(10) NULL,
	jan DOUBLE NULL,
	feb DOUBLE NULL,
	mar DOUBLE NULL,
	apr DOUBLE NULL,
	may DOUBLE NULL,
	jun DOUBLE NULL,
	jul DOUBLE NULL,
	aug DOUBLE NULL,
	sep DOUBLE NULL,
	oct DOUBLE NULL,
	nov DOUBLE NULL,
	`dec` DOUBLE NULL,
	clientId INT UNSIGNED NOT NULL,
	CONSTRAINT CommByCompany_PK PRIMARY KEY (id),
	CONSTRAINT CommByCompany_FK_clientId FOREIGN KEY (clientId) REFERENCES insuranceDatabase.Clients(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
