import {useEffect, useState} from 'react'
import './App.css';

function App() {
  const [positionx,setPositionx]=useState(0)
  const [positiony,setPositiony]=useState(0)
  const [wether,setWeather]=useState('')
  const [temprature,setTemprature]=useState(0)
  const [cityname,setCityname]=useState('')

  const savePositionToState=(position)=>{
    setPositionx(position.coords.latitude)
    setPositiony(position.coords.longitude)
  }

  const url=`https://api.openweathermap.org/data/2.5/weather?lat=${positionx}&lon=${positiony}&appid=8c28c6ea79c65008ef2a150d8487bb99&units=metric`
  const fetchWeather= async()=>{
    try {
     await window.navigator.geolocation.getCurrentPosition(savePositionToState);
      const res= await fetch(url)
      const data= await res.json()
      setTemprature(data.main.temp)
      setWeather(data.weather[0].main)
      setCityname(data.name)
      console.log(data);
    } catch (error) {
      console.log(error);
    }

  }
 
  useEffect(()=>{
    fetchWeather()
  },[positionx,positiony])
  return (
 <>
 <div className="app">
    <div className="app_contaner">
      <h1>
        {cityname}
      </h1>
      <h2>{temprature}°c</h2>
      <h2>{wether}</h2>
    </div>
 </div>
 </>
  );
}

export default App;
