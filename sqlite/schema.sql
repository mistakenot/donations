create table donatee (
    id  primary key,
    regulatedEntityType text not null,
    regulatedEntityName text not null
);

create table donor (
    id primary key,
    name text not null,
    status text not null
);

create table donation (
    id integer primary key,
    ecref text not null unique,
    donateeId integer not null,
    acceptedAt real not null,
    donationType text not null,
    natureOfDonation text not null,
    foreign key (donateeId) references donatee(id)
);

insert into donatee values(1, '', '');
insert into donation values(1, '', 1, 1.0, '', '')
