document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // STUDENT DATA LOAD
  // =====================
  const data = JSON.parse(localStorage.getItem("studentData"));

  if (data) {
    const nameEl = document.getElementById("cardName");
    if (nameEl) nameEl.innerText = data.name.toUpperCase();

    const photoEl = document.getElementById("cardPhoto");
    if (photoEl && data.image) photoEl.src = data.image;
  }

  // =====================
  // DOWNLOAD LOGIC
  // =====================
  const btn = document.getElementById("downloadBtn");

  if (!btn) {
    console.error("Download button not found");
    return;
  }

  btn.addEventListener("click", async () => {
    try {
      const front = document.querySelector(".id-card.front");
      const back = document.querySelector(".id-card.back");

      if (!front || !back) {
        alert("ID card not found");
        return;
      }

      document.body.classList.add("download-mode");
      front.classList.add("download-card");
      back.classList.add("download-card");

      const frontCanvas = await html2canvas(front, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff"
      });

      const backCanvas = await html2canvas(back, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff"
      });

      const jsPDF = window.jspdf.jsPDF;

      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210;
      const cardWidth = 160;
      const cardHeight = 100;
      const x = (pageWidth - cardWidth) / 2;

      pdf.addImage(frontCanvas.toDataURL("image/png"), "PNG", x, 30, cardWidth, cardHeight);
      pdf.addImage(backCanvas.toDataURL("image/png"), "PNG", x, 150, cardWidth, cardHeight);

      pdf.save("INSEAD_ID_Card_A4.pdf");

      front.classList.remove("download-card");
      back.classList.remove("download-card");
      document.body.classList.remove("download-mode");

    } catch (err) {
      console.error(err);
      alert("Download failed. Console check karo.");
    }
  });

});
