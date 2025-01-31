const adminAuthMiddleware = (req, res, next) => {
  // Simple authentication check (You can replace this with your own logic)
  const { email, password } = req.body; // Or check in the session/cookies

  if (email === "admin@example.com" && password === "admin") {
    next(); // Allow access if credentials match
  } else {
    res.status(403).send("Access Denied"); // Reject if authentication fails
  }
};

module.exports = adminAuthMiddleware;
