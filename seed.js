const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { faker } = require('faker'); // Updated import
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const Patient = require('./models/patient.model');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Remove existing data
    await User.deleteMany({});
    await Patient.deleteMany({});
    console.log('Existing data removed');

    const users = [];
    const patients = [];

    // Generate 20 users and corresponding patients
    for (let i = 0; i < 20; i++) {
      const firstname = faker.name.firstName();
      const lastname = faker.name.lastName();
      const email = faker.internet.email();
      const government_id = faker.datatype.uuid();
      const phonenumber = faker.phone.number('###-####');
      const password = await bcrypt.hash('SecurePassword123', 10);

      const newUser = new User({
        firstname,
        lastname,
        email,
        government_id,
        phonenumber,
        password,
        role: 'patient'
      });

      const savedUser = await newUser.save();
      users.push(savedUser);

      const medicalHistory = faker.lorem.sentence();
      const currentMedicalIssue = faker.lorem.words(3);

      const newPatient = new Patient({
        user_id: savedUser._id,
        medicalHistory,
        currentMedicalIssue
      });

      const savedPatient = await newPatient.save();
      patients.push(savedPatient);
    }

    console.log('Data successfully seeded');

    // Close connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
