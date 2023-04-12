import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { countryI } from "./CountriesList";
import { ThemeContext } from "./ThemProvider";
import { useNavigate, useParams } from "react-router-dom";
function CountryDetail() {
  const { mode } = useContext(ThemeContext);
  const { country } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [Country, setCountry] = useState<countryI | undefined>();

  useEffect(() => {
    getCountryDetail();
  }, []);
  const getCountryDetail = async () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/name/${country}`)
      .then(function (response) {
        setCountry(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  };
  return (
    <div
      className="main"
      style={{
        background: mode.background,
      }}
    >
      {loading ? (
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
        <>
          <div
            style={{
              background: mode.background,
              color: mode.foreground,
              padding: "20px 20px",
              display: "flex",
            }}
          >
            <button
              type="button"
              className="button"
              style={{ background: mode.foreground, color: mode.background }}
              onClick={() => {
                navigate("/");
              }}
            >
              <div className="btn-box">
                <span className="material-icons-sharp">arrow_back</span>
                <span>Back</span>
              </div>
            </button>
          </div>

          <div
            className="country-detail-box"
            style={{
              background: mode.background,
              color: mode.foreground,
            }}
          >
            <div>
              <img src={Country?.flags?.png} className="flag-svg" />
            </div>

            <div className="country-detail" style={{ color: mode.foreground }}>
              <div>
                <h2>{Country?.name?.common}</h2>
                <p>
                  <span className="detail-heading">Population :</span>{" "}
                  {Country?.population}
                </p>
                <p>
                  <span className="detail-heading">Region :</span>{" "}
                  {Country?.region}
                </p>
                <p>
                  <span className="detail-heading">Capital : </span>{" "}
                  {Country?.capital ? Country.capital[0] : ""}
                </p>
                <p>
                  <span className="detail-heading">Sub Region : </span>{" "}
                  {Country?.subregion}
                </p>
                <p>
                  <span className="detail-heading">Capital : </span>{" "}
                  {Country?.capital}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CountryDetail;
