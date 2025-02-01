require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const app = express();
// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
// Connect to MongoDB
const DB_URL = process.env.MONGO_DB_URL;
mongoose
  .connect(DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const adminRoutes = require("./routes/adminRoutes");
const faqRoutes = require("./routes/faqRoutes");
app.use(faqRoutes);
app.use(adminRoutes);
console.log(process.env.DB_URL);
// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
