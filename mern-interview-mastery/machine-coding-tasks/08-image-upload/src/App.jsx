import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle | uploading | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: 'architecture_diagram.png', size: '154 KB', date: '2026-06-15 10:20', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=100&auto=format&fit=crop&q=60' },
    { id: 2, name: 'avatar_user_profile.jpg', size: '48 KB', date: '2026-06-16 09:45', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60' }
  ]);

  const fileInputRef = useRef(null);

  // Validate and process selected file
  const processFile = (file) => {
    setErrorMessage('');
    setUploadStatus('idle');
    setProgress(0);

    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Invalid format. Please select JPEG, PNG, GIF or WEBP image.');
      return;
    }

    // Check file size (2MB limit)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage('File too large. Maximum size is 2MB.');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setUploadStatus('uploading');
    setProgress(0);

    // Simulate chunked upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('success');
          
          // Add to mock uploaded list
          const newFileItem = {
            id: Date.now(),
            name: selectedFile.name,
            size: `${Math.round(selectedFile.size / 1024)} KB`,
            date: new Date().toISOString().replace('T', ' ').substring(0, 16),
            url: previewUrl
          };
          setUploadedFiles(prevList => [newFileItem, ...prevList]);
          return 100;
        }
        return prev + 10;
      });
    }, 150); // 1.5s total simulation time
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setProgress(0);
    setUploadStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="upload-container">
      <header className="upload-header">
        <div className="brand">
          <span className="logo-icon">📤</span>
          <div>
            <h1>AssetLoader</h1>
            <p className="subtitle">MERN Level - Drag & Drop Upload, File Reader & Progress Bar Integration</p>
          </div>
        </div>
      </header>

      <div className="upload-grid">
        {/* Left column: upload action panel */}
        <div className="upload-panel card">
          <h2>Upload Asset</h2>

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {uploadStatus === 'success' && <div className="alert alert-success">Asset uploaded successfully!</div>}

          <div
            className={`dropzone ${dragActive ? 'active' : ''} ${previewUrl ? 'has-preview' : ''}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={previewUrl ? null : triggerFileInput}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="file-input-hidden"
              onChange={handleChange}
              accept="image/*"
            />

            {previewUrl ? (
              <div className="preview-container">
                <img src={previewUrl} alt="Preview" className="image-preview" />
                <button className="remove-preview-btn" onClick={removeFile} title="Remove image">
                  ×
                </button>
              </div>
            ) : (
              <div className="dropzone-prompt">
                <span className="upload-large-icon">📁</span>
                <p>Drag and drop your file here, or <span className="browse-link">browse</span></p>
                <span className="file-constraints">Supports JPEG, PNG, GIF, WEBP (Max 2MB)</span>
              </div>
            )}
          </div>

          {selectedFile && (
            <div className="file-details-box">
              <div className="file-meta-row">
                <span className="file-name">{selectedFile.name}</span>
                <span className="file-size">{Math.round(selectedFile.size / 1024)} KB</span>
              </div>

              {uploadStatus === 'uploading' && (
                <div className="progress-bar-wrapper">
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                  </div>
                  <span className="progress-percent">{progress}% uploaded</span>
                </div>
              )}

              {uploadStatus !== 'uploading' && uploadStatus !== 'success' && (
                <button className="btn btn-primary btn-block" onClick={handleUpload}>
                  Initiate Upload
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right column: history list */}
        <div className="upload-history card">
          <h2>Assets Vault</h2>
          <div className="history-list">
            {uploadedFiles.length === 0 ? (
              <p className="no-files">No files uploaded yet.</p>
            ) : (
              uploadedFiles.map(file => (
                <div key={file.id} className="history-item">
                  <img src={file.url} alt={file.name} className="history-thumb" />
                  <div className="history-details">
                    <h4>{file.name}</h4>
                    <div className="history-meta">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.date}</span>
                    </div>
                  </div>
                  <span className="success-badge">Uploaded</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
