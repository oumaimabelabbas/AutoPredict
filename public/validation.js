const form = document.getElementById("form");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const repeat_password_input = document.getElementById("repeat-password-input");
const error_message = document.getElementById("error-message");
const forgot_password = document.getElementById("forgot-password");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let errors = [];

  const email = email_input.value.trim();
  const password = password_input.value.trim();
  const repeatPassword = repeat_password_input?.value?.trim();

  // Validation
  if (repeat_password_input) {
    errors = getSignupFormErrors(email, password, repeatPassword);
  } else {
    errors = getLoginFormErrors(email, password);
  }

  if (errors.length > 0) {
    error_message.innerText = errors.join(". ");
    return;
  }

  try {
    const isSignup = repeat_password_input != null;
    const url = isSignup
      ? "http://localhost:8000/api/auth/signup"
      : "http://localhost:8000/api/auth/signin";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      error_message.innerText = data.message;
      return;
    }

    error_message.innerText = "";

    // ------------- SIGNUP -------------
    if (isSignup) {
      // envoyer le code de vérification
      await fetch("http://localhost:8000/api/auth/send-verification-code", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      // enregistrer email pour verify.html
      localStorage.setItem("verifyEmail", email);

      // rediriger vers page verification
      window.location.href = "verify.html";
      return;
    }

    // ------------- LOGIN -------------
    if (!data.verified) {
      // envoyer le mail de vérification à nouveau
      await fetch("http://localhost:8000/api/auth/send-verification-code", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      localStorage.setItem("verifyEmail", email);
      window.location.href = "verify.html";
      return;
    }

    // login success + verified
    localStorage.setItem("userEmail", email); 
    window.location.href = "home.html";
  } catch (err) {
    console.log(err);
    error_message.innerText = "Server error, Try again!";
  }
});

// ------------------ VALIDATION FUNCTIONS ------------------

function getSignupFormErrors(email, password, repeatPassword) {
  let errors = [];
  if (!email) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  }
  if (!password) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password.length < 8) {
    errors.push("Password must have at least 8 characters");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password !== repeatPassword) {
    errors.push("Password does not match repeated password");
    password_input.parentElement.classList.add("incorrect");
    repeat_password_input.parentElement.classList.add("incorrect");
  }
  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];
  if (!email) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  }
  if (!password) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password.length < 8) {
    errors.push("Password must have at least 8 characters");
    password_input.parentElement.classList.add("incorrect");
  }
  return errors;
}

// ------------------ INPUT CLEANUP ------------------

const allInputs = [email_input, password_input, repeat_password_input].filter(
  (input) => input != null
);

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      error_message.innerText = "";
    }
  });
});
