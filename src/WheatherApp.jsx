import { useState } from "react";

export const WheatherApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "e8e2b537570e4230277d3f89773024c6";
  const difKelvin = 273.15;

  const [ciudad, setCiudad] = useState("");
  const [dataClima, setDataClima] = useState(null);

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await response.json();
      setDataClima(data);
    } catch (error) {
      console.error("Ha ocurrido un error inesperado: ", { error });
    }
  };

  const handlerCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) fetchClima();
  };

  return (
    <>
      <div className="container">
        <h1>Aplicacion del Clima</h1>

        <form onSubmit={handlerSubmit}>
          <input type="text" value={ciudad} onChange={handlerCambioCiudad} />

          <button type="submit">Buscar</button>
        </form>
        {dataClima && (
          <div>
            <h2>{dataClima.name}</h2>
            <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}ºC</p>
            <p>Condicion meteorologica: {dataClima.weather[0].description}</p>
            <img src={` https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
          </div>
        )}
      </div>
    </>
  );
};
