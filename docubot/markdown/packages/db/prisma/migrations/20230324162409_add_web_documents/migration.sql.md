# README

## TODO Items
- None

## Known Issues
- None

## Description
This file contains the SQL code to create a table named "WebDocument" with the following columns:
- id (TEXT, NOT NULL)
- url (TEXT, NOT NULL)
- domain (TEXT, NOT NULL)
- content (TEXT)
- pageTitle (TEXT)
- pageLastUpdatedAt (TIMESTAMP(3))
- createdAt (TIMESTAMP(3), NOT NULL, DEFAULT CURRENT_TIMESTAMP)
- updatedAt (TIMESTAMP(3), NOT NULL, DEFAULT CURRENT_TIMESTAMP)

It also creates a unique index on the "url" column of the "WebDocument" table.

## Usage
This SQL code can be used to create the "WebDocument" table in a database.

## Contributing
This code is provided as-is and is not actively maintained. However, feel free to fork the repository and make any necessary changes.

## License
This code is released under the MIT License.