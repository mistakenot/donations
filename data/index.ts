import {readProcessedElectoralComissionDonations} from "./process-electoralcommission";
import {Database} from 'sqlite3';
interface Donor {
  donorId: number;
  donorName: string;
  donorStatus: string;
  companyRegistrationNumber: string;
  postcode: string;
}

interface Donatee {
  regulatedEntityId: number;
  regulatedEntityName: string;
  regulatedtityType: string;
  regulatedDoneeType: string;
}

interface Donation {
  ecRef: string;
  value: number;
  acceptedDate: string;
  accountingUnitName: string;
  accountingUnitAsCentralParty: string;
  isSponsorship: boolean;
  donationType: string;
  natureOfDonation: string;
  purposeOfVisit: string;
  donationAction: string;
  receivedDate: string;
  reportedDate: string;
  isReportedPrePoll: boolean;
  reportingPeriodName: string;
  isBequest: boolean;
  isAggregation: boolean;
  regulatedEntityId: number;
  accountingUnitId: string;
  donorId: number;
  campaignName: string;
  registerName: string;
  isIrishSource: boolean;
}

const donors = new Map<number, Donor>();
const donatee = new Map<number, Donatee>();
const donation = new Map<string, Donation>();
const rows = readProcessedElectoralComissionDonations();

for (const row of rows.filter(r => r.DonorId !== '')) {
  const {DonorId, RegulatedEntityId, ECRef} = row;
  const donorId = parseInt(DonorId);
  const regulatedEntityId = parseInt(RegulatedEntityId);

  if (!donors.has(donorId)) {
    donors.set(donorId, {
      donorId: donorId,
      donorName: row.DonorName,
      donorStatus: row.DonorStatus,
      companyRegistrationNumber: row.CompanyRegistrationNumber,
      postcode: row.Postcode
    })
  }

  if (!donatee.has(regulatedEntityId)) {
    donatee.set(regulatedEntityId, {
      regulatedDoneeType: row.RegulatedEntityId,
      regulatedEntityId: regulatedEntityId,
      regulatedEntityName: row.RegulatedEntityName,
      regulatedtityType: row.RegulatedEntityType
    })
  }

  if (!donation.has(ECRef)) {
    donation.set(ECRef, {
      ecRef: ECRef,
      value: parseFloat(row.Value.substr(1)),
      acceptedDate: row.AcceptedDate,
      accountingUnitName: row.AccountingUnitName,
      accountingUnitAsCentralParty: row.AccountingUnitsAsCentralParty,
      isSponsorship: row.IsSponsorship === "True",
      donationType: row.DonationType,
      natureOfDonation: row.NatureOfDonation,
      purposeOfVisit: row.PurposeOfVisit,
      donationAction: row.DonationAction,
      receivedDate: row.ReceivedDate,
      reportedDate: row.ReportedDate,
      isReportedPrePoll: row.IsReportedPrePoll === "True",
      reportingPeriodName: row.ReportingPeriodName,
      isBequest: row.IsBequest === "True",
      isAggregation: row.IsAggregation === "True",
      regulatedEntityId: regulatedEntityId,
      accountingUnitId: row.AccountingUnitId,
      donorId: donorId,
      campaignName: row.CampaigningName,
      registerName: row.RegisterName,
      isIrishSource: row.IsIrishSource === "True"
    })
  }
}

console.log(donors.size, donatee.size, donation.size);
const db = new Database('./database.sqlite');

async function run(sql: string, args: any) {
  return new Promise((resolve, reject) => {
    db.run(sql, args, (err) => {
      if (err) {
        reject(err);
      }
      resolve({});
    })
  });
}

async function load() {
  for (const donor of donors.values()) {
    const values = Object.keys(donor).map(k => "$" + k);
    const joined = values.join(", ");
    const mapped = Object.keys(donor)
      .reduce((s, k) => ({...s, ...{["$" + k]: donor[k]}}), {});
    await run(`insert into donor values (${joined})`, mapped);
  }

  console.log('done donors');

  for (const donor of donatee.values()) {
    const values = Object.keys(donor).map(k => "$" + k);
    const joined = values.join(", ");
    const mapped = Object.keys(donor)
      .reduce((s, k) => ({...s, ...{["$" + k]: donor[k]}}), {});

    await run(`insert into donatee values (${joined})`, mapped);
  }

  console.log('done donatee');

  for (const donor of donation.values()) {
    const values = Object.keys(donor).map(k => "$" + k);
    const joined = values.join(", ");
    const mapped = Object.keys(donor)
      .reduce((s, k) => ({...s, ...{["$" + k]: donor[k]}}), {});

    await run(`insert into donation values (${joined})`, mapped);
  }
}

load().catch(console.error)
