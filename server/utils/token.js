import jwt from "jsonwebtoken";

function generateToken(res, id) {
  const token = jwt.sign({ id: id }, "mySecretKey", {
    expiresIn: 86400,
  });
  res.cookie("access_token", token, {
    expires: new Date(Date.now() + 86400000),
    httpOnly: true,
  });
  return token;
}

function verifyToken(req, res) {}

export { generateToken, verifyToken };
