// src/components/FileUpload.js
import React, { useState } from 'react';

const FileUpload = ({ userId }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    await fetch(" https://1d83-2001-ee0-4fc5-56f0-b99d-4f72-1df1-5b78.ngrok-free.app/api/files/upload", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
