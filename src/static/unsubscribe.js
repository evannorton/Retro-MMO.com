const statusElement = document.getElementById("status");
const unsubscribeButton = document.getElementById("unsubscribe-button");
const token = new URLSearchParams(window.location.search).get("token");

if (token === null) {
    statusElement.innerText = "Your unsubscribe link is invalid.";
    unsubscribeButton.hidden = true;
} else {
    unsubscribeButton.addEventListener("click", () => {
        unsubscribeButton.disabled = true;
        statusElement.innerText = "Unsubscribing...";

        fetch("https://play.retro-mmo.com/unsubscribe", {
            body: JSON.stringify({
                token,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        })
            .then((response) => {
                if (String(response.status).startsWith("5")) {
                    statusElement.innerText =
                        "The request could not be completed.";
                    unsubscribeButton.disabled = false;
                } else {
                    switch (response.status) {
                        case 200:
                            statusElement.innerText =
                                "You have been unsubscribed from RetroMMO emails.";
                            unsubscribeButton.hidden = true;
                            break;
                        case 401:
                            statusElement.innerText =
                                "Your unsubscribe link is invalid or has expired.";
                            unsubscribeButton.hidden = true;
                            break;
                        default:
                            statusElement.innerText =
                                "The request could not be completed.";
                            unsubscribeButton.disabled = false;
                            break;
                    }
                }
            })
            .catch(() => {
                statusElement.innerText = "The request could not be completed.";
                unsubscribeButton.disabled = false;
            });
    });
}
