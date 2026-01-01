document.addEventListener("DOMContentLoaded", async () => {
  console.log("Offer JS Loaded");

  // 1️⃣ Check Supabase session
  const { data: { session } } = await supabase.auth.getSession();
  console.log("SESSION 👉", session);

  if (!session) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  const userId = session.user.id;

  // 2️⃣ Fetch profile from Supabase
  const { data, error } = await supabase
    .from("student_profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  console.log("PROFILE DATA 👉", data);

  if (error || !data) {
    alert("Offer data not found. Please signup again.");
    return;
  }

  // 3️⃣ BASIC DETAILS
  setText("offerDearName", data.name);
  setText("offerName", data.name);
  setText("offerPassport", data.passport);
  setText("offerDob", data.dob);

  // 4️⃣ COURSE DETAILS
  setText("offerCourseHeading", data.course);
  setText("offerCourse", data.course);
  setText("offerDuration", data.duration);

  // OPTIONAL (agar DB me hai to)
  setText("offerApplicationId", data.application_id);
  setText("offerCommencement", data.commencement);

  // 5️⃣ SUBJECTS (static for now)
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

  // 6️⃣ ACCEPTANCE PAGE
  setText("acceptName", data.name);
  setText("acceptPassport", data.passport);
  setText("acceptCourse", data.course);
});

// ===== Helper =====
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.innerText = value || "-";
  }
}



// ===============================
// PDF DOWNLOAD
// ===============================
document.getElementById("downloadPDF")?.addEventListener("click", () => {

  const element = document.getElementById("pdfContent");

  if (!element) {
    alert("PDF content not found");
    return;
  }

  // 🔥 IMPORTANT: delay so images render properly
  setTimeout(() => {
    const options = {
      margin: 0,
      filename: "Offer_Letter.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        // allowTaint: true
        scrollY: 0
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      }
    };

    html2pdf().set(options).from(element).save();
  }, 300); // 👈 delay
});

