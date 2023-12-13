import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLocationDot,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import cloudy from "./assets/cloudy.jpg";
import drizzle from "./assets/drizzle.png";
import snow from "./assets/snow.png";
import sunny from "./assets/sunny.jpg";
import thunder from "./assets/thunder.jpg";
import wind from "./assets/wind.png";
import humid from "./assets/humid.png";
import windicon from "./assets/winicon.png";
function App() {
  let apiKey = "d0acf03fce49fe1a52ee286b83455656";
  //const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState("Kathmandu");
  const [city, setCity] = useState("Kathmandu");
  const [info, setInfo] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setwindSpeed] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [desc, setDesc] = useState("");
  const [background, setBackground] = useState("");
  const [iconid, setIconid] = useState("");
  const [wicon, setWicon] = useState("");
  const [seeMore,setSeeMore]=useState("False");
  const [weatherdetails,setWeatherDetails]=useState([]);
  
  const handleSearchCity = () => {
    setCity(search);
    setSearch("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = response?.data;
        console.log("data --->", data);
       

        setInfo(Math.floor(data.main.temp));
        setHumidity(data.main.humidity);
        setwindSpeed(data.wind.speed);
        setMinTemp(data.main.temp_min);
        setMaxTemp(data.main.temp_max);
        setDesc(data.weather[0].description);
        setBackground(data.weather[0].main);
        setIconid(data.weather[0].icon);

        if (background === "Clear") {
          setWicon(sunny);
        } else if (background === "Clouds") {
          setWicon(cloudy);
        } else if (background === "Drizzle") {
          setWicon(drizzle);
        } else if (background === "Thunderstorm") {
          setWicon(thunder);
        } else if (background === "Mist") {
          setWicon(wind);
        } else if (background === "Snow") {
          setWicon(snow);
        } else {
          setWicon("");
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        handleSearchCity();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [city, apiKey, iconid, background, handleSearchCity,]);

  const getBackgroundColor = () => {
    switch (background) {
      case "Clear":
        return "linear-gradient(to right top, #f88508, #f0aa3d, #ecc96f, #ede3a3, #f6fad9)";
      case "Clouds":
        return "linear-gradient(56deg, rgba(105,142,181,0.9276960784313726) 24%, rgba(75,130,186,1) 60%, rgba(79,129,249,1)";
      case " Drizzle":
        return "linear-gradient(56deg, rgba(27,40,69,1) 24%, rgba(88,153,226,1) 60%, rgba(255,255,255,1) 100%)";
      case "Rain":
        return "linear-gradient(30deg, #d3d3d3 30%, #57606f)";
      case "Thunderstorm ":
        return "linear-gradient(56deg, rgba(15,66,117,0.9276960784313726) 24%, rgba(0,51,102,1) 60%, rgba(0,21,72,1) 100%)";
      case "Snow":
        return "linear-gradient(315deg, #f1f2f6 0%, #c9c6c6 74%)";
      case "Mist":
        return "linear-gradient(147deg, #c3cbdc 0%, #edf1f4 74%)";
      default:
        return "#ffffff";
    }
  };
  const dynamicBackground = {
    backgroundImage: getBackgroundColor(),
  };
  const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();
  
  const add=()=>{
    setSeeMore("True")
  }
 
  return (
    <>
      <div className="Title">WEATHER APP</div>
      <div className="card" style={dynamicBackground}>
        <div className="search">
          <div className="searchBar">
            <input
              className="cityInput"
              type="text"
              placeholder="Enter City"
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          </div>
          <div className="searchIcon" onClick={handleSearchCity}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
          </div>
        </div>
        <div className="WeatherUpdate">
        {seeMore === "True" ? (
          <div>
            {weatherdetails.map((data, index) => (
              <div key={index}>
                <div className="row eachWeather">
                <div className="col-8">{data.city}</div>
                <div className="col-4">{data..temp}°C</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="cityName">
              <FontAwesomeIcon icon={faLocationDot} className="fontAwesome" />
              {city}
            </div>
            <div className="date">
              {weeks[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()]}
            </div>
            <div className="image">
              <img className="weatherLogo" src={wicon}></img>
            </div>
            <div className="temp">{info}°C</div>
            <div className="description">{desc}</div>
            <div className="minMaxTemp">
              <div>Max:{minTemp}°C</div>
              <div className="divider"></div>
              <div>Min: {maxTemp}°C</div>
            </div>
    
            <div className="humidityWindIndex">
              <div className="humidity">
                <img src={humid} className="humidIcon"></img>
                {humidity} %
              </div>
              <div className="Wind">
                <img src={windicon} className="windIcon"></img>
                {windSpeed} km/hr
              </div>
            </div>
            <div className="seeMoreDiv">
              <button className="seeMoreButton" onClick={add}>See More<FontAwesomeIcon className='arrow' icon={faArrowRight} style={{color: "#000000",}} /></button>
            </div>
            </div>
         ) }
        </div>
      </div>
    </>
  );
}

export default App;
