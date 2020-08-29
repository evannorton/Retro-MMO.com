document.getElementById("reset-password-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const token = new URLSearchParams(window.location.search).get("token");
    fetch("https://play.retro-mmo.com/reset-password", {
        body: JSON.stringify({
            password: document.getElementById("password").value,
            token
        }),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    }).then(({ status }) => {
        switch (status) {
            case 200:
                alert("Your password has been reset!");
                break;
            case 401:
                alert("Your password reset link is invalid or has expired.");
                break;
        }
        location.replace("./");
    });
});