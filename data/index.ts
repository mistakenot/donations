import {loadModelFromJsonIntoSqlite} from "./load-data-into-sqlite";
import fs, {existsSync as fileExists} from "fs"
import * as http from "http";
import {processCsvFile} from "./validate-csv-data";

const csvFilePath = __dirname + "/raw/search.electoralcommission.org.uk.csv";
const jsonPath = __dirname + "/processed/search.electoralcommission.org.uk.json";

async function run() {
  if (!fileExists(csvFilePath)) {
    console.log("Downloading data from electoral commission...")
    await downloadData(process.env.DATA_DOWNLOAD_URL, csvFilePath);
  }

  if (!fileExists(jsonPath)) {
    console.log("Validating raw data...")
    await processCsvFile();
  }

  console.log("Loading into sqlite...")
  await loadModelFromJsonIntoSqlite();
}

// loadModelFromJson().catch(console.error);
const downloadData = (url: string, path: string) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(path);

  http.get(url, function(response) {
    response.pipe(file);
    response.on("finish", resolve);
    response.on("error", reject);
  });
})

run().catch(console.error);
