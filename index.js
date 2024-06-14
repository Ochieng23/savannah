const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const listEndpoints = require("express-list-endpoints");
const dotenv = require("dotenv");
const helmet = require("helmet");
const User = require("./models/user.model");
const authRoute = require("./routes/auth.route");
const pediatricianRoute = require("./routes/paeditrician.route");
const gynecologistRoute = require("./routes/gynecologist.route");
const ophthalmologistRoute = require("./routes/opthamologist.route");
const generalPractitionerRoute = require("./routes/generalPractitioner.route");
const dentistRoute = require("./routes/dentist.route");
const physiotherapistRoute = require("./routes/physiotherapist.route");
const oncologistRoute = require("./routes/oncologist.route");
const patientRoute = require("./routes/patient.route");

dotenv.config();

if (!process.env.DATABASE_URL || !process.env.SESSION_SECRET) {
  console.error("Missing necessary environment variables.");
  process.exit(1);
}

const app = express();

// Security middleware
app.use(helmet());

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Define routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoute);
app.use("/patients", patientRoute);
app.use("/pediatricians", pediatricianRoute);
app.use("/gynecologists", gynecologistRoute);
app.use("/ophthalmologists", ophthalmologistRoute);
app.use("/general-practitioners", generalPractitionerRoute);
app.use("/dentists", dentistRoute);
app.use("/physiotherapists", physiotherapistRoute);
app.use("/oncologists", oncologistRoute);

// MongoDB connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

  // List endpoints
console.log(listEndpoints(app));