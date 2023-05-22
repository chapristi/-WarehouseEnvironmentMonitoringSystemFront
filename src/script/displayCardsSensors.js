import { SENSOR_API_URL } from "./apiRoutes.js";
import { getData } from "./utils/api/getData.js";
import { redirect } from "./utils/redirectManager.js";
const articlesSection = document.getElementById("articles");
const searchButton = document.getElementById("searchButton")
const searchInput = document.getElementById("searchBar")

async function generateArticles(url) {
  // récupérer les données avec fetch ou une autre méthode

  let sensorsData;
  try {
    sensorsData = await getData(url);
    console.log(sensorsData["data"].length === 0)
    articlesSection.innerHTML = "";
    if(sensorsData["data"].length === 0){
      articlesSection.innerHTML = `
        <h2>Aucun resultat</h2>
      `
    }
  } catch (e) {
    redirect("connectionForm", { errMessage: "la liaison client serveur a echoué" })
  }

  // boucle pour chaque objet dans le tableau
  for (const sensor of sensorsData["data"]) {
    // créer un élément HTML pour chaque objet
    const article = document.createElement('article');

    const date = new Date(sensor.created_at)
    const fullDate = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay()
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

}

window.addEventListener("onload", generateArticles(SENSOR_API_URL));

searchButton.addEventListener("click",(e)=>{
  e.preventDefault();
  if(searchInput.value !== ""){
    generateArticles(SENSOR_API_URL+`?q=${searchInput.value}`)
  }
})