CREATE TABLE foodtruck (
    id SERIAL PRIMARY KEY,
    locationid INTEGER,
    applicant VARCHAR(71) NOT NULL,
    facilitytype VARCHAR(9),
    cnn INTEGER NOT NULL,
    locationdescription VARCHAR(106) NOT NULL,
    address VARCHAR(29),
    blocklot VARCHAR(9),
    block VARCHAR(5),
    lot VARCHAR(5),
    permit VARCHAR(10) NOT NULL,
    status VARCHAR(12) NOT NULL,
    fooditems VARCHAR(373),
    x FLOAT,
    y FLOAT,
    latitude FLOAT,
    longitude FLOAT,
    schedule VARCHAR(159) NOT NULL,
    noisent DATE,
    approved TIMESTAMP,
    received TIMESTAMP NOT NULL,
    priorpermit INTEGER NOT NULL,
    expirationdate DATE,
    location VARCHAR(37)
);
alter table foodtruck add column id serial primary key not null unique;

CREATE TABLE fooditem (
    id VARCHAR PRIMARY KEY,
    title VARCHAR
);
alter table fooditem add column parent_id varchar
    REFERENCES fooditem (id) check (parent_id != id);

with items as (select trim(unnest(string_to_array(fooditems, ':'))) i from foodtruck group by 1) insert into fooditem (id, title) select distinct on (id) regexp_replace(lower(i), '[^[:alpha:]]+', '_', 'g') id, i from items;

create table foodtruck_fooditem (
    foodtruck_id INTEGER REFERENCES foodtruck (id) ON DELETE CASCADE,
    fooditem_id VARCHAR REFERENCES fooditem (id) ON DELETE CASCADE,
    UNIQUE(foodtruck_id, fooditem_id)
);

with items as (select id, trim(unnest(string_to_array(fooditems, ':'))) i from foodtruck group by 1,2) insert into foodtruck_fooditem (foodtruck_id, fooditem_id) select distinct id, regexp_replace(lower(i), '[^[:alpha:]]+', '_', 'g') itemid from items;

delete from fooditem where id in (
    '_multiple_trucks_on_rotation_on_mission_bay_blvd_south_on_th_st_serving_everything_but_hot_dogs',
    'arugula_and_drinks_'
)
