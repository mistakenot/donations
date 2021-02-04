create table donor (
    donorId text not null primary key,
    donorName text not null,
    donorStatus text not null,
    companyRegistrationNumber text not null,
    postcode text not null
);

create table donatee (
    regulatedEntityId text not null primary key,
    regulatedEntityName text not null,
    regulatedEntityType text not null,
    regulatedDoneeType text not null
);

create table donation (
    ecRef text not null primary key,
    value real not null,
    acceptedDate real not null,
    accountingUnitName text not null,
    accountingUnitAsCentralParty text not null,
    isSponsorship bool not null,
    donationType text not null,
    natureOfDonation text not null,
    purposeOfVisit text not null,
    donationAction text not null,
    receivedDate real not null,
    reportedDate real not null,
    isReportedPrePoll boolean not null,
    reportingPeriodName text not null,
    isBequest boolean not null,
    isAggregation boolean not null,
    regulatedEntityId integer not null,
    accountingUnitId text not null,
    donorId integer not null,
    campaignName text not null,
    registerName text not null,
    isIrishSource boolean not null,

    foreign key (regulatedEntityId) references donatee(regulatedEntityId),
    foreign key (donorId) references donatee(donorId)
);
