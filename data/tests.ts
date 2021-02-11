import {formatString, parseBool, parseCurrency, parseUnixTime} from "./load-data-into-sqlite";

let passed = true;

function assertEqual(expected, actual) {
  if (actual !== expected) {
    passed = false;
    console.error(`Expected ${actual} to equal ${expected}.`)
  }
}

function assertThrows(func: () => void) {
  try {
    func();
    console.error(`Expected ${func} to throw an exception.`)
  }
  catch (e) {

  }
}

assertEqual(1709337600, parseUnixTime("02/03/2024"));
assertEqual(null, parseUnixTime(""));
assertEqual(null, parseUnixTime(null));
assertEqual(null, parseUnixTime(undefined));

assertEqual(1, parseCurrency("£1"));
assertEqual(1234, parseCurrency("£1,234.00"));
assertEqual(178288544.48, parseCurrency("£178,288,544.48"));
assertThrows(() => parseCurrency(null));
assertThrows(() => parseCurrency(undefined));
assertThrows(() => parseCurrency(""));

assertEqual(true, parseBool("Yes"));
assertEqual(true, parseBool(" Yes "));
assertEqual(true, parseBool("yes"));
assertEqual(false, parseBool("no"));
assertEqual(false, parseBool(" No "));
assertEqual(false, parseBool(""));

assertEqual(true, parseBool("True"));
assertEqual(true, parseBool(" true "));
assertEqual(false, parseBool("false"));
assertEqual(false, parseBool(" False "));
assertEqual(false, parseBool("False"));
assertEqual(false, parseBool(""));

assertThrows(() => formatString(null));
assertThrows(() => formatString(undefined));

if (!passed) {
  console.error("Failed.")
}
else {
  console.log("Passed.")
}
