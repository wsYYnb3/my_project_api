const clerk = require("@clerk/clerk-sdk-node");

async function verifyClerkSession(req, res, next) {
  const sessionToken = req.headers.authorization;

  try {
    const session = await clerk.sessions.verifySession(sessionToken);
    req.session = session;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
}
module.exports = verifyClerkSession;
