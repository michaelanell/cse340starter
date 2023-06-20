-- insert Tony Stark into account table
INSERT INTO account
	(account_firstname, account_lastname, account_email, account_password)
VALUES
	('Tony','Stark','tony@starkent.com','Iam1ronM@n')

-- Update Tony Stark's account type to Admin
UPDATE
  account
SET
  account_type = 'Admin' 
WHERE
  account_email = 'tony@starkent.com'

-- Remove account 
DELETE
FROM
  account
WHERE
  account_id = 1

-- Modify the "GM Hummer" record to read "a huge interior" rather than "small interiors"
UPDATE 
	inventory
SET 
	inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE
	inv_make = 'GM'

-- Use a join to select the make and model fields from the inventory table and the classification name field from the classification table for inventory items that belong to the "Sport" category
SELECT
	inv_make,
	inv_model
FROM
	inventory
INNER JOIN classification
	ON inventory.classification_id = classification.classification_id
WHERE 
	classification.classification_id = 2

-- Update 

UPDATE 
	inventory
SET 
	inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/')

    