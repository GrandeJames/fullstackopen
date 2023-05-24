import CountryList from "./CountryList";
import CountryView from "./CountryView";

const Countries = ({ countriesToList }) => {
  if (countriesToList.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (countriesToList.length === 1) {
    const country = countriesToList[0];
    return <CountryView country={country}></CountryView>;
  }
  if (countriesToList.length === 0) {
    return <div>There are no matches</div>;
  }
  return countriesToList.map((country) => (
    <CountryList country={country} key={country.name.common}></CountryList>
  ));
};

export default Countries;
