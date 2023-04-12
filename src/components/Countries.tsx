import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CountriesList, { countryI } from "./CountriesList";
import { ThemeContext } from "./ThemProvider";
function Countries() {
  const { mode } = useContext(ThemeContext);
  const [Countries, setCountries] = useState([]);
  const [Loader, setLoader] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    getAllCountries();
  }, []);
  const options = ["All", "Africa", "America", "Asia", "Europe", "Oceania"];

  const getAllCountries = async () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/all`)
      .then(function (response) {
        setCountries(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoader(false);
      });
  };

  const filteredCountries: countryI[] = Countries.filter((country: any) => {
    return (
      country.name.common.toLowerCase().includes(searchValue.toLowerCase()) &&
      country.region.includes(filterValue)
    );
  });
  const handleFilterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="countries-box" style={{ background: mode.background }}>
      {Loader ? (
        <div className="loader-box">
          <div
            className="loader"
            style={{
              border: "16px solid " + mode.foreground,
              borderTop: "16px solid " + mode.background,
            }}
          ></div>
        </div>
      ) : (
        <div>
          <div className="filter-box">
            <input
              type="text"
              onChange={(e) => handleFilterText(e)}
              style={{}}
              placeholder="Search for a country...."
            />
            <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
              <button
                className="dropbtn"
                style={{
                  width: 200,
                  background: mode.foreground,
                  color: mode.background,
                }}
              >
                {filterValue === "" ? "All" : filterValue}
              </button>
              <div
                className={`dropdown-content ${isOpen && "active"}`}
                style={{ width: 200 }}
              >
                {options.map((name) => (
                  <p onClick={() => setFilterValue(name === "All" ? "" : name)}>
                    {name}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <CountriesList Countries={filteredCountries} />
        </div>
      )}
    </div>
  );
}

export default Countries;
