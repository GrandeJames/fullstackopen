const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());

morgan.token("data", (req, res) => JSON.stringify(req.body));

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms :data"
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const date = new Date().toString();
  console.log(date);
  response.send(
    `<p>Phonebook has info for ${[persons.length]} people<p>${date}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

app.post("/api/persons", morganMiddleware, (request, response) => {
  const id = getRandomInt(1, 1000000);
  const person = request.body;
  person.id = id;

  if (!person.name || !person.number) {
    return response.status(400).json({ error: "content missing" });
  }
  if (persons.find((p) => p.name === person.name)) {
    return response.status(409).json({ error: "name must be unique" });
  }
  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});
