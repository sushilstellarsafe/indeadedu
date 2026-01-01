document.addEventListener("DOMContentLoaded", () => {

  // 1️⃣ student data uthao
  const data = JSON.parse(localStorage.getItem("studentData"));

  if (!data) {
    alert("No student data found. Please signup first.");
    return;
  }

  // 2️⃣ NAME SET
  const nameEl = document.getElementById("cardName");
  if (nameEl && data.name) {
    nameEl.innerText = data.name.toUpperCase();
  }

  // 3️⃣ PHOTO SET
  const photoEl = document.getElementById("cardPhoto");
  if (photoEl && data.image) {
    photoEl.src = data.image;
  }
});