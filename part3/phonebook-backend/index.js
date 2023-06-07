const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const Person = require('./models/person');

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  return next(error); // Check (added return)
};

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('data', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

app.get('/info', (request, response) => {
  const date = new Date().toString();
  Person.countDocuments({}).then((count) => {
    response.send(`<p>Phonebook has info for ${count} people<p>${date}</p>`);
  });
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// eslint-disable-next-line consistent-return
app.post('/api/persons', (request, response, next) => {
  const { name, phoneNumber } = request.body;

  if (!name) {
    return response.status(400).json({ error: 'name missing' });
  }

  const person = new Person({ name, phoneNumber });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      next(error);
    });
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, phoneNumber } = request.body;

  const person = { name, phoneNumber };
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});
