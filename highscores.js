fetch("https://oniq-online.herokuapp.com/api/highscores").then((res) => res.json()).then((rows) => {
    const tbody = document.querySelector("table tbody");
    rows.forEach((row, key) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <th>${key + 1}</th>
            <th>${row.username}</th>
            <th>${row.level}</th>
            <th>${row.exp}</th>
            <th>${row.class}</th>
        `;
        tbody.appendChild(tr);
    });
});