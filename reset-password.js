document.getElementById("reset-password-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const token = new URLSearchParams(window.location.search).get("token");
    fetch("https://play.retro-mmo.com/reset-password", {
        body: JSON.stringify({
            password,
            token
        }),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    }).then(({ status }) => {
        if (String(status).startsWith("5")) {
            alert("The request could not be completed");
        }
        else {
            switch (status) {
                case 200:
                    alert("Your password has been reset!");
                    break;
                case 401:
                    alert("Your password reset link is invalid or has expired.");
                    break;
            }
        }
        location.replace("./");
    });
});
