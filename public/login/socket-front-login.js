import { setCookie } from "../utils/cookies.js";

const socket = io();

function emitAuthenticateUser(data) {
  socket.emit("authenticate_user", data);
}

socket.on("authentication_success", tokenJwt => {
  setCookie("tokenJwt", tokenJwt);
  
  alert("Authenticated!");
    window.location.href = "/";

});

socket.on("authentication_failure", () => alert("User and password do not match"));

socket.on("user_not_found", () => alert("User not found"));

export { emitAuthenticateUser };