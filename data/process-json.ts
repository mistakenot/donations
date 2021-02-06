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
  acceptedDate: number;
  accountingUnitName: string;
  accountingUnitAsCentralParty: string;
  isSponsorship: boolean;
  donationType: string;
  natureOfDonation: string;
  purposeOfVisit: string;
  donationAction: string;
  receivedDate: number;
  reportedDate: number;
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

export async function loadModelFromJson() {

  const donors = new Map<number, Donor>();
  const donatee = new Map<number, Donatee>();
  const donation = new Map<string, Donation>();
  const rows = readProcessedElectoralComissionDonations();

  for (const row of rows) {
    const {DonorId, RegulatedEntityId, ECRef} = row;

    if (!DonorId || !RegulatedEntityId || !ECRef) {
      console.error("Donation row is missing required data", {DonorId, RegulatedEntityId, ECRef})
      continue;
    }

    const donorId = parseInt(DonorId);
    const regulatedEntityId = parseInt(RegulatedEntityId);

    if (!donors.has(donorId)) {
      donors.set(donorId, {
        donorId: donorId,
        donorName: formatString(row.DonorName),
        donorStatus: formatString(row.DonorStatus),
        companyRegistrationNumber: formatString(row.CompanyRegistrationNumber),
        postcode: formatString(row.Postcode)
      })
    }

    if (!donatee.has(regulatedEntityId)) {
      donatee.set(regulatedEntityId, {
        regulatedDoneeType: formatString(row.RegulatedEntityId),
        regulatedEntityId: regulatedEntityId,
        regulatedEntityName: formatString(row.RegulatedEntityName),
        regulatedtityType: formatString(row.RegulatedEntityType)
      })
    }

    if (!donation.has(ECRef)) {
      donation.set(ECRef, {
        ecRef: ECRef,
        value: parseCurrency(row.Value),
        acceptedDate: parseUnixTime(row.AcceptedDate),
        accountingUnitName: formatString(row.AccountingUnitName),
        accountingUnitAsCentralParty: row.AccountingUnitsAsCentralParty,
        isSponsorship: parseBool(row.IsSponsorship),
        donationType: formatString(row.DonationType),
        natureOfDonation: formatString(row.NatureOfDonation),
        purposeOfVisit: formatString(row.PurposeOfVisit),
        donationAction: formatString(row.DonationAction),
        receivedDate: parseUnixTime(row.ReceivedDate),
        reportedDate: parseUnixTime(row.ReportedDate),
        isReportedPrePoll: parseBool(row.IsReportedPrePoll),
        reportingPeriodName: formatString(row.ReportingPeriodName),
        isBequest: parseBool(row.IsBequest),
        isAggregation: parseBool(row.IsAggregation),
        regulatedEntityId: regulatedEntityId,
        accountingUnitId: formatString(row.AccountingUnitId),
        donorId: donorId,
        campaignName: formatString(row.CampaigningName),
        registerName: formatString(row.RegisterName),
        isIrishSource: parseBool(row.IsIrishSource)
      })
    }
  }

  console.log(donors.size, donatee.size, donation.size);
  const db = new Database('./database.sqlite');

  async function run(sql: string, args: any) {
    return new Promise((resolve, reject) => {
      db.run(sql, args, (err) => {
        if (err) {
          console.error("Sql failed", {sql, args});
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
      console.log('Imported donor ' + donor.donorId);
    }

    for (const donor of donatee.values()) {
      const values = Object.keys(donor).map(k => "$" + k);
      const joined = values.join(", ");
      const mapped = Object.keys(donor)
        .reduce((s, k) => ({...s, ...{["$" + k]: donor[k]}}), {});

      await run(`insert into donatee values (${joined})`, mapped);
      console.log('Imported donatee ' + donor.regulatedEntityId);
    }

    for (const donor of donation.values()) {
      const values = Object.keys(donor).map(k => "$" + k);
      const joined = values.join(", ");
      const mapped = Object.keys(donor)
        .reduce((s, k) => ({...s, ...{["$" + k]: donor[k]}}), {});

      await run(`insert into donation values (${joined})`, mapped);
      console.log('Imported donation ' + donor.ecRef);
    }
  }

  await load();
}

export function parseUnixTime(date: string) {
  if (!date) {
    return null;
  }

  const trimmed = date.trim();
  const day = trimmed.match(/^\d\d(?=\/)/);
  const month = trimmed.match(/(?<=\/)\d\d(?=\/)/);
  const year = trimmed.match(/(?<=\/)\d\d\d\d$/);
  const unix = new Date(`${year}-${month}-${day}`).getTime() / 1000;
  const unixInt = parseInt(unix.toString());
  return unixInt;
}

export function parseCurrency(currency: string) {
  const currencyString = currency
    .trim()
    .replace("£", "")
    .replace(",", "")
    .replace(",", "");

  if (!currencyString.match(/^[\d\.]+$/)) {
    throw new Error("Currency string is badly formatted: " + currencyString);
  }

  return parseFloat(currencyString);
}

export function parseBool(bool: string) {
  const trimmed = bool.toLowerCase().trim();
  return trimmed === "yes" || trimmed === "true";
}

export function formatString(value: string) {
  if (value === null || value === undefined) {
    throw new Error("value must be defined")
  }
  return value.trim();
}
