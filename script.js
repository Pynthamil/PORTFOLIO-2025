document.addEventListener("DOMContentLoaded", function () {
    /*** READ MORE/LESS FUNCTIONALITY ***/
    document.querySelectorAll(".read-more").forEach(button => {
        button.addEventListener("click", function () {
            const text = this.previousElementSibling; // Selects the paragraph before the button
            text.classList.toggle("expanded");
            if (text.classList.contains("expanded")) {
                text.innerHTML = text.dataset.fullText; // Show full text
                this.innerText = "Read Less";
            } else {
                text.innerHTML = text.dataset.shortText; // Show short text
                this.innerText = "Read More";
            }
        });
    });

    /*** FORM VALIDATION ***/
    const form = document.getElementById("signupForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailErrorBox = document.getElementById("emailError");
    const passwordErrorBox = document.getElementById("passwordError");
    const submitButton = form.querySelector("button");

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "" || !emailPattern.test(email)) {
            showError(emailInput, emailErrorBox, "Enter a valid email address.");
            return false;
        }
        showSuccess(emailInput, emailErrorBox);
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/; // At least 8 chars, 1 number, 1 special char
        if (!passwordPattern.test(password)) {
            showError(passwordInput, passwordErrorBox, "Password must be 8+ chars, 1 number & 1 special char.");
            return false;
        }
        showSuccess(passwordInput, passwordErrorBox);
        return true;
    }

    function showError(input, errorBox, message) {
        errorBox.textContent = message;
        errorBox.classList.add("error-box", "visible");
        input.classList.add("error");
        input.classList.remove("success");
    }

    function showSuccess(input, errorBox) {
        errorBox.textContent = "";
        errorBox.classList.remove("visible");
        input.classList.add("success");
        input.classList.remove("error");
    }

    function checkFormValidity() {
        submitButton.disabled = !(validateEmail() && validatePassword());
    }

    emailInput.addEventListener("input", checkFormValidity);
    passwordInput.addEventListener("input", checkFormValidity);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validateEmail() && validatePassword()) {
            alert("Form submitted successfully!");
            setTimeout(() => {
                window.location.href = "index.html"; // Change to your actual home page
            }, 1000);
        }
    });
});
