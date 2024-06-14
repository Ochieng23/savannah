const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    government_id: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: [
        
        "patient",
        "pediatrician",
        "gynecologist",
        "ophthalmologist",
        "general_practitioner",
        "dentist",
        "physiotherapist",
        "oncologist",
      ],
    },
    geoLocation: {
      ip: String,
      country_code: String,
      country_name: String,
      region_code: String,
      region_name: String,
      city: String,
      zip: String,
      latitude: Number,
      longitude: Number,
      time_zone: String,
    },
  },
  { timestamps: true }
);

// Apply the passport-local-mongoose plugin to userSchema
userSchema.plugin(passportLocalMongoose, {
  usernameField: "phonenumber",
});

const User = mongoose.model("User", userSchema);

module.exports = User;
