const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const FAQ = require("./models/faqModel");
const dotenv = require("dotenv");
const adminAuthMiddleware = require("./middlewares/adminAuth"); // Import your auth middleware
dotenv.config();
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
mongoose
  .connect("mongodb://localhost:27017/faq_system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const adminRoutes = require("./routes/adminRoutes");
const faqRoutes = require("./routes/faqRoutes");
app.use(faqRoutes);
app.use(adminRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
