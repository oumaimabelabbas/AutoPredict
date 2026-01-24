const form = document.getElementById("reset-form")
const code_input = document.getElementById("code-input")
const new_password_input= document.getElementById("new-password-input");
const confirm_password_input = document.getElementById("confirm-password-input");
const resend_button = document.getElementById("resend-code-btn")
const error_message = document.getElementById("error-message");
const resetEmail = localStorage.getItem("resetEmail");

form.addEventListener('submit',async(e)=>{
  e.preventDefault();
  const code = code_input.value.trim();
  const newPassword = new_password_input.value.trim();
  const confirmPassword = confirm_password_input.value.trim();
  let errors = [];
  if (!code) errors.push("Verification code is required");
  if (!newPassword) errors.push("New password is required");
  if (!confirmPassword) errors.push("Please confirm new password");
  if (newPassword.length < 8) errors.push("Password must be at least 8 characters");
  if (newPassword !== confirmPassword) errors.push("Passwords do not match");

  if (errors.length > 0) {
    error_message.innerText = errors.join(". ");
    return;
  }
  try{
    const response = await fetch("http://localhost:8000/api/auth/verify-forgot-password-code",{
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({email:resetEmail,providedCode:code,newPassword}),
    });
    const data = await response.json();
    if(!data.success){
      error_message.innerText=data.message;
      return;
    }
    error_message.innerText=""
    localStorage.removeItem("resetEmail");
    window.location.href = "Login.html";

  }catch(error){
    console.log(error);
    error_message.innerText="Server error, Try again!";
  }
})
resend_button.addEventListener('click',async(e)=>{
  error_message.innerText='Resending new code...'
  const response = await fetch(
    "http://localhost:8000/api/auth/send-forgot-password-code",
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email : resetEmail }),
    }
  );

  const data = await response.json();

  if (!data.success) {
    error_message.innerText = data.message;
    return;
  }

  error_message.innerText = "A new code was sent to your email!";
})
