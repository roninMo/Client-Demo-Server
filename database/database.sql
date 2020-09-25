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
	zip CHAR(5) NULL,
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
	appDate DATETIME NULL,
	effectDate DATETIME NULL,
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
	dece DECIMAL(14,4) NULL,
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











/* Insurance Database queries */
/* Insurance Database Tables */
-- Users
	-- Clients
		-- ClientNotes
	-- Commissions
	-- Companies


/* -- todo
A Search Bar to search for clients and companies

List of specific data queried by most recent
	-- Book of business page
	-- Master Mailing List

Clients page
	-- Since this is like a table, a section for order by, kind of like a folder functionality, understand that then create queries for it

Commissions pages
	-- Commissions by Company
	-- Commissions report
	-- Payment statistics (Current payments/month, payment adjustments/month, total payments (current)/month, total payments(due per year)/month)
Users page

*/


-- Todo queries for insurance database --
/* 
We need the basics, grabbing individual values by id, as well as searches for each
When I do a search, I want the results to show for clients, companies, and commissions as well, so we're going to query for that

Then we have our many to many joint table to grab all the instances for that specific user

So we search for a user, company, or commission, then have another query that joins all the data connected to that specific selection
	a table that grabs all that data for each
	all user's transactions tied to commissions and companies, companies tied to users and commission, etc.

*/

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


-- Todo for our insurance database
-- Create the queries for each of the routes
-- Take out the old routes, and put new ones in with the queries
-- Continue working on the front end of the application


INSERT INTO Commissions (appDate, effectDate, type, policy, jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dece, notes, clientId, companyId) VALUES ('2007-09-06 14:06:00', '2018-11-10 16:17:49', 'MAPD', 'Policy # 0', 6625.2354, 9243.1205, 3864.8893, 4764.5735, 5181.5517, 5778.2298, 9319.5772, 8189.2849, 3406.8834, 7462.4458, 9563.681, 6795.8139, 'Commission note G', 34, 10);
