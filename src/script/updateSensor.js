import { THRESHOLD_API_URL } from "./apiRoutes.js";
import { getData } from "./utils/api/getData.js";
import { patchData } from "./utils/api/patchData.js";
import { getParameterByName, checkParametre } from "./utils/readParamsInURL.js";


const form = document.querySelector('form');
const humidityInput = document.getElementById("humidity");
const temperatureInput = document.getElementById("temperature");
const submitBtn = document.getElementById("validate");

// Obtenir l'ID du capteur à partir de l'URL
const sensorId = atob(getParameterByName("id") || "");

checkParametre(sensorId)
// Mettre à jour les valeurs de seuil actuelles dans le formulaire
const updateThresholdInputs = async () => {
    const threshold = await getData(`${THRESHOLD_API_URL}/${sensorId}`);
    const { humidity, temperature } = threshold;
    humidityInput.value = humidity;
    temperatureInput.value = temperature;
};

updateThresholdInputs();

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
        try {
            // Mettre à jour les valeurs de seuil dans la base de données
            await patchData(`${THRESHOLD_API_URL}/${sensorId}`, {
                temperature: temperatureInput.value,
                humidity: humidityInput.value,
            });
            // Afficher un message de confirmation
            notie.alert({
                type: 1,
                text: "Le changement a bien été effectué",
                stay: false,
                time: 4.5,
                position: "top",
            });
        } catch (error) {
            console.log(error);
            console.log("sdfsdfsdf")
            notie.alert({
                type: 3,
                text: "Une erreur est survenue lors de la mise à jour",
                stay: false,
                time: 4.5,
                position: "top",
            });
        }
    }
});
