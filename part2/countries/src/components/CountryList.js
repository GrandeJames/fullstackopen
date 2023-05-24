import { useState } from "react";
import CountryView from "./CountryView";

const CountryList = ({ country }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div key={country.name.common}>
      {country.name.common}
      <button onClick={handleShow}>{show ? "hide" : "show"}</button>
      {show && <CountryView country={country}></CountryView>}
    </div>
  );
};

export default CountryList;
