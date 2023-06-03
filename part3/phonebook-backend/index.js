const express = require('express');

const app = express();
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');

const Person = require('./models/person');

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms :data'
);

morgan.token('data', (req) => JSON.stringify(req.body));

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  return next(error); // Check (added return)
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/info', (request, response) => {
  const date = new Date().toString();
  Person.countDocuments({}).then((count) => {
    response.send(`<p>Phonebook has info for ${count} people<p>${date}</p>`);
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

app.post('/api/persons', morganMiddleware, (request, response, next) => {
  const { body } = request;

  Person.find({ name: body.name }).catch(() => {
    return response.status(409).json({ error: 'name must be unique' });
  });
  const person = new Person({
    name: body.name,
    phoneNumber: body.phoneNumber
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request;

  const person = { name: body.name, phoneNumber: body.phoneNumber };
  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query'
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

app.use(unknownEndpoint);
app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});
