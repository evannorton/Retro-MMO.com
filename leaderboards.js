const urlParams = new URLSearchParams(window.location.search);
const page = parseInt(urlParams.get('page')) || 1;

fetch("http://localhost:3000/constants.json").then((res) => {
    return res.json();
}).then((constants) => {
    const entries = constants['leaderboards-entries'];
    const entriesPerPage = constants['leaderboards-entries-per-page'];
    const lastPage = Math.ceil(entries / entriesPerPage);
    console.log(lastPage);

    const createPagination = () => {
        const pagination = document.createElement('div');
        pagination.id = 'pagination';

        if (page > 1) {
            const prevButton = document.createElement('button');
            prevButton.innerHTML = '&#8592;'; // Arrow symbol
            prevButton.className = 'pagination-button';
            prevButton.onclick = () => {
                window.location.search = `?page=${page - 1}`;
            };
            pagination.appendChild(prevButton);
        }

        if (page < lastPage) {
            const nextButton = document.createElement('button');
            nextButton.id = 'next-button';
            nextButton.innerHTML = '&#8594;';
            nextButton.className = 'pagination-button';
            nextButton.onclick = () => {
                window.location.search = `?page=${page + 1}`;
            };
            pagination.appendChild(nextButton);
        }

        const pageInputLabel = document.createElement('label');
        pageInputLabel.innerText = 'Page: ';
        pageInputLabel.setAttribute('for', 'page-input');
        pageInputLabel.className = 'pagination-label';

        const pageInput = document.createElement('input');
        pageInput.id = 'page-input';
        pageInput.type = 'number';
        pageInput.min = 1;
        pageInput.max = lastPage;
        pageInput.value = page;
        pageInput.className = 'pagination-input';
        pageInput.onchange = () => {
            const inputPage = parseInt(pageInput.value);
            if (inputPage > 0) {
                window.location.search = `?page=${inputPage}`;
            }
        };

        pagination.appendChild(pageInputLabel);
        pagination.appendChild(pageInput);
        document.querySelector('main').appendChild(pagination);
    };

    const updateLeaderboards = () => {
        fetch(`https://play.retro-mmo.com/leaderboards.json?page=${page}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('No more results');
                }
                return res.json();
            })
            .then((rows) => {
                const tbody = document.querySelector("table tbody");
                tbody.innerHTML = ''; // Clear previous rows
                rows.forEach(({ experience, username }, key) => {
                    const tr = document.createElement("tr");
                    const td1 = document.createElement("td");
                    td1.innerText = ((page - 1) * rows.length + (key + 1)).toLocaleString(); // Adjust numbering based on page
                    const td2 = document.createElement("td");
                    td2.innerText = username;
                    const td3 = document.createElement("td");
                    td3.innerText = experience.toLocaleString();
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tbody.appendChild(tr);
                });

                if (page === 1) {
                    const rowsArray = Array.from(tbody.querySelectorAll('tr'));
                    if (rowsArray[0]) rowsArray[0].children[1].style.color = '#ffbb31'; // Gold
                    if (rowsArray[1]) rowsArray[1].children[1].style.color = '#a8a8a8'; // Silver
                    if (rowsArray[2]) rowsArray[2].children[1].style.color = '#ad4e1a'; // Bronze
                }

                document.getElementById("leaderboards").removeAttribute("hidden");
            })
            .catch((error) => {
                if (error.message === 'No more results') {
                    const message = document.createElement('p');
                    message.innerText = 'No more results';
                    message.style.color = '#ffe737';
                    const mainElement = document.querySelector('main');
                    mainElement.insertBefore(message, document.getElementById('pagination'));
                    document.getElementById('next-button').innerText = 'Back to start';
                    document.getElementById('next-button').onclick = () => {
                        window.location.search = `?page=1`;
                    };
                } else {
                    console.error('An error occurred:', error);
                }
            });
    }

    createPagination();
    updateLeaderboards();
})

