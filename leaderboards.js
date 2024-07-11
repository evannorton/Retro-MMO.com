const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get('page');

fetch(`https://play.retro-mmo.com/leaderboards.json?page=${page}`).then((res) => res.json()).then((rows) => {
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

if(page <= 1 ){
    document.getElementById('prevButton').style.display = 'none';
}

fetch(`https://play.retro-mmo.com/leaderboards.json?page=${parseInt(page)+1}`).then((res) => {
    if(!res.ok){
        document.getElementById('nextButton').style.display = 'none';
    }
})

const prevClickHandler = () => {
    document.location = document.location.pathname + `?page=${parseInt(page)-1}`
}

const nextClickHandler = () => {
    document.location = document.location.pathname + `?page=${parseInt(page)+1}`
}
