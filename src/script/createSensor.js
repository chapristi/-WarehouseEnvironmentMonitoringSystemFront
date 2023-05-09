import { SENSOR_API_URL, THRESHOLD_API_URL } from "./apiRoutes.js";
import { postData } from "./utils/api/postData.js";

const form = document.querySelector('form');
const inputs = Array.from(form.getElementsByTagName("input"));
const validateBtn = document.getElementById("validate");
const sensorData = {};
const thresholdData = {};


validateBtn.addEventListener("click", async (e) => {
    console.log("click");
    e.preventDefault();
    if (form.checkValidity()) {
        console.log("ok")
        inputs.forEach(inputElement => {
            const name = inputElement.name;
            const value = inputElement.value;
            if (name !== "temperature" && name !== "humidity") {
                sensorData[name] = value;
            }
            thresholdData[name] = value;
        });
        console.log(sensorData);
        try {
            const sensorResponse = await postData(SENSOR_API_URL, sensorData);
            if (sensorResponse && sensorResponse[0]) {
                thresholdData["sensorId"] = sensorResponse[0];
                await postData(THRESHOLD_API_URL, thresholdData);
                notie.alert({
                    type: 1, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
                    text: "capteur bien enregistré",
                    stay: false, // optional, default = false
                    time: 4.5, // optional, default = 3, minimum = 1,
                    position: "top" // optional, default = 'top', enum: ['top', 'bottom']
                })
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (e) {
            console.log(e);
            throw new Error("Invalid response from server");
        }
    }
});
