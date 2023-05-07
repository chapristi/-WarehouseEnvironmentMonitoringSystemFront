import { getFromLocalStorage } from "./utils/localstorage.js";
import { redirect } from "./utils/redirectManager.js";

const socketURL = getFromLocalStorage("server_address");

window.addEventListener("load",() => {
  if (socketURL === null) {
    return redirect("connectionForm", {
      errMessage: "aucun serveur n'est renseigné",
    });
  }
});
console.log(socketURL)

const displayErrorMessage = () => {
  alert("le serveur distant est inacesible vous allez etre redirigé");
};

const socket = io(socketURL,{ 
  transports: ["polling"] ,
});

socket.on("connect_error", ({ message }) => {
  displayErrorMessage();
  redirect("connectionForm", {
    errMessage: "le serveur distant est inaccesible",
  });
});

export { socket };
