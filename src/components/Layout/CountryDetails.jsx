
import { useEffect, useState, useTransition } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Loader } from "../UI/Loader";

export const CountryDetails = () => {
  const { name } = useParams();
  const [isPending, startTransition] = useTransition();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await res.json();
        setCountry(data[0]);
      } catch (error) {
        console.error("Error fetching country details:", error);
      }
    });
  }, [name]); 

  if (isPending || !country) {
    return <Loader />;
  }

  return (
    <section className="card country-details-card container">
      <div className="container-card bg-white-box">
        <div className="country-image grid grid-two-cols">
          <img
            src={country.flags.svg}
            alt={country.flags.alt}
            className="flag"
          />
          <div className="country-content">
            <p className="card-title"> {country.name.official} </p>

            <div className="infoContainer">
              <p>
                <span className="card-description"> Native Names:</span>
                {country.name.nativeName
                  ? Object.keys(country.name.nativeName)
                      .map((key) => country.name.nativeName[key].common)
                      .join(", ")
                  : "N/A"}
              </p>
              <p>
                <span className="card-description"> Population: </span>
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="card-description"> Region:</span>
                {country.region}
              </p>
              <p>
                <span className="card-description"> Sub Region:</span>
                {country.subregion}
              </p>
              <p>
                <span className="card-description"> Capital:</span>
                {country.capital}
              </p>
              <p>
                <span className="card-description">Top Level Domain:</span>
                {country.tld && country.tld[0]}
              </p>
              <p>
                <span className="card-description">Currencies: </span>
                {country.currencies
                  ? Object.keys(country.currencies)
                      .map((key) => country.currencies[key].name)
                      .join(", ")
                  : "N/A"}
              </p>
              <p>
                <span className="card-description">Languages: </span>
                {country.languages
                  ? Object.keys(country.languages)
                      .map((key) => country.languages[key])
                      .join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="country-card-backBtn">
          <NavLink to="/country" className="backBtn">
            <button>Go Back</button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};
