DROP DATABASE IF EXISTS drinks_db;
CREATE DATABASE drinks_db;
USE drinks_db;

SELECT * FROM drinks;
SELECT * FROM users;
SELECT * FROM DrinkIngredients;


SELECT recipe FROM drinks WHERE recipe LIKE "%gin%" AND recipe NOT LIKE "%ginger%";
SELECT recipe FROM drinks WHERE recipe LIKE "%whiskey%" OR recipe LIKE "%bourbon%" OR recipe LIKE "%scotch%";
SELECT name FROM drinks WHERE name LIKE "b%";