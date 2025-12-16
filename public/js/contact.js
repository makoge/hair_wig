const form = document.getElementById("contact-form");
form.addEventListener("submit", async (e) =>{
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message =  document.getElementById("message").value.trim();

  console.log({
    name, email, message
  })
  const status = document.getElementById("form-status");
  status.textContent="Sending...";

  try{
    const response = await fetch("http://localhost:5000/send-email",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name, email, message}),
    });

    const result = await response.json();
    status.textContent = result.success
      ? "message sent successfully!"
      : "something went wrong.";
      
  } catch (err){
    status.textContent = "Error sending message.";
    console.error(err);
  }
});