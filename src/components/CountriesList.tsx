import React, { useContext } from "react";
import { ThemeContext } from "./ThemProvider";
import { useNavigate } from "react-router-dom";

type countryNameI = {
  common: string;
};
export type countryI = {
  name: countryNameI;
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  languages: { [name: string]: string };

  flags: { svg: string; png: string };
};
type CountryListContainerProps = {
  Countries: countryI[];
};

const CountriesList: React.FC<CountryListContainerProps> = ({ Countries }) => {
  const { mode, setMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <div
      className="country-box"
      style={{
        background: mode.background,
        // border: mode.foreground + " 3px solid",
      }}
    >
      {Countries.length == 0 ? (
        <h1 style={{ color: mode.foreground }}>NO COUNTRIES FOUND</h1>
      ) : (
        Countries.map((country: countryI) => {
          return (
            <div
              style={{
                background: mode.lightBgColor,
              }}
              onClick={() => navigate("/countries/" + country.name.common)}
            >
              <img src={country.flags.png} className="flag-svg" />
              <div
                className="country-detail"
                style={{ color: mode.foreground }}
              >
                <div>
                  <h2>{country.name.common}</h2>
                  <p>Population : {country.population}</p>
                  <p>Region : {country.region}</p>
                  <p>Capital : {country.capital ? country.capital[0] : ""}</p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CountriesList;
