const mongoose = require("mongoose");

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log("you must have 3 args to retrieve");
  console.log("you must have 5 args to add");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://GrandeJames:${password}@cluster0.kb5u0ok.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const name = process.argv[3];
  const phoneNumber = process.argv[4];

  const person = new Person({
    name,
    phoneNumber,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${phoneNumber} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.phoneNumber}`);
    });
    mongoose.connection.close();
  });
}
