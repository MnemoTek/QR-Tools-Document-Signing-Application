import React, { useState } from "react";
import { jsPDF } from "jspdf";

import QRGenerator from "./components/QRGenerator";
import QRScanner from "./components/QRScanner";
import OCRExtractor from "./components/OCRExtractor";
import WordToPDF from "./components/WordToPDF";
import ImageToPDF from "./components/ImageToPDF";
import SignaturePad from "./components/SignaturePad";
import AdvancedPDFSigner from "./components/AdvancedPDFSigner";

function App() {
  const [signatureData, setSignatureData] = useState(null);

  const handleSaveSignature = (dataURL) => {
    console.log("Signature received in App:", dataURL);
    setSignatureData(dataURL);
  };

  const generateSignedPDF = () => {
    console.log("SignatureData at generation:", signatureData);

    if (!signatureData) {
      alert("Please sign first!");
      return;
    }

    const pdf = new jsPDF();

    pdf.text("Signed document", 20, 20);

    pdf.addImage(signatureData, "PNG", 20, 40, 60, 30);

    pdf.save("signed_document.pdf");
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1>Smart Tools</h1>

      <QRGenerator />
      <QRScanner />
      <OCRExtractor />
      <WordToPDF />
      <ImageToPDF />

      {/* Main PDF signer */}
      <AdvancedPDFSigner />

      <hr style={{ margin: "40px 0" }} />

      <h2>Simple Signature</h2>

      <SignaturePad onSave={handleSaveSignature} />

      {signatureData && (
        <div style={{ marginTop: 20 }}>
          <p>Saved signature:</p>
          <img
            src={signatureData}
            alt="preview"
            style={{
              border: "1px solid #ccc",
              maxWidth: "200px",
            }}
          />
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <button onClick={generateSignedPDF}>
          Download Signed PDF
        </button>
      </div>
    </div>
  );
}

export default App;