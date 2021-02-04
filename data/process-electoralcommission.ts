import {validate} from 'jsonschema';
import {createReadStream, readFileSync, writeFileSync} from 'fs';
import * as csv from 'csv-parser';
import {JSONSchema7} from 'json-schema';

const dirname = __dirname;
const filename = dirname + "/raw/search.electoralcommission.org.uk.csv"
const downloadUrl = 'http://search.electoralcommission.org.uk/api/csv/Donations?start={start}&rows={pageSize}&query=&sort=AcceptedDate&order=desc&et=rd&et=pp&et=tp&et=perpar&et=ppm&date=&from=&to=&rptPd=&prePoll=false&postPoll=true&register=gb&register=ni&register=none&isIrishSourceYes=true&isIrishSourceNo=true&includeOutsideSection75=true';
const date: any = { type: 'string', format: '^\d\d/\d\d/\d\d\d\d$' };
const trueFalse: any = { type: 'string', enum: ['True', 'False'] };
const nonEmptyString: any = { type: 'string', minLength: 1 };

const schema = {
  type: 'object',
  properties: {
    ECRef: nonEmptyString,
    RegulatedEntityName: nonEmptyString,
    RegulatedEntityType: { type: 'string', enum: [
        'Permitted Participant',
        'Political Party',
        'Regulated Donee',
        'Third Party']
    },
    Value: { type: 'string', minLength: 1, format: "^£[\d,]+.\d\d$" },
    AcceptedDate: date,
    AccountingUnitName: { type: 'string' },
    DonorName: { type: 'string' },
    AccountingUnitsAsCentralParty:  trueFalse,
    IsSponsorship: trueFalse,
    DonorStatus: { type: 'string', enum: [
        'Registered Political Party',
        'Individual',
        'Company',
        'Trade Union',
        'Limited Liability Partnership',
        'Unincorporated Association',
        'Public Fund',
        'Friendly Society',
        'Other',
        'Trust',
        'Building Society',
        'Impermissible Donor',
        'N/A',
        'Unidentifiable Donor'
      ]
    },
    RegulatedDoneeType:  { type: 'string', enum: [
        '',
        'Mayor',
        'MP - Member of Parliament',
        'GLA - Assembly Member (Greater London)',
        'Senedd Member',
        'Police and Crime Commissioner',
        'MSP - Member of the Scottish Parliament',
        'Members Association',
        'Cllr. - Member of a Local Authority',
        'Member of Registered Political Party',
        'Candidate',
        'MLA - Member of the Legislative Authority of Northern Ireland',
        'AM - Member of the National Assembly for Wales',
        'Leadership Candidate',
        'MEP - Member of the European Parliament'
      ]
    },
    CompanyRegistrationNumber: { type: 'string' },
    Postcode: { type: 'string' },
    DonationType: { type: 'string', enum: [
        'Cash',
        'Exempt Trust',
        'Impermissible Donor',
        'Non Cash',
        'Permissible Donor Exempt Trust',
        'Public Funds',
        'Total value of donations not reported individually',
        'Unidentified Donor',
        'Visit'] },
    NatureOfDonation: { type: 'string' },
    PurposeOfVisit: { type: 'string' },
    DonationAction: { type: 'string', enum: [
        '',
        'Deferred',
        'Forfeited',
        'Returned'] },
    ReceivedDate: date,
    ReportedDate: date,
    IsReportedPrePoll: { type: 'string', enum: ['', 'False'] },
    ReportingPeriodName: nonEmptyString,
    IsBequest: trueFalse,
    IsAggregation: trueFalse,
    RegulatedEntityId: nonEmptyString,
    AccountingUnitId: { type: 'string' },
    DonorId: { type: 'string' },
    CampaigningName: { type: 'string' },
    RegisterName: { type: 'string' },
    IsIrishSource: { type: 'string' }
  },
  additionalProperties: false,
  minProperties: 29
}

type RowKey = keyof (typeof schema.properties);
export type Donation = {
  [Key in RowKey]: string;
}

const rows: Donation[] = [];

createReadStream(filename)
  .pipe(csv({
    headers: Object.keys(schema.properties),
    skipLines: 1,
    separator: ','
  }))
  .on('data', (row: Donation) => {
    try {
      validate(row, schema, {throwError: true, allowUnknownAttributes: false});
      rows.push(row);
    }
    catch(error) {
      console.error('Row failed', {row, error});
      throw error;
    }
  })
  .on('end', () => {
    onComplete()
  })

function onComplete() {
  const json = JSON.stringify(rows);
  const schemaJson = JSON.stringify({
    type: 'array',
    items: schema
  })

  writeFileSync(__dirname + '/processed/search.electoralcommission.org.uk.json', json)
  writeFileSync(__dirname + '/processed/search.electoralcommission.org.uk.schema.json', schemaJson)
}

export function readProcessedElectoralComissionDonations(): Donation[] {
  const path = __dirname + '/processed/search.electoralcommission.org.uk.json';
  const buffer = readFileSync(path);
  const string = buffer.toString('utf8');
  const json: any[] = JSON.parse(string);
  json.forEach(row => validate(row, schema, {throwError: true, allowUnknownAttributes: false}));
  return json;
}
