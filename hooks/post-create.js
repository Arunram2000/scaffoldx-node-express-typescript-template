const { execSync } = require("child_process");

console.log("📦 Installing dependencies...");
execSync("npm install", { stdio: "inherit" });
console.log("✅ Project ready! Run: npm run dev");
