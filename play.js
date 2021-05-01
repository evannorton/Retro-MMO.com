addEventListener("message", (event) => {
    if (event.origin.startsWith("https://play.retro-mmo.com")) {
        location.assign(event.data);
    }
});