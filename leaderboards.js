const urlParams = new URLSearchParams(window.location.search);
const page = parseInt(urlParams.get("page")) || 1;

fetch("https://play.retro-mmo.com/constants.json").then((res) => {
    return res.json();
}).then((constants) => {
    const entries = constants["leaderboards-entries"];
    const entriesPerPage = constants["leaderboards-entries-per-page"];
    const lastPage = Math.ceil(entries / entriesPerPage);

    const createPagination = (containerId) => {
        const container = document.getElementById(containerId);
        const pagination = document.createElement("div");
        pagination.className = "pagination";
        
        if (containerId === 'pagination-bottom') {
            container.style.display = 'none'; // Initially hide bottom pagination
        }

        if (page > 1) {
            const prevButton = document.createElement("button");
            prevButton.innerHTML = "&#8592;"; // Arrow symbol
            prevButton.className = "pagination-button";
            prevButton.onclick = () => {
                window.location.search = `?page=${page - 1}`;
            };
            pagination.appendChild(prevButton);
        }

        if (page < lastPage) {
            const nextButton = document.createElement("button");
            nextButton.innerHTML = "&#8594;";
            nextButton.className = "pagination-button";
            nextButton.onclick = () => {
                window.location.search = `?page=${page + 1}`;
            };
            pagination.appendChild(nextButton);
        }

        const pageInputLabel = document.createElement("label");
        pageInputLabel.innerText = "Page: ";
        pageInputLabel.setAttribute("for", `${containerId}-page-input`);
        pageInputLabel.className = "pagination-label";

        const pageInput = document.createElement("input");
        pageInput.id = `${containerId}-page-input`;
        pageInput.type = "number";
        pageInput.min = 1;
        pageInput.max = lastPage;
        pageInput.value = page;
        pageInput.className = "pagination-input";
        pageInput.onchange = () => {
            const inputPage = parseInt(pageInput.value);
            if (inputPage > 0) {
                window.location.search = `?page=${inputPage}`;
            }
        };

        pagination.appendChild(pageInputLabel);
        pagination.appendChild(pageInput);
        container.appendChild(pagination);
    };

    const updateLeaderboards = () => {
        fetch(`https://play.retro-mmo.com/leaderboards.json?page=${page}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("No more results");
                }
                return res.json();
            })
            .then((rows) => {
                const tbody = document.querySelector("table tbody");
                tbody.innerHTML = ""; // Clear previous rows
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
                    const rowsArray = Array.from(tbody.querySelectorAll("tr"));
                    if (rowsArray[0]) rowsArray[0].children[1].style.color = "#ffbb31"; // Gold
                    if (rowsArray[1]) rowsArray[1].children[1].style.color = "#a8a8a8"; // Silver
                    if (rowsArray[2]) rowsArray[2].children[1].style.color = "#ad4e1a"; // Bronze
                }

                document.getElementById("leaderboards").removeAttribute("hidden");
                document.getElementById("pagination-bottom").style.display = 'block'; // Show bottom pagination after loading
            })
            .catch((error) => {
                if (error.message === "No more results") {
                    const message = document.createElement("p");
                    message.innerText = "No more results";
                    message.style.color = "#ffe737";
                    const paginationTop = document.getElementById("pagination-top");
                    paginationTop.parentNode.insertBefore(message, paginationTop); // Insert message above pagination-top
                    document.getElementById("pagination-bottom").style.display = 'none';
                } else {
                    console.error("An error occurred:", error);
                }
            });
    }

    createPagination('pagination-top');
    createPagination('pagination-bottom');
    updateLeaderboards();
});

document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("search-bar");
    const searchButton = document.getElementById("search-button");
    const searchResults = document.getElementById("search-results");

    const fetchPageData = (page) => {
        return fetch(`https://play.retro-mmo.com/leaderboards.json?page=${page}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("No more results");
                }
                return res.json();
            });
    };

    const searchLeaderboard = async (query) => {
        //-- RetroMMO BDAY Easter Egg --
        if (query === "08142020") {
            searchResults.innerHTML = ''; // Clear previous results
            const resultContainer = document.createElement("div");
            resultContainer.className = "result-container"; 
    
            const result = document.createElement("p");
            result.innerHTML = "Happy Birthday RetroMMO!";
            result.style.color = "#5ba8ff";
            result.className = "search-result";
            resultContainer.appendChild(result);
    
            const clearSearchButton = document.createElement("button");
            clearSearchButton.innerHTML = "&times;";
            clearSearchButton.className = "clear-search-button";
            clearSearchButton.onclick = () => {
                searchBar.value = '';
                searchResults.innerHTML = '';
            };
    
            resultContainer.appendChild(clearSearchButton);
            searchResults.appendChild(resultContainer);
            return; // Exit the function early
        }
        // -----------
        let page = 1;
        let found = false;
        searchResults.innerHTML = ''; // Clear previous results

        const searchingMessage = document.createElement("p");
        searchingMessage.innerText = "Searching...";
        searchingMessage.className = "search-message"; // Use CSS class for styling
        searchResults.appendChild(searchingMessage);

        while (!found) {
            try {
                const rows = await fetchPageData(page);
                const entry = rows.find(({ username }) => username.toLowerCase() === query.toLowerCase());

                if (entry) {
                    const { username, experience } = entry;
                    const index = rows.findIndex(user => user.username === username) + 1 + (page - 1) * rows.length;

                    searchResults.innerHTML = ''; // Clear "Searching..." message
                    const resultContainer = document.createElement("div");
                    resultContainer.className = "result-container"; 

                    const result = document.createElement("p");
                    result.innerHTML = `#${index} ${username} - ${experience.toLocaleString()}`;
                    result.style.color = index === 1 ? "#ffbb31" : index === 2 ? "#a8a8a8" : index === 3 ? "#ad4e1a" : "white";
                    result.className = "search-result";
                    resultContainer.appendChild(result);

                    const clearSearchButton = document.createElement("button");
                    clearSearchButton.innerHTML = "&times;";
                    clearSearchButton.className = "clear-search-button";
                    clearSearchButton.onclick = () => {
                        searchBar.value = '';
                        searchResults.innerHTML = '';
                    };

                    resultContainer.appendChild(clearSearchButton);
                    searchResults.appendChild(resultContainer);
                    found = true;
                } else {
                    page++;
                }
            } catch (error) {
                searchResults.innerHTML = ''; // Clear "Searching..." message
                if (error.message === "No more results") {
                    const noResult = document.createElement("p");
                    noResult.innerText = "No results found";
                    noResult.style.color = "#ffe737";
                    noResult.className = "search-message";
                    searchResults.appendChild(noResult);
                    found = true;
                } else {
                    console.error("An error occurred:", error);
                    const errorResult = document.createElement("p");
                    errorResult.innerText = "An error occurred while searching";
                    errorResult.className = "search-message";
                    searchResults.appendChild(errorResult);
                    found = true;
                }
            }
        }
    };

    searchButton.addEventListener("click", () => searchLeaderboard(searchBar.value));
    searchBar.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            searchLeaderboard(searchBar.value);
        }
    });
});