create table donor (
    donorId integer not null primary key,
    donorName text not null default '',
    donorStatus text not null default '',
    companyRegistrationNumber text not null,
    postcode text not null default ''
);

create table donatee (
    regulatedEntityId integer not null primary key,
    regulatedEntityName text not null default '',
    regulatedEntityType text not null default '',
    regulatedDoneeType text not null default ''
);

create table donation (
    ecRef text not null primary key,
    value real not null,
    acceptedDate real null,
    accountingUnitName text not null,
    accountingUnitAsCentralParty text not null,
    isSponsorship bool not null,
    donationType text not null,
    natureOfDonation text not null,
    purposeOfVisit text not null default '',
    donationAction text not null default '',
    receivedDate real null,
    reportedDate real null,
    isReportedPrePoll boolean not null,
    reportingPeriodName text not null  default '',
    isBequest boolean not null,
    isAggregation boolean not null,
    regulatedEntityId integer not null,
    accountingUnitId text not null default '',
    donorId integer not null,
    campaignName text not null default '',
    registerName text not null default '',
    isIrishSource boolean not null,

    foreign key (regulatedEntityId) references donatee(regulatedEntityId),
    foreign key (donorId) references donatee(donorId)
);
