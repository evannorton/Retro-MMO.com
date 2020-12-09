addEventListener("message", (event) => {
    if (event.origin.startsWith("https://play.retro-mmo.com")) {
        location.assign(event.data);
    }
});
document.getElementById("full-screen").addEventListener("click", () => {
    document.getElementById("game").requestFullscreen();
});