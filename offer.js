document.addEventListener("DOMContentLoaded", () => {

  const data = {
    name: localStorage.getItem("offer_name"),
    passport: localStorage.getItem("offer_passport"),
    dob: localStorage.getItem("offer_dob"),
    course: localStorage.getItem("offer_course"),
    appId: localStorage.getItem("offer_application_id"),
    duration: localStorage.getItem("offer_course_duration"),
    start: localStorage.getItem("offer_commencement"),
  };

  // 🔴 अगर data नहीं मिला
  if (!data.name) {
    alert("No offer data found. Please signup again.");
    return;
  }

  // ✅ Inject into HTML
  document.getElementById("studentName").innerText = data.name;
  document.getElementById("passportNo").innerText = data.passport;
  document.getElementById("dob").innerText = data.dob;
  document.getElementById("courseName").innerText = data.course;
  document.getElementById("course").innerText = data.course;
  document.getElementById("applicationId").innerText = data.appId;
  document.getElementById("courseDuration").innerText = data.duration;
  document.getElementById("commencementDate").innerText = data.start;

  // ✅ Modules example
  const modules = [
    "Strategy",
    "Leadership",
    "Finance",
    "Marketing"
  ];

  const ul = document.getElementById("modulesList");
  modules.forEach(m => {
    const li = document.createElement("li");
    li.innerText = m;
    ul.appendChild(li);
  });

});
