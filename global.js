fetch("https://play.retro-mmo.com/players.json").then((res) => res.json()).then((players) => {
    if (players.length > 0) {
        const one = players.length === 1;
        document.getElementById("players").innerText = `There ${one ? "is" : "are"} currently ${players.length.toLocaleString()} player${one ? "" : "s"} online!`;
    }
});