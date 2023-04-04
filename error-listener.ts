#!/usr/bin/env node

import { spawn } from "child_process";
import { handleErrors } from "./error-analyzer.js";

const command = process.argv.slice(2);
const childProcess = spawn("npm", ["run", "dev"], {
  stdio: ["pipe", "pipe", "pipe"],
});

childProcess.stdout.pipe(process.stdout);
childProcess.stderr.pipe(process.stderr);

childProcess.stderr.on("data", async (data) => {
  const errorMsg = data.toString();
  const suggestion = await handleErrors(errorMsg);
  if (suggestion) {
    console.log(suggestion);
  }
});

childProcess.stdout.on("data", async (data) => {
  const errorMsg = data.toString();
  const suggestion = await handleErrors(errorMsg);
  if (suggestion) {
    console.log(suggestion);
  }
});

childProcess.on("exit", () => {
  console.log("Next.js process exited.");
});