fetch("https://play.retro-mmo.com/leaderboards.json").then((res) => res.json()).then((rows) => {
    console.log(rows);
    const tbody = document.querySelector("table tbody");
    rows.forEach((row, key) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <th>${key + 1}</th>
            <th>${row.username}</th>
            <th>${row.experience}</th>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById("leaderboards").removeAttribute("hidden");
});