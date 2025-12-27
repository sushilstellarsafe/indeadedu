const { PDFDocument, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const pdfPath = path.join(__dirname, "offer_template.pdf");
    const pdfBytes = fs.readFileSync(pdfPath);

    const pdfDoc = await PDFDocument.load(pdfBytes);
    const page = pdfDoc.getPages()[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // 👇 text positions (agar thoda upar-neeche chahiye to y change karna)
    page.drawText(data.name, { x: 150, y: 520, size: 11, font });
    page.drawText(data.email, { x: 150, y: 500, size: 11, font });
    page.drawText(data.course, { x: 150, y: 480, size: 11, font });
    page.drawText(data.program, { x: 150, y: 460, size: 11, font });
    page.drawText(data.date, { x: 150, y: 440, size: 11, font });
    page.drawText(data.applicationId, { x: 150, y: 420, size: 11, font });

    const finalPdf = await pdfDoc.save();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/pdf" },
      body: Buffer.from(finalPdf).toString("base64"),
      isBase64Encoded: true
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString()
    };
  }
};
