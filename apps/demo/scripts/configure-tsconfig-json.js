/*
  This script prepares the tsconfig.json to include all the necessary options for being used as a standalone project  
*/
import replace from "replace-in-file";
import globalTSConfig from "../../../tsconfig.json" assert { type: "json" };

async function doReplace() {
  try {
    const options = {
      files: `./tsconfig.json`,
      from: `"extends": "../../tsconfig.json"`,
      to: `"compilerOptions": ${JSON.stringify(
        globalTSConfig.compilerOptions
      )}`,
    };

    await replace(options);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

doReplace();
