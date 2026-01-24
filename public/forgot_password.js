const form = document.getElementById("forgot-form");
const email_input = document.getElementById("email-input");
const error_message = document.getElementById("error-message");

form.addEventListener("submit", async(e) => {
  e.preventDefault();
  const email = email_input.value.trim();

  if (!email) {
    error_message.innerText = "Email is required";
    return;
  }

  try{
    const response = await fetch("http://localhost:8000/api/auth/send-forgot-password-code", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email}),
    });
    const data = await response.json();
    if(!data.success){
      error_message.innerText=data.message;
      return;
    }
    error_message.innerText=""
    localStorage.setItem("resetEmail", email);
    window.location.href = "reset_password.html";
  }
  catch(error){
    console.log(error)
    error_message.innerText="Server error, Try again!"
  }
  
  
});
