-- Whole bunch of beginning basics could go right here
-- Also COUNT, CHAR LENGTH, SUM, UPPER, LOWER

/*****************************
 * SELECT 
*****************************/
SELECT * FROM Cats;
SELECT name, age FROM Cats;
SELECT cat_id AS id, name FROM Cats;


/*****************************
 * WHERE
*****************************/
SELECT * FROM Cats WHERE age=4;
SELECT * FROM Cats WHERE breed='Tabby';


/*****************************
 * DISTINCT
*****************************/
SELECT DISTINCT lname FROM Books;
SELECT DISTINCT CONCAT(fname, ' ', lname) AS 'Author Name' FROM Books;  -- same result as below
SELECT DISTINCT fname, lname FROM Books;                                -- It selects the distinct rows!


/*****************************
 * INSERT
*****************************/
INSERT INTO Cats(name, breed, age)
VALUES  ('Rango', 'Tabby', 4)
        ('Dumbledore', 'Maine Coon', 11)
        ('Misty', 'Ragdoll', 13);


/*****************************
 * UPDATE 
*****************************/
UPDATE Cats SET breed='Shorthair' WHERE breed='Tabby';
UPDATE Cats SET age=14 WHERE name='Misty';
-- Good rule of thumb, try selecting before you update, to get an understanding of what you're selecting to update/or even delete


/*****************************
 * DELETE
*****************************/
DELETE FROM Cats WHERE name='Egg';
DELETE FROM Cats WHERE cat_id=age;


/*****************************
 * CONCAT 
*****************************/
SELECT CONCAT(fname, " ", lname) AS 'Full Name' FROM Books;
SELECT CONCAT(fname, ' - ', lname, ' - ', title) FROM Books;
SELECT CONCAT_WS(' - ', fname, lname, title) FROM Books;


/*****************************
 * SUBSTRING 
*****************************/
SELECT SUBSTRING('Hello World', 1, 5) FROM Books;           -- Hello
SELECT SUBSTRING('Hello World', 7) FROM Books;              -- World 
SELECT SUBSTRING('Hello World', -3) FROM Books;             -- rld
SELECT CONCAT(SUBSTRING(title, 1, 11), '...') FROM Books;   -- Step Brothe...


/*****************************
 * REPLACE
*****************************/
SELECT REPLACE('Hello World', 'Hell', '%$#@');              -- %$#@o World
SELECT REPLACE('cheese bread coffee milk', ' ', ' and ');    -- chees and bread and coffee and milk
SELECT REPLACE(title, 'e', 3) FROM Books;                   -- Whit3 Nois3
SELECT SUBSTRING(REPLACE(title, 'e', 3), 1, 10) FROM Books; -- Th3 Nam3sa


/*****************************
 * ORDER BY 
*****************************/
SELECT lname FROM Books ORDER BY lname;                                 -- Carver, Delillo, Eggers, Foster Wallace :: Ascending(ASC) by default
SELECT lname FROM Books ORDER BY lname DESC;                            -- Foster Wallace, Eggers, Delillo, Carver :: Descending(DESC)
SELECT title, released_year, pages FROM Books ORDER BY released_year;
SELECT title, pages FROM Books ORDER BY released_year;
SELECT title, fname, lname FROM Books ORDER BY 2;                       -- Order by fname
SELECT fname, lname FROM Books ORDER BY lname, fname;                                 -- Sorting by descending non distinct values


/*****************************
 * LIMIT
*****************************/
SELECT title, released_year FROM Books ORDER BY released_year DESC LIMIT 10;
SELECT title, released_year FROM Books ORDER BY released_year DESC LIMIT 0,5;


/*****************************
 * LIKE - Better searching
*****************************/
SELECT title, fname FROM Books WHERE fname LIKE '%da%';                    -- % is a wildcard, saying anything before or after -> anything%da%anything
SELECT title FROM FROM Books WHERE title LIKE '%the%';
SELECT title, stock_quantity FROM Books WHERE stock_quantity LIKE '____';  -- _ is a wildcard, this would find all stock quantities with only 4 digits  
SELECT fname, phone_numbers FROM Books WHERE phone_numbers LIKE '(___)___-____';
SELECT title FROM books WHERE title LIKE '%\_%'


/*****************************
 * 
*****************************/
/*****************************
 * Multi Column SELECT JOINS
*****************************/
SELECT Column_Fname, Column_Lname, table_Department.Column_Dname
FROM Table_Employee
INNER JOIN table_Department ON Table_Employee.Column_DeptNo = table_Department.Column_DeptNo;

SELECT Column_Fname, Column_Lname, table_Department.Column_Dname
FROM Table_Employee
WHERE Table_Employee.Column_DeptNo = table_Department.Column_DeptNo;
