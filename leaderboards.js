fetch("https://play.retro-mmo.com/leaderboards.json").then((res) => res.json()).then((rows) => {
    const tbody = document.querySelector("table tbody");
    rows.forEach(({ experience, username }, key) => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.innerText = (key + 1).toLocaleString();
        const td2 = document.createElement("td");
        td2.innerText = username;
        const td3 = document.createElement("td");
        td3.innerText = experience.toLocaleString();
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
    });
    document.getElementById("leaderboards").removeAttribute("hidden");
});
