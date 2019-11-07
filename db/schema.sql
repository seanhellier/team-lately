USE lk5mtuel351h6qm5;

CREATE TABLE users
(
    USER_ID INTEGER NOT NULL
    AUTO_INCREMENT,
	USERNAME varchar
    (255) NOT NULL,
    EMAIL varchar
    (255) NOT NULL,
    POINTS INTEGER
    (30),
    LAST_CHECKIN DATE,
     STATUS VARCHAR
    (255),
	PRIMARY KEY
    (USER_ID)
    )

    CREATE TABLE restaurant
    (
        id INTEGER NOT NULL
        AUTO_INCREMENT,
        rest_id INTEGER NOT NULL,
	REST_NAME varchar
        (255) NOT NULL,
        REST_address varchar
        (255) NOT NULL,
  REST_image varchar
        (255) NOT NULL,
         rest_cuisines varchar
        (255) NOT NULL,
            rest_lat
        (255) NOT NULL,


    CURRENTLY_WAIT INTEGER
        (30) NOT NULL,
    AVG_SM_PARTY_WAIT TIME
        (0) NOT NULL,
    AVG_LG_PARTY_WAIT TIME
        (0) NOT NULL,
	PRIMARY KEY
        (REST_ID)
    )