/*
  This script prepares the package.json of every package in order to be
  correctly deployed as an npm package
*/
const replace = require("replace-in-file");

const packages = ["backoffice", "forms", "image-uploader"];

function replaceAll({ packages }) {
  packages.forEach(doReplace);
}

async function doReplace(package) {
  try {
    const options = {
      files: `${__dirname}/${package}/package.json`,
      from: [/src\/index.ts/, /src\/index.ts/],
      to: ["dist/index.umd.cjs", "dist/index.js"],
    };

    await replace(options);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

replaceAll({ packages });
