import Weather from "./Weather";

const CountryView = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h4>languages:</h4>
      {Object.keys(country.languages).map((language) => (
        <li key={`${country.name.common}-${language}`}>
          {country.languages[language]}
        </li>
      ))}
      <img
        src={`${country.flags.png}`}
        alt={`${country.name.common} flag`}
        height={150}
      ></img>
      <Weather country={country}></Weather>
    </div>
  );
};

export default CountryView;
