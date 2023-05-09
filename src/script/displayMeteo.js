import { SENSORS_DATA_API_URLS } from "./apiRoutes.js";
import { socket } from "./socket.js";
import { getData } from "./utils/api/getData.js";
import { getParameterByName, checkParametre } from "./utils/readParamsInURL.js";
import { redirect } from "./utils/redirectManager.js";
import { scrollReveal } from "./utils/scrollReveal.js";
import { makeInvisible } from "./utils/visibilityHelpers.js";

const humidite = document.getElementById("humidity");
const temperature = document.getElementById("temperature");
const loader = document.getElementById("loader");

const sensorId = atob(getParameterByName("sensorID") || "");

checkParametre(sensorId)
scrollReveal({ selector: "h1,.card" });


document.getElementById("updateBtn").addEventListener("click", () => {
  redirect("updateThreshold", { id: sensorId })
})
document.getElementById("backBtn").addEventListener("click", () => {
  window.history.back();
})

const handleUpdateText = (h, t) => {
  humidite.textContent = `${h}% 💧`;
  temperature.textContent = `${t}°C ☀️🌡`;
};
const name = async () => {
  try {
    const lastDataSensor = await getData(SENSORS_DATA_API_URLS + "/" + sensorId)
    console.log(lastDataSensor)
    handleUpdateText(lastDataSensor.humidity, lastDataSensor.temperature)
  } catch (e) {

  }
}
name();
socket?.on("connect", () => {
  console.log("details/" + sensorId)
  makeInvisible(loader)
  socket?.on("details/" + sensorId, (...data) => {
    console.log(data)
    const { humidity, temperature } = data[0];
    handleUpdateText(humidity, temperature);
  });
});
