import { useEffect, useState } from "react";
import countriesService from "./services/countriesService";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryInput, setCountryInput] = useState("");

  const countriesToList = countries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(countryInput.toLowerCase());
  });

  useEffect(() => {
    countriesService.getAll().then((result) => setCountries(result));
  }, []);

  const handleChange = (event) => {
    setCountryInput(event.target.value);
  };

  return (
    <>
      <form>
        <div>
          find countries <input onChange={handleChange}></input>
        </div>
      </form>
      {countryInput ? (
        <Countries countriesToList={countriesToList}></Countries>
      ) : (
        <div>Please enter a search query</div>
      )}
    </>
  );
};

export default App;
