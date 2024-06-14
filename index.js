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

// MongoDB connection
(async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Start the server after successful DB connection
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
      // List endpoints
      console.log(listEndpoints(app));
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
})();
