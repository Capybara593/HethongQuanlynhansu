// src/components/FileList.js
import React, { useEffect, useState } from 'react';

const FileList = ({ userId }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetch(` https://1d83-2001-ee0-4fc5-56f0-b99d-4f72-1df1-5b78.ngrok-free.app/api/files?userId=${userId}`);
      const data = await response.json();
      setFiles(data);
    };
    fetchFiles();
  }, [userId]);

  return (
    <div>
      <h3>Your Files</h3>
      <ul>
        {files.map((file) => (
          <li key={file.fileId}>
            {file.filename} - {file.uploadTime}
            <a href={` https://1d83-2001-ee0-4fc5-56f0-b99d-4f72-1df1-5b78.ngrok-free.app/api/files/${file.fileId}`} download>
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
