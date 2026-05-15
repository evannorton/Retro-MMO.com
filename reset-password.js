document.getElementById("reset-password-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const hcaptchaToken = hcaptcha.getResponse();
    if (hcaptchaToken === "") {
        alert("Please verify that you are not a robot.");
        return;
    }

    const token = new URLSearchParams(window.location.search).get("token");
    submitButton.disabled = true;
    passwordInput.disabled = true;
    confirmPasswordInput.disabled = true;

    fetch("https://play.retro-mmo.com/reset-password", {
        body: JSON.stringify({
            hcaptchaToken,
            password,
            token,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    })
        .then(async (response) => {
            if (String(response.status).startsWith("5")) {
                alert("The request could not be completed");
            } else {
                switch (response.status) {
                    case 200:
                        alert("Your password has been reset!");
                        location.replace("./");
                        break;
                    case 401:
                        alert(
                            "Your password reset link is invalid or has expired.",
                        );
                        break;
                    case 400:
                        if ((await response.text()) === "hcaptcha") {
                            alert("Please verify that you are not a robot.");
                            hcaptcha.reset();
                        }
                        break;
                }
            }
        })
        .finally(() => {
            submitButton.disabled = false;
            passwordInput.disabled = false;
            confirmPasswordInput.disabled = false;
        });
});
