const crypto = require("crypto");
const password = process.argv[2] || "AdminPassword123";
const hash = crypto.createHash("sha256").update(password).digest("hex");
console.log(hash);