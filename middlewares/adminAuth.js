const adminAuthMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  if (email === "admin@example.com" && password === "admin") {
    next();
  } else {
    res.status(403).send("Access Denied");
  }
};

module.exports = adminAuthMiddleware;
