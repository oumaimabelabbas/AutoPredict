const form = document.getElementById("verify-form");
const codeInput = document.getElementById("code-input");
const error_message = document.getElementById("error-message");
const resendBtn = document.getElementById("resend-btn");
const resendStatus = document.getElementById("resend-status");

const email = localStorage.getItem("verifyEmail");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const code = codeInput.value.trim();

  if (!code) {
    error_message.innerText = "Please enter your verification code";
    return;
  }

  if (!email) {
    error_message.innerText = "No email found. Go back and enter your email.";
    return;
  }

  const response = await fetch(
    "http://localhost:8000/api/auth/verify-verification-code",
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, providedCode: code }),
    }
  );

  const data = await response.json();

  if (!data.success) {
    error_message.innerText = data.message || "Invalid code";
    return;
  }

  localStorage.removeItem("verifyEmail");
  window.location.href = "home.html";
});

// RESEND CODE
resendBtn.addEventListener("click", async () => {
  resendStatus.innerText = "Sending new code...";

  if (!email) {
    resendStatus.innerText = "No email found.";
    return;
  }

  const response = await fetch(
    "http://localhost:8000/api/auth/send-verification-code",
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    }
  );

  const data = await response.json();

  if (!data.success) {
    resendStatus.innerText = data.message;
    return;
  }

  resendStatus.innerText = "A new code was sent to your email!";
});
