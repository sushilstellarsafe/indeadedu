document.addEventListener("DOMContentLoaded", () => {

  // 🔐 LOGIN CHECK
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
    return;
  }

  const data = JSON.parse(localStorage.getItem("studentData"));
  if (!data) {
    alert("No user data found. Please signup again.");
    return;
  }

  // ===== ELEMENTS =====
  const img = document.getElementById("profileImage");
  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");

  const fields = [
    "profileName",
    "profileEmail",
    "profileDob",
    "profilePassport",
    "profileProgram",
    "profileCourse",
    "profileDuration"
  ];

  // ===== SHOW DATA =====
  if (data.image && data.image.trim() !== "") {
    img.src = data.image;
  } else {
    img.style.display = "none";
  }

  document.getElementById("profileName").innerText = data.name || "-";
  document.getElementById("profileEmail").innerText = data.email || "-";
  document.getElementById("profileDob").innerText = data.dob || "-";
  document.getElementById("profilePassport").innerText = data.passport || "-";
  document.getElementById("profileProgram").innerText = data.program || "-";
  document.getElementById("profileCourse").innerText = data.course || "-";
  document.getElementById("profileDuration").innerText = data.duration || "-";

  // ===== EDIT =====
  editBtn.addEventListener("click", () => {
    fields.forEach(id => {
      const el = document.getElementById(id);
      el.contentEditable = "true";
      el.style.background = "#fff";
      el.style.border = "1px solid #ccc";
      el.style.padding = "4px";
    });

    editBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
  });

  // ===== SAVE =====
  saveBtn.addEventListener("click", () => {

    data.name = document.getElementById("profileName").innerText;
    data.email = document.getElementById("profileEmail").innerText;
    data.dob = document.getElementById("profileDob").innerText;
    data.passport = document.getElementById("profilePassport").innerText;
    data.program = document.getElementById("profileProgram").innerText;
    data.course = document.getElementById("profileCourse").innerText;
    data.duration = document.getElementById("profileDuration").innerText;

    localStorage.setItem("studentData", JSON.stringify(data));

    fields.forEach(id => {
      const el = document.getElementById(id);
      el.contentEditable = "false";
      el.style.background = "transparent";
      el.style.border = "none";
    });

    saveBtn.style.display = "none";
    editBtn.style.display = "inline-block";

    alert("Profile updated successfully ✅");
  });

  // ===== HOME =====
  document.getElementById("homeBtn").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // ===== LOGOUT =====
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login.html";
  });

});
