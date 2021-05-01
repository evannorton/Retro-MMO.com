addEventListener("message", (event) => {
    if (event.origin.startsWith("https://play.retro-mmo.com")) {
        location.assign(event.data);
    }
});
addEventListener("keydown", (e) => {
    if (e.key === "F11") {
        e.preventDefault();
    }
});