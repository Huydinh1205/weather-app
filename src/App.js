import React, { useState, useEffect } from "react";
import "./App.css";
const API = {
  key: "ad065d53c0eadc04f2166a9d69c3303a",
  base: "https://api.openweathermap.org/data/2.5/",
};
const App = () => {
  const [searchCity, setSearchCity] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fetchedData, setFetchedData] = useState("");

  useEffect(() => {
    const fetchWatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      try {
        const response = await fetch(
          `${API.base}weather?q=${searchCity}&units=metric&APPID=${API.key}`
        );
        const data = await response.json();
        if (response.ok) {
          setFetchedData(
            `${data.name}, ${data.sys.country}, ${data.weather[0].description}, ${data.main.temp}`
          );
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };

    fetchWatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button>Search</button>
      </form>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : errorMessage ? (
        <div className="error">{errorMessage}</div>
      ) : (
        <div className="weather-data">{fetchedData}</div>
      )}
    </div>
  );
};

export default App;
