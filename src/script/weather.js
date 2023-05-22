import { getData } from "./utils/api/getData.js";

const weatherToday = document.getElementById("weather-today")
const weatherCards = document.getElementById("weather-cards")
const getDay= (timestamp) =>{
    // Créer un objet Date à partir du timestamp
    const  date = new Date(timestamp * 1000); // Multipliez par 1000 car le timestamp est en secondes, tandis que JavaScript utilise des millisecondes.

    // Tableau des noms de jours en français
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    // Récupérer le jour de la semaine (de 0 à 6)
    const weakDay = date.getDay();

    // Récupérer le nom du jour en français
    let day = days[weakDay];

    // Afficher le résultat
    return day;
}
const getMeteo = ()=>{
    const meteo = fetch('https://api.openweathermap.org/data/2.5/forecast?q=Limoges&units=metric&lang=fr&cnt=4&appid=3780b59f3e313bbe20a3699001209872')
      .then(response => response.json())
      .then(response => {
            console.log(response.list)
        weatherToday.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png" height="150px" width="150px" alt="">
        <h2 style="font-size: 55px;">
            ${response.list[0].main.temp}°C
        </h2>
      `
      response.list.shift(0)
      for (const meteo of response.list) {
        // créer un élément HTML pour chaque objet
        console.log(meteo)
        const article = document.createElement('article');

        article.innerHTML = `
          <div class="weather-cards-title">
              <h3>${getDay(meteo.dt)}</h3>
          </div>
          <div class="infos">
              <img src="https://openweathermap.org/img/w/${meteo.weather[0].icon}.png" height="90px" width="90px">
              <p>${meteo.main.temp}°C</p>
              <p>${meteo.weather[0].main}</p>
          </div>
      `;
        // ajouter l'élément à la section
        weatherCards.appendChild(article);
    
      }
    /*
      <article>
      <div class="weather-cards-title">
          <h3>Samedi</h3>
      </div>
      <div class="infos">
          <img src="https://openweathermap.org/img/w/04d.png" height="90px" width="90px">
          <p>44°C</p>
          <p>Clouds</p>
      </div>
  </article>
  */

      })
      .catch(err => console.error(err));
    
}
getMeteo();