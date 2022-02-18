import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.scss";
import Location from "./Location";
import Footer from "./Footer";
import axios from "axios";

function App() {
  const [locations, setLocations] = React.useState([]);
  const [countries, setCountries] = React.useState([]);
  const [footerLocations, setFooterLocations] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        "https://gw.selinatech.com/locations/api/locations?includeUpcomingLocations=true&content=false"
      )
      .then((response) => {
        const { data } = response;
        setCountries([
          ...new Set(data.map((location) => location.country.name)),
        ]);
        setLocations(data);
        setFooterLocations(data.sort(() => 0.5 - Math.random()).slice(0, 3));
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 77 24"
              className="logo"
            >
              <g>
                <path
                  fill="currentColor"
                  d="M42.28,5.45a2.16,2.16,0,0,0,2.18-2.16,2.2,2.2,0,0,0-2.18-2.2,2.17,2.17,0,0,0-2.15,2.2A2.14,2.14,0,0,0,42.28,5.45Z"
                />
                <path
                  fill="currentColor"
                  d="M76.63,19.84a2.66,2.66,0,0,1-1.83.73,1.35,1.35,0,0,1-1-1.43,5.94,5.94,0,0,1,.11-.71L75.93,8.2a.3.3,0,0,0-.28-.36H72a.36.36,0,0,0-.34.3l-.24,1.1A2.41,2.41,0,0,0,69,7.7c-4.93,0-7.4,6.08-7.61,10.29-.56,1.13-1.68,2.58-2.68,2.58s-1.18-.53-1.18-1.3c0-1.75,1.42-5.51,1.42-8s-1.39-3.52-3.29-3.52a4.32,4.32,0,0,0-3.47,1.74l.25-1.26a.3.3,0,0,0-.28-.36H48.57a.43.43,0,0,0-.4.34L46.3,17.46C45,19.38,44,20.56,42.81,20.55a1.29,1.29,0,0,1-1.21-1.4,6.67,6.67,0,0,1,.11-.74l2-10.09a.4.4,0,0,0-.38-.49H39.88a.37.37,0,0,0-.36.31l-1.9,9.4c-1.3,1.87-2.36,3-3.51,3a1.31,1.31,0,0,1-1.2-1.4,6.48,6.48,0,0,1,.11-.75L36.35,2.07A.32.32,0,0,0,36,1.68l-3.61.51A.5.5,0,0,0,32,2.6L29.19,16.29c-2.05,3.15-4.06,4.55-6.37,4.55-1.13,0-2.12-.82-2.12-2.49,0-.63.05-1.15.05-1.17l.32,0h0l.18,0a7,7,0,0,0,1.21-.26l.07,0h0a6.85,6.85,0,0,0,5-6.29c0-1.56-.88-3-3.21-3-4.73,0-6.95,4.53-7.7,8.23-.45,0-.92,0-1.36,0-.34-6.23-6.72-7-6.72-11.44A2.59,2.59,0,0,1,11.26,1.6a2.23,2.23,0,0,1,2.21,2.13,2.79,2.79,0,0,1-.74,2.15.28.28,0,0,0,.06.42,1.92,1.92,0,0,0,1.07.2,2.42,2.42,0,0,0,1.61-.69,2.6,2.6,0,0,0,.73-1.92C16.2.77,12.55,0,11.15,0,7.32,0,4.3,2.36,4.29,5.6c0,3.82,4.25,5.79,5.65,9.43a27.43,27.43,0,0,0-3.16-.42,8.64,8.64,0,0,0-4.25.8A4.25,4.25,0,0,0,0,18.94a4,4,0,0,0,1.21,3.24C2.83,23.8,5.12,24,6.56,24a9.6,9.6,0,0,0,1.9-.11c3.36-.49,6.28-2.59,6.75-6.45l1.16,0c0,.44-.06.85-.06,1.22,0,3.08,1.83,4.95,4.62,4.95a9,9,0,0,0,7.72-4.14c0,.14,0,.28,0,.41,0,2.41,1.4,3.59,3.18,3.73s3.57-.38,5.53-3.29a3.16,3.16,0,0,0,3.15,3.28c1.56.14,3.19-.18,5.15-2.89L45.17,23a.31.31,0,0,0,.29.38H49a.45.45,0,0,0,.42-.35l1.91-9.48a5.87,5.87,0,0,1,.55-1.68,1.92,1.92,0,0,1,1.7-1.32c.81,0,1.16.62,1.17,1.57,0,2-1.34,5.82-1.34,7.93a3.23,3.23,0,0,0,3.5,3.52c1.27,0,3-.43,4.61-3.26a3.71,3.71,0,0,0,3.78,3.26,5.34,5.34,0,0,0,4.42-2.89,3,3,0,0,0,2.9,2.89c1.9.12,3.64-1,4.35-3.49A.23.23,0,0,0,76.63,19.84ZM24.39,9.51c.51,0,.85.42.85,1.2A5,5,0,0,1,21,15.52C21.6,12.44,22.87,9.51,24.39,9.51Zm-16.25,12a3.86,3.86,0,0,1-2.23.11,2.17,2.17,0,0,1-1.69-2.34,2.56,2.56,0,0,1,2-2.07,9,9,0,0,1,4.16,0v.23C10.37,19.44,9.49,20.93,8.14,21.49ZM71,11.3l-1.33,6.54c-.36,1.8-1.61,2.74-2.47,2.74-.53,0-1.48,0-1.48-2.43,0-2.93,1.45-8.31,4-8.31A1.36,1.36,0,0,1,71,11.3Z"
                />
              </g>
            </svg>
          </Link>

          <div className="selectLocationWrapper">
            <span className="selectLocation">Select Location</span>
            <div className="menu">
              {countries.map((country) => {
                return (
                  <div className="countryWrapper" key={country}>
                    <span className="country">{country}</span>
                    <ul className="subMenu">
                      {locations
                        .filter((location) => location.country.name === country)
                        .map((location) => (
                          <li key={location.id}>
                            <Link to={`/id/${location.id}`}>
                              {location.enData.location}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<div>Home Screen</div>} />
            <Route
              path="/id/:id"
              element={<Location locations={locations} />}
            />
          </Routes>
        </main>
        <Footer locations={footerLocations} />
      </div>
    </BrowserRouter>
  );
}

export default App;
