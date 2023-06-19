const jwt = require("jsonwebtoken");

function generateToken(userId) {
  const token = jwt.sign({ userId }, "your-secret-key", {
    expiresIn: "1h", // Token expiration time
  });
  return token;
}

module.exports = { generateToken };
