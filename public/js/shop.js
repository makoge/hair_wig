
window.addEventListener('scroll', 
         function(){
          const header = document.querySelector('header');
          if(window.scrollY > 50) {
            header.classList.add('scrolled');
          } else{
            header.classList.remove('scrolled')
          }
         });


document.addEventListener("DOMContentLoaded", () =>{
const toggleBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (toggleBtn && navLinks){
  toggleBtn.addEventListener("click", () =>{
    navLinks.classList.toggle("open");
  });
}else{
  console.info("[hair] menu-toggle or navLinks not found- skipping toggle");
}

  const submenuToggle = document.querySelector(".submenu-toggle");
  const dropdownContent = document.querySelector(".dropdown-content");

  if (submenuToggle && dropdownContent) {
    submenuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      dropdownContent.classList.toggle("open");
    });
  }

});


function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};


function subscribe (e) {
    const emailInput= document.getElementById("email-input");
    const subsbtn= document.querySelector(".subscribe-button");
    if (!emailInput || !subsbtn) return;

     
      const email=emailInput.value.trim();

     if(email === ""){
          emailInput.placeholder="please enter an email";
          emailInput.classList.add("error");
          return;
          
        }

    if (!isValidEmail(email)) {
    //emailInput.value = "";
    emailInput.placeholder = "invalid email address";
    emailInput.classList.add("error");
    return;
      }



      if(e && e.type === "keydown" ){
        if(e.key !== "Enter") return;
        }  
       
    
        
        subsbtn.textContent = "sent";
        subsbtn.classList.add("sent"); 
        
        emailInput.placeholder = "enter your email";

        emailInput.value="";
        emailInput.classList.remove("error");
   };
   window.subscribe=subscribe;




