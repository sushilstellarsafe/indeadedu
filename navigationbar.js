document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.querySelector(".menu-btn");
  const authMenu = document.getElementById("authMenu");

  if (!menuBtn || !authMenu) {
    console.error("Menu button or authMenu not found");
    return;
  }

  // MENU TOGGLE
// MENU TOGGLE Fix
menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  // getComputedStyle check karega ki screen par current state kya hai
  const currentDisplay = window.getComputedStyle(authMenu).display;

  if (currentDisplay === "flex") {
    authMenu.style.display = "none";
  } else {
    authMenu.style.display = "flex";
  }
});

  // CLICK OUTSIDE → CLOSE MENU
  document.addEventListener("click", () => {
    authMenu.style.display = "none";
  });

});


/* ===== DUMMY FUNCTIONS (ERROR NA AAYE ISLIYE) ===== */

function showSection(section) {
  const content = document.getElementById("content");
  content.innerHTML = `<h2>${section.toUpperCase()} SECTION</h2>`;
}

function logout() {
  localStorage.clear();
  alert("Logged out");
  window.location.href = "login.html";
}
