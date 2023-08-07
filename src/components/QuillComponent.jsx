import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillComponent = () => {
  const quillRef = useRef(null);
  const [html, setHtml] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link"],
      [{ align: [] }],
      ["image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "bullet",
    "link",
    "image",
  ];
  const handleText = () => {
    if (quillRef.current) {
      setHtml(quillRef.current.value);
    }
  };

  const handleSave = () => {
    let quillContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        ${html}
    </body>
    </html>`;
    const blob = new Blob([quillContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "my_quill_content.html";
    downloadLink.click();
  };
  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <ReactQuill
        ref={quillRef}
        onChange={handleText}
        theme="snow"
        modules={modules}
        formats={quillFormats}
      />
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};
export default QuillComponent;
