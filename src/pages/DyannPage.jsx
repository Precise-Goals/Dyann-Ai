import React, { useState } from 'react';
import { Upload, FileText, BarChart3, CheckCircle, AlertCircle } from 'lucide-react';
import './DyannPage.css';

const DyannPage = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setUploadError('');
    } else {
      setUploadError('Please select a valid CSV file');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadError('');

    try {
      // Simulate file upload and processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically:
      // 1. Upload file to your backend
      // 2. Process CSV data
      // 3. Store in database
      // 4. Generate analytics
      
      setUploadSuccess(true);
      setIsUploading(false);
      
      // Redirect to dashboard after successful upload
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
      
    } catch (error) {
      setUploadError('Upload failed. Please try again.');
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      setFile(droppedFile);
      setUploadError('');
    } else {
      setUploadError('Please drop a valid CSV file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="dyann-page">
      <div className="dyann-container">
        <div className="dyann-header">
          <h1>Upload Your Sales Data</h1>
          <p>Drop your CSV file or click to browse. We'll analyze your sales data and provide insights.</p>
        </div>

        <div className="upload-section">
          <div 
            className={`upload-area ${file ? 'has-file' : ''} ${uploadError ? 'has-error' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {!file ? (
              <div className="upload-placeholder">
                <Upload size={48} className="upload-icon" />
                <h3>Drop your CSV file here</h3>
                <p>or</p>
                <label className="upload-button">
                  Browse Files
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
                <p className="upload-hint">Supports CSV files up to 10MB</p>
              </div>
            ) : (
              <div className="file-info">
                <FileText size={32} />
                <div className="file-details">
                  <h4>{file.name}</h4>
                  <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button 
                  className="remove-file"
                  onClick={() => setFile(null)}
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {uploadError && (
            <div className="error-message">
              <AlertCircle size={20} />
              <span>{uploadError}</span>
            </div>
          )}

          {file && !uploadError && (
            <div className="upload-actions">
              <button
                className={`btn btn-primary ${isUploading ? 'loading' : ''}`}
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <div className="spinner"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <BarChart3 size={20} />
                    Analyze Data
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {uploadSuccess && (
          <div className="success-message">
            <CheckCircle size={24} />
            <h3>Upload Successful!</h3>
            <p>Your data is being analyzed. Redirecting to dashboard...</p>
          </div>
        )}

        <div className="features-preview">
          <h3>What you'll get:</h3>
          <div className="features-list">
            <div className="feature-item">
              <BarChart3 size={20} />
              <span>Sales performance analytics</span>
            </div>
            <div className="feature-item">
              <BarChart3 size={20} />
              <span>Customer feedback insights</span>
            </div>
            <div className="feature-item">
              <BarChart3 size={20} />
              <span>Trend analysis and forecasting</span>
            </div>
            <div className="feature-item">
              <BarChart3 size={20} />
              <span>Interactive visualizations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DyannPage;
