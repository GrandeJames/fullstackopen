import axios from "axios";

const getAll = () => {
  return axios
    .get("http://localhost:3001/persons")
    .then((response) => response.data);
};

const create = (person) => {
  return axios
    .post("http://localhost:3001/persons", person)
    .then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`http://localhost:3001/persons/${id}`);
};

const update = (id, person) => {
  return axios
    .put(`http://localhost:3001/persons/${id}`, person)
    .then((response) => response.data);
};

const personsService = { getAll, create, remove, update };

export default personsService;
