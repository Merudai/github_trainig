import './App.css';
import React,{useState} from "react";
import Title from "./components/Title";
import Form from "./components/Form";
import Results from "./components/Results";
import Loading from "./components/Loading";
import axios from "axios";

function App() {
  const [city,setCity] = useState("")
  const [loading,setLoading] = useState(false)
  const getWeather =(e)=> {
      e.preventDefault();
      setLoading(true);
      axios.get(`http://api.weatherapi.com/v1/current.json?key=45cb851c7c98437c860172513212604&q=${city}&aqi=no`)
      .then(res => {
        setResults({
          country:res.data.location.country,
          cityName:res.data.location.name,
          temperature:res.data.current.temp_c,
          conditionText:res.data.current.condition.text,
          icon:res.data.current.condition.icon
        });
        setCity("-");
        setLoading(false);
      })
      .catch(err => alert("エラーが発生しました。ページをリロードして、もう一度トライしてください。"));
  }

  const [results,setResults] = useState({
    country:"",
    cityName:"",
    temperature:"",
    conditionText:"",
    icon:""
  });

  return (
    <div className="test">
        <Title />
        <Form setCity={setCity} getWeather={getWeather} />
        {loading ? <Loading />:<Results results={results} />}
    </div>
  );
}

export default App;
