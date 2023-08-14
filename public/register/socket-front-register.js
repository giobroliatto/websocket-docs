const socket = io();

function emitRegisterUser(data) {
  socket.emit("register_user", data);
}

socket.on("register_success", () => {
  window.location.href = "/login/index.html"
  alert("Successfully registred!")
});
socket.on("register_failure", () => alert("Failed to register"));
socket.on("user_exists", () => alert("User already registred"));

export { emitRegisterUser };