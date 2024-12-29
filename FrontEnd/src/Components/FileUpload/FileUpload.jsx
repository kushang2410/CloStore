import React, { useState } from 'react';
import './style.css';

const FileUpload = ({ onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        onFileUpload(file);
    };

    const handleDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === "dragenter" || event.type === "dragover") {
            setDragActive(true);
        } else if (event.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            const file = event.dataTransfer.files[0];
            setSelectedFile(file);
            onFileUpload(file);
        }
    };

    return (
        <div
            className={`upload-container ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <div className="upload-area">
                <p>Drag & Drop your file here</p>
                <span>or</span>
                <label htmlFor="file-upload" className="upload-button">
                    Browse Files
                </label>
                <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>
            {selectedFile && (
                <div className="selected-file">
                    <p>Selected File: {selectedFile.name}</p>
                </div>
            )}
        </div>
    );
};

export default FileUpload;