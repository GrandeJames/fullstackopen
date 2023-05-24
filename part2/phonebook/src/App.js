import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect, useState } from "react";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  useEffect(() => {
    personsService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [search, setSearch] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [success, setSuccess] = useState(true);

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        const newPerson = { ...person, number: newNumber };
        personsService
          .update(person.id, newPerson)
          .then((data) => {
            setPersons(
              persons.map((person) => (person.name === newName ? data : person))
            );
          })
          .catch((error) => {
            setSuccess(false);
            setNotificationMessage(
              `Information of ${person.name} has already been removed from the server`
            );
            setTimeout(() => setNotificationMessage(null), 5000);
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      personsService.create(newPerson).then((data) => {
        setPersons(persons.concat([data]));
        setNewName("");
        setNewNumber("");
        setSuccess(true);
        setNotificationMessage(`Added ${data.name}`);
        setTimeout(() => setNotificationMessage(null), 5000);
      });
    }
  };

  const handleDelete = (id) => {
    const personToRemove = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToRemove.name} ?`)) {
      personsService
        .remove(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(
            `the person ${personToRemove.name} was already deleted from the server`
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const handleSearchInput = (event) => {
    const search = event.target.value; // Gets the updated search
    setSearch(search);
    setShowAll(!search);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        sucess={success}
      ></Notification>
      <Filter handleSearchInput={handleSearchInput}></Filter>
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        setNewName={setNewName}
        newName={newName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
      ></PersonForm>
      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
        handleDelete={handleDelete}
      ></Persons>
    </div>
  );
};

export default App;
