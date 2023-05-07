import { SENSOR_API_URL } from "./apiRoutes.js";
import { getData } from "./utils/api/getData.js";
const articlesSection = document.getElementById("articles");
// récupérer les données avec fetch ou une autre méthode


//document.getElementById('fruitsList').innerHTML = fruitsList;
window.addEventListener("load",async()=>{
    const sensorsData = await getData(SENSOR_API_URL);
  
    console.log("data:",sensorsData["data"][0].created_at);


    // boucle pour chaque objet dans le tableau
    for (const sensor of sensorsData["data"]) {
        // créer un élément HTML pour chaque objet
        const article = document.createElement('article');

        let date = new Date(sensor.created_at)
        const fullDate = date.getFullYear()+"/"+date.getMonth()+"/"+ date.getDay()
        article.innerHTML = `
        <div class="article-wrapper">
        <figure>
          <img src="https://www.aquaportail.com/pictures2104/humidite-atmospherique.jpg" alt="" />
        </figure>
        <div class="article-body">
          <h2>${sensor.name}</h2>
          <p>
            <strong>status: </strong>En ligne 🟢<br/>
            <strong>position dans l'entrepot: </strong><br/>
            <strong>long : </strong>${sensor.longitude}<br/>
            <strong>latitude : </strong>${sensor.latitude}<br/>
            <strong>description : </strong>le capteur a été enregstré le ${fullDate}
          </p>
          <a href="panelMeteo.html?sensorID=${btoa(sensor.id)}" class="read-more">
            voir plus d'infos <span class="sr-only">about this is some title</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
        `;
        // ajouter l'élément à la section
        articlesSection.appendChild(article);
    }
})
