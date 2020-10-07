fetch("https://play.retro-mmo.com/leaderboards.json").then((res) => res.json()).then((rows) => {
    const tbody = document.querySelector("table tbody");
    rows.forEach((row, key) => {
        const tr = document.createElement("tr");
        const th1 = document.createElement("th");
        th1.innerText = `${(key + 1).toLocaleString()}`;
        const th2 = document.createElement("th");
        th2.innerText = `${row.username}`;
        const th3 = document.createElement("th");
        th3.innerText = `${row.experience.toLocaleString()}`;
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tbody.appendChild(tr);
    });
    document.getElementById("leaderboards").removeAttribute("hidden");
});
