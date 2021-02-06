import {loadModelFromJson} from "./process-json";
import fs, {existsSync as fileExists} from "fs"
import * as http from "http";
import {processCsvFile} from "./process-electoralcommission";

const csvFilePath = __dirname + "/raw/search.electoralcommission.org.uk.csv";
const jsonPath = __dirname + "/processed/search.electoralcommission.org.uk.json";

async function run() {
  if (!fileExists(csvFilePath)) {
    console.log("Downloading data from electoral commission...")
    await download(process.env.DATA_DOWNLOAD_URL, csvFilePath);
  }

  if (!fileExists(jsonPath)) {
    console.log("Validating raw data...")
    await processCsvFile();
  }

  console.log("Loading into sqlite...")
  await loadModelFromJson();
}

// loadModelFromJson().catch(console.error);
const download = (url: string, path: string) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(path);

  http.get(url, function(response) {
    response.pipe(file);
    response.on("finish", resolve);
    response.on("error", reject);
  });
})

run().catch(console.error);
