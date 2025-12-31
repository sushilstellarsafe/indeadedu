document.addEventListener("DOMContentLoaded", () => {

  // 🔹 DATA FROM LOCALSTORAGE
  const name = localStorage.getItem("offer_name");
  const passport = localStorage.getItem("offer_passport");
  const dob = localStorage.getItem("offer_dob");
  const course = localStorage.getItem("offer_course");
  const duration = localStorage.getItem("offer_course_duration");
  const applicationId = localStorage.getItem("offer_application_id");
  const commencement = localStorage.getItem("offer_commencement");

  if (!name || !course) {
    alert("Offer data not found. Please signup again.");
    return;
  }

  // 🔹 BASIC DETAILS
  document.getElementById("offerDearName").innerText = name;
  document.getElementById("offerName").innerText = name;
  document.getElementById("offerPassport").innerText = passport;
  document.getElementById("offerDob").innerText = dob;

  // 🔹 COURSE DETAILS
  document.getElementById("offerCourseHeading").innerText = course;
  document.getElementById("offerCourse").innerText = course;
  document.getElementById("offerApplicationId").innerText = applicationId;
  document.getElementById("offerDuration").innerText = duration;
  document.getElementById("offerCommencement").innerText = commencement;

  // 🔹 SUBJECTS (STATIC FOR NOW, DYNAMIC LATER)
  const subjects = [
    "Services Marketing and Customer Service",
    "Events Management",
    "Development of the Hospitality and Tourism Industry",
    "Managing Food and Beverage Operations",
    "Managing Housekeeping & Rooms Operations",
    "Academic and Professional Development"
  ];

  const subjectBox = document.getElementById("offerSubjects");
  subjectBox.innerHTML = "";

  subjects.forEach((sub, i) => {
    subjectBox.innerHTML += `<p>(${String.fromCharCode(97 + i)}) ${sub},</p>`;
  });

  // 🔹 ACCEPTANCE PAGE
  document.getElementById("acceptName").innerText = name;
  document.getElementById("acceptPassport").innerText = passport;
  document.getElementById("acceptCourse").innerText = course;

});
