const Sequelize = require("sequelize");
const fs = require("fs");
// var anzip = require("anzip");
const base64 = require("base64url");
const moment = require("moment");
const Str = require("@supercharge/strings");

const randomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

let getUniqueNameForFile = (fileName) => {
  let milliseconds = new Date().getTime();
  let splitedName = fileName.split(".");
  let makeRandomString = randomString(10);
  return (
    splitedName[0] +
    "_" +
    milliseconds.toString() +
    makeRandomString +
    "." +
    splitedName[splitedName.length - 1]
  );
};


const removeDir = function (path) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path);

    if (files.length > 0) {
      files.forEach(function (filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          removeDir(path + "/" + filename);
        } else {
          fs.unlinkSync(path + "/" + filename);
        }
      });
      fs.rmdirSync(path);
    } else {
      fs.rmdirSync(path);
    }
  } else {
    console.log("Directory path not found.");
  }
};

function moveFile(from, to) {
  const source = fs.createReadStream(from);
  const dest = fs.createWriteStream(to);

  return new Promise((resolve, reject) => {
    source.on("end", resolve);
    source.on("error", reject);
    source.pipe(dest);
  });
}

function getDecodedPayloadFromJwtToken(token) {
  // fetching payload from JWT token.
  const jwtParts = token.split(".");
  const payloadInBase64UrlFormat = jwtParts[1];
  return JSON.parse(base64.decode(payloadInBase64UrlFormat));
}

const arrayToChunks = (a, n) =>
  [...Array(Math.ceil(a.length / n))].map((_, i) => a.slice(n * i, n + n * i));

//function removeDuplicates(originalArray, prop) {
const removeDuplicates = function (originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
};

function compareStartAndEndDate(start, end) {
  var startDate = moment(start, "YYYY-MM-DD HH:mm:ss");
  var endDate = moment(end, "YYYY-MM-DD HH:mm:ss");
  var todayDate = new Date();
  if (endDate > todayDate) return -2;
  else if (startDate < endDate) return 1;
  else if (startDate > endDate) return -1;
  else return 0;
}

function convertParamsToQueryString(params, esc) {
  const query = Object.keys(params)
    .map((k) => `${esc(k)}=${esc(params[k])}`)
    .join("&");

  return query;
}

function camelCaseKeys(object) {
  return Object.entries(object).reduce((carry, [key, value]) => {
    var desired = key.toString().replace(/[^\w\s]/gi, "");
    carry[Str(desired).camel().get()] = value;
    return carry;
  }, {});
}

module.exports = {
  getUniqueNameForFile,
  // extractZip,
  removeDir,
  randomString,
  moveFile,
  getDecodedPayloadFromJwtToken,
  arrayToChunks,
  removeDuplicates,
  compareStartAndEndDate,
  convertParamsToQueryString,
  camelCaseKeys,
};
