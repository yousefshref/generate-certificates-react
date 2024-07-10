import React, { useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import ImageModule from "docxtemplater-image-module-free";
import mammoth from "mammoth";

const Test = () => {
  const [htmlContent, setHtmlContent] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const buffer = e.target.result;
        loadDocument(buffer);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const getImage = (tagValue, tagName) => {
    return fetch(tagValue).then((r) => r.blob());
  };

  const getSize = (img, tagValue, tagName) => {
    return [100, 100]; // Adjust the size as needed
  };

  const loadDocument = (buffer) => {
    const imageModule = new ImageModule({
      getImage,
      getSize,
    });

    const zip = new PizZip(buffer);
    const doc = new Docxtemplater(zip, {
      modules: [imageModule],
    });

    doc.render();

    const output = doc.getZip().generate({ type: "blob" });

    mammoth
      .convertToHtml({ arrayBuffer: buffer })
      .then((result) => {
        setHtmlContent(result.value);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const customStyles = `
    table {
      width: 100%;
      border-collapse: collapse;
    }
    table, th, td {
      border: 1px solid black;
    }
    th, td {
      padding: 8px;
      text-align: left;
    }
    p {
      margin: 0;
      padding: 0;
    }
    .center-text {
      text-align: center;
    }
  `;

  return (
    <div>
      <h1>DOCX Viewer</h1>
      <input type="file" accept=".docx" onChange={handleFileUpload} />
      <style>{customStyles}</style>
      <div
        style={{ marginTop: "20px" }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default Test;
