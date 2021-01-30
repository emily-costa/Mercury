/**
 * This SQL script initializes the package manager database, deleting any pre-existing version.
 *
 * @author Andrew Feikema
 *
 * Drop previous versions of the tables if they they exist, in reverse order of foreign keys.
 */

DROP TABLE IF EXISTS Package;
DROP TABLE IF EXISTS Person;
DROP TYPE IF EXISTS State;
DROP TYPE IF EXISTS HallCode CASCADE;
DROP TYPE IF EXISTS PackageColor;
DROP TYPE IF EXISTS PackageSize;
DROP TYPE IF EXISTS PackageType;
DROP TYPE IF EXISTS DeskCode;


/** all possible package statuses */
CREATE TYPE State AS ENUM ('Unassigned', 'Entered', 'Received', 'Archived', 'Deleted');
CREATE TYPE DeskCode AS Enum ('SE', 'NVW', 'KHVR', 'BHT', 'BV', 'BB', 'RVD', 'KE');

/** Hall Codes found here: https://calvin.edu/offices-services/facilities/departments/building-services/Building%20Addresses%20&%20Codes.pdf?dotcmsredir=1 */
CREATE TYPE HallCode AS ENUM ('SZ', 'EL', 'NO', 'VW', 'KL', 'HZ', 'VR', 'BL', 'HY', 'TM', 'BS', 'VE', 'BO', 'BN', 'RK', 'VD', 'AL', 'BT', 'DL', 'GM', 'KP', 'RH', 'TA', 'PH', 'CH', 'TH', 'EP', 'ZT', 'LD');
CREATE TYPE PackageColor AS ENUM ('Yellow', 'Brown', 'White', 'Other');
CREATE TYPE PackageSize AS ENUM ('Small', 'Medium', 'Large', 'Other');
CREATE TYPE PackageType AS ENUM ('Envelope', 'Box', 'Bag', 'Other');

CREATE TABLE Person (
	emailPrefix varchar(10) PRIMARY KEY,
	firstname varchar(25) NOT NULL,
	lastname varchar(25) NOT NULL,
    ResidentHall HallCode,
	ResidentRoom varchar(20), /** e.g. 208 */
	isDeskie boolean
	);

/** Create the schema */
CREATE TABLE Package (
	ID integer PRIMARY KEY,
	DeskID integer NOT NULL,
    Recipient varchar(10) REFERENCES Person(emailPrefix),
	Desk DeskCode NOT NULL,
    Status State NOT NULL,
	EnteredTime timestamp,
	EnteredDeskie varchar(10) REFERENCES Person(emailPrefix),
	ReceivedTime timestamp,
	ReceivedDeskie varchar(10) REFERENCES Person(emailPrefix),
	Size PackageSize,
	Color PackageColor,
	Type PackageType
	);

/** Sample Entries */
INSERT INTO Person ( emailPrefix, firstname, lastname, ResidentHall, ResidentRoom, isDeskie) VALUES
	('ajf34', 'Andrew', 'Feikema', 'SZ', '268', 'false'),
	('eac33', 'Emily', 'Costa', 'TM', '123', 'false'),
	('ctu2', 'Coleman', 'Ulry', 'VD', '323', 'false'),
	('bjd47', 'Ben', 'DeVries', 'VR', '300', 'true'),
	('jkw24', 'Jack', 'Westel', 'GM', '300', 'true'),
	('jab229', 'Jacob', 'Boers', 'TM', '300', 'true')


INSERT INTO Package ( ID, DeskID, Recipient, Desk, Status, EnteredTime, EnteredDeskie, ReceivedTime, ReceivedDeskie, Size, Color, Type) VALUES
	(1, 1, 'ajf34', 'SE', 'Archived', '2020-10-21 14:03:12', 'bjd47', '2020-2-1 18:03:24', 'bjd47', 'Small', 'Yellow', 'Envelope'),
	(2, 21, 'ajf34', 'SE', 'Entered', '2019-5-11 17:53:47', 'bjd47', '2020-2-1 18:03:24', 'bjd47', 'Medium', 'Brown', 'Box'),
	(31, 1, 'eac33', 'BHT', 'Entered', '2020-1-31 18:03:24', 'jab229', '2020-2-1 18:03:24', 'bjd47', 'Large', 'Other', 'Bag');
