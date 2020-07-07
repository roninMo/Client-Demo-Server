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
 * Different WHERE clauses
*****************************/
WHERE fname = 'Harris';
WHERE fname !- 'Harris';
WHERE released_year < 2000;
SELECT 99 > 1; -- Output is 1 which is a boolean value for true
'a' >= 'b'; -- 0
'A' = 'a'; -- 1
SELECT 1 < 5 && 7 = 9;          -- false
SELECT -40 <= 0 AND 10 > 40;    --false
SELECT 54 <= 54 && 'a' = 'A';   -- true
SELECT * FROM books WHERE author_lname='Eggers' AND released_year > 2010 AND title LIKE '%novel%';
SELECT 40 <= 100 || -2 > 0;     -- true


/*****************************
 * BETWEEN
*****************************/
SELECT title, released_year FROM Books WHERE released_year >= 2004 && released_year <= 2015;    -- This is arduous, and between saves time
SELECT title, released_year FROM Books WHERE released_year BETWEEN 2004 && 2015;
SELECT title, released_year FROM Books WHERE released_year NOT BETWEEN 2004 && 2015;


/*****************************
 * IN
*****************************/
SELECT title, lname FROM Books WHERE lname = 'Carver' OR lname = 'Lahiri' OR lname = 'Smith';   -- Or just use IN
SELECT title, lname FROM Books WHERE lname IN ('Carver', 'Lahiri', 'Smith');

SELECT title, released_year FROM Books WHERE released_year NOT IN (2000,2002,2004,2006,2008,2010,2012,2014,2016);
-- Faster way that accounts for all even years in the 2000s!
SELECT title, released_year FROM Books WHERE released_year >= 2000 && released_year % 2 != 0; 


/*****************************
 * CASE
*****************************/
SELECT title, released_year
        CASE    
          WHEN released_year >= 2000 THEN 'Modern Literature'
          ELSE '20th Century Literature'
        END AS Genre
FROM Books;
-- Returns a new column that gives attributes based on the different clauses for each

SELECT title, stock_quantity
        CASE
          WHEN stock_quantity BETWEEN 0 AND 50 THEN '*'
          WHEN stock_quantity BETWEEN 51 AND 100 THEN '**';
          ELSE '***'
        END as stock
FROM Books;

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
SELECT title FROM books WHERE title LIKE '%\_%';
SELECT title FROM books WHERE title NOT LIKE 'W%';


/*****************************
 * COUNT
*****************************/
SELECT COUNT(lname) FROM Books;
SELECT COUNT(DISTINCT lname, fname) FROM Books;
SELECT COUNT(*) FROM Books WHERE title LIKE '%the%';


/*****************************
 * MIN and MAX
*****************************/
SELECT MIN(released_year) FROM Books;
SELECT MIN(pages) FROM Books;
SELECT MAX(released_year) FROM Books;
SELECT MAX(pages) FROM Books;


/*****************************
 * SUM
*****************************/
SELECT SUM(pages) FROM Books;
        -- Sum all the pages each author has written!
SELECT fname, lname, SUM(pages) FROM Books GROUP BY lname, fname;


/*****************************
 * AVG
*****************************/
SELECT AVG(released_year) FROM Books;
SELECT AVG(pages) FROM Books;
SELECT released_year, title, stock_quantity,  AVG(stock_quantity) AS avg_quantity FROM Books GROUP BY released_year; 
SELECT fname, lname, AVG(pages) AS avg_pages FROM Books GROUP BY lname, fname;


/*****************************
 * DATE_FORMAT
*****************************/
SELECT DATE_FORMAT(birthdt, 'Was born on a %W') FROM people;
-- Was born on a Friday (or Saturday, or Sunday)
SELECT DATE_FORMAT(birthdt, '%m/%d/%Y') FROM people;
-- 11/21/10 or 4/21/92 or 10/11/12
SELECT DATE_FORMAT(birthdt, '%m/%d/%Y at %h:%i') FROM people;
-- 11/21/10 at 10:45


/***************************************************************************
 * DATEDIFF ~ can take date or datetime / also DATE_ADD and DATE_SUB
***************************************************************************/
SELECT name, birthdate DATEDIFF(NOW(), birthdate) FROM people;  -- | Jeff Dunham | 10-21-05 | how many days from that date to now (i dont wanna do the math)

SELECT birthdt, DATE_ADD(birthdt, INTERVAL 1 MONTH) FROM people;
SELECT birthdt, DATE_ADD(birthdt, INTERVAL 10 SECOND) FROM people;
SELECT birthdt, DATE_SUB(birthdt, INTERVAL 3 QUARTER) FROM people;

SELECT birthdt, birthdt + INTERVAL 1 MONTH FROM people;
SELECT birthdt, birthdt - INTERVAL 5 MONTH FROM people;
SELECT birthdt, birthdt + INTERVAL 15 MONTH + INTERVAL 10 HOUR FROM people;


/*****************************
 * TIMESTAMP
*****************************/
CREATE TABLE comments (
    content VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO comments (content) VALUES('lol what a funny article');
INSERT INTO comments (content) VALUES('I found this offensive');
INSERT INTO comments (content) VALUES('Ifasfsadfsadfsad');
SELECT * FROM comments ORDER BY created_at DESC;
CREATE TABLE comments2 (
    content VARCHAR(100),
    changed_at TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO comments2 (content) VALUES('dasdasdasd');
INSERT INTO comments2 (content) VALUES('lololololo');
INSERT INTO comments2 (content) VALUES('I LIKE CATS AND DOGS');
UPDATE comments2 SET content='THIS IS NOT GIBBERISH' WHERE content='dasdasdasd';
SELECT * FROM comments2;
SELECT * FROM comments2 ORDER BY changed_at;
CREATE TABLE comments2 (
    content VARCHAR(100),
    changed_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);

/*****************************
 * Sub Queries!             *
*****************************/
SELECT title, pages FROM Books WHERE pages=(SELECT MAX(pages) FROM Books);
SELECT title, pages FROM Books WHERE pages=(SELECT MIN(pages) FROM Books);
-- OR
SELECT title, pages FROM Books ORDER BY pages DESC LIMIT 1;
SELECT title, pages FROM Books ORDER BY pages ASC LIMIT 1;


/*****************************
 * GROUP BY
*****************************/
-- Group by summarizes/aggregates identical data into single rows, and is useful for bridging calculations, here are some examples
        -- take all of our books and group them by genre, and tell me how many how each genre has
        -- group our teas by variety, and then find the average sales price for each variety
SELECT lname, COUNT(*) FROM Books GROUP BY lname;
SELECT fname, lname, COUNT(*) FROM Books GROUP BY lname, fname;
SELECT released_year, COUNT(*) FROM Books GROUP BY released_year;
-- These the statements are the same
SELECT released_year, CONCAT('In ', released_year, ' ', COUNT(*), ' book(s) released') as year FROM Books GROUP BY released_year;
SELECT * FROM Books ORDER BY pages ASC LIMIT 1;

SELECT fname, lname, MIN(released_year), FROM Books GROUP BY lname, fname;
SELECT fname, lname, MAX(pages), FROM Books GROUP BY lname, fname;

-- Finds the longest name for each author, same as above but much neater
SELECT 
        CONCAT(fname, ' ', lname) AS author,
        MAX(pages) AS 'longest book'
FROM Books
GROUP BY lname, fname;


/*****************************
 * Multi Column SELECT JOINS
*****************************/
SELECT Column_Fname, Column_Lname, table_Department.Column_Dname
FROM Table_Employee
INNER JOIN table_Department ON Table_Employee.Column_DeptNo = table_Department.Column_DeptNo;

SELECT Column_Fname, Column_Lname, table_Department.Column_Dname
FROM Table_Employee
WHERE Table_Employee.Column_DeptNo = table_Department.Column_DeptNo;


/*****************************
 * Different Join statements
*****************************/
-- Implicit Inner Joins
SELECT * FROM customers, orders 
        WHERE customers.id = orders.customer_id; 

SELECT fname, lname, order_date, amount 
FROM customers, orders 
        WHERE customers.id = orders.customer_id;

-- Explicit Inner Joins
SELECT * FROM customers
JOIN orders ON customers.id = orders.customer_id;

SELECT fname, lname, order_date, amount 
FROM customers 
JOIN orders 
        ON customers.id = orders.customer_id;

SELECT fname, lname, order_date, amount 
FROM customers 
JOIN orders 
        ON customers.id = orders.customer_id
ORDER BY order_date;

SELECT first_name, title, grade
FROM students
INNER JOIN papers
        ON students.id = papers.student_id
ORDER BY grade DESC;

-- * Showing total spent by each user through all of their purchases *
SELECT 
        fname, 
        lname, 
        SUM(amount) AS total_spent
FROM customers 
JOIN orders 
        ON customers.id = orders.customer_id
GROUP BY orders.customer_id
ORDER BY amount DESC;

-- Left Joins 
SELECT fname, lname, order_date, amount 
FROM customers 
LEFT JOIN orders
        ON customers.id = orders.customer_id;

SELECT 
        fname, 
        lname, 
        IFNULL(SUM(amount), 0) AS total_spent
FROM customers
LEFT JOIN orders
        ON customers.id = orders.customer_id
GROUP BY customers.id
ORDER BY total_spent ASC;

SELECT
        first_name,
        IFNULL(title, 'MISSING'),
        IFNULL(grade, 0)
FROM students
LEFT JOIN papers
        ON students.id = papers.student_id;

-- Sam:96, Jacob:85, Jerry:74, Madison:63, Mathew:52
SELECT
        first_name,
        IFNULL(AVG(grade), 0) AS average,
        CASE
          WHEN AVG(grade) IS NULL THEN 'FAILING'
          WHEN AVG(grade) >= 75 THEN 'PASSING';
          ELSE 'FAILING'
        END as passing_status
FROM students
LEFT JOIN papers
        ON students.id = papers.student_id
GROUP BY students.id
ORDER BY average DESC;


/*****************************
 * Many to Many Statements
*****************************/
SELECT title, rating FROM series
JOIN reviews
        ON series.id = reviews.series_id;

SELECT 
    title,
    IFNULL(AVG(rating), 'N/A') AS avg_rating
FROM series
JOIN reviews
    ON series.id = reviews.series_id
GROUP BY series.id 
ORDER BY avg_rating ASC;

SELECT
    title,
    genre,
    ROUND(AVG(rating), 2) AS avg_rating
FROM series
INNER JOIN reviews ON series.id = reviews.series_id
GROUP BY genre
ORDER BY avg_rating ASC;

SELECT
    title,
    genre,
    COUNT(rating)
    IFNULL(MIN(rating), 0) AS Min,
    IFNULL(MAX(rating), 0) AS Max,
    ROUND(IFNULL(AVG(rating), 0), 2) AS Avg,
    IF(COUNT(rating) >= 1, 'ACTIVE', 'INACTIVE') AS STATUS
FROM series
LEFT JOIN reviews ON series.id = reviews.series_id
GROUP BY last_name, first_name
ORDER BY Avg DESC;


/*****************************
 * Delimeters
*****************************/
-- If the user being added is under 18 the database trigger will stop the insert
DELIMITER $$

CREATE TRIGGER must_be_adult
    BEFORE INSERT ON users FOR EACH ROW
    BEGIN
        IF NEW.age < 18
        THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Must be an adult';
        END IF;
    END;
$$

DELIMITER;

-- If the follower_id is equal to the followee_id 
DELIMITER $$

CREATE TRIGGER prevent_self_follow
    BEFORE INSERT ON follows FOR EACH ROW
    BEGIN
        IF NEW.follower_id = NEW.followee_id
        THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'You cannot follow yourself';
        END IF;
    END;
$$

DELIMITER;

-- Insert into unfollow table after a user unfollows another user
DELIMITER $$

CREATE TRIGGER capture_unfollow
    AFTER DELETE ON follows FOR EACH ROW
    BEGIN
        -- INSERT INTO unfollows(follower_id, followee_id) 
        -- VALUES (OLD.follower_id, OLD.followee_id)
        INSERT INTO unfollows
        SET follower_id = OLD.follower_id
            followee_id = OLD.followee_id;
    END;
$$

DELIMITER;
-- We could create an archived client section with this for if they ever delete users from the database

/*****************************
 * Data Type Notes

CHAR: Has fixed character lengths, will chop or give spaces to desired amount
VARCHAR: varies
DECIMAL(5,2): 999.99 5 digits with 2 decimals, and are exact
FLOAT and DOUBLE numbers are APPROXIMATE, and can store larger numbers in less space but at the cost of precision
DATE: 'YYYY-MM-DD'
TIME: 'HH:MM:SS'
DATETIME: 'YYYY-MM-DD HH:MM:SS'
CURDATE, CURTIME, NOW

You can use CASE statements to remove nulls from different columns
The other way is for a column: ISNULL("item to check if null", "what to replace it with if it is null")

*****************************/