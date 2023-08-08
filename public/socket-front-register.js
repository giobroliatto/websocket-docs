const socket = io();

function emitRegisterUser(data) {
  socket.emit("register-user", data);
}

socket.on("register_success", () => alert("Successfully registred!"));
socket.on("register_failure", () => alert("Failed to register"));
socket.on("user_exists", () => alert("User already registred"));

export { emitRegisterUser };