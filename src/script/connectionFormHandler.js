import { saveToLocalStorage } from "./utils/localstorage.js";
import { getParameterByName } from "./utils/readParamsInURL.js";
import { redirect } from "./utils/redirectManager.js";
import { makeVisible } from "./utils/visibilityHelpers.js";
import { scrollReveal } from "./utils/scrollReveal.js";

const ip = document.getElementById("ip");
const port = document.getElementById("port");
const small = document.getElementById("small");
const errMessage = getParameterByName("errMessage")
scrollReveal({ selector: "h1,form" })
if (errMessage) {
    notie.alert({
        type: 3, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: atob(errMessage),
        stay: false, // optional, default = false
        time: 4.5, // optional, default = 3, minimum = 1,
        position: "top" // optional, default = 'top', enum: ['top', 'bottom']
    })
}
const combineAddressAndPort = (ip, port) => {
    return `${ip}:${port}`;
}
const isAnIp = (value) => {
    const regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return regex.test(value.toUpperCase());
};

document.getElementById("btn").addEventListener("click", (e) => {
    e.preventDefault()
    if (isAnIp(ip.value)) {
        const server_address = combineAddressAndPort(ip.value, port.value);
        saveToLocalStorage("server_address", server_address);
        redirect("cardSensors", {});
    } else {
        makeVisible(small);
    }
})
